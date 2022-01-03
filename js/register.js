
function Validator(option){
    var selectorRules = {};
    function getparent(element, selector){
        while(element.parentElement)//tồn tại cái cha
        {
            if(element.parentElement.matches(selector))//matches ktra thẻ cha có cái selector ko
            {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    function Validate(inputElement, rule){
        
        // var errorElement = inputElement.parentElement.querySelector('.form_message');
        var errorElement = getparent(inputElement, option.formGroupSelector).querySelector(option.errorSelector);
        // var errorMessages = rule.test(inputElement.value);
        var errorMessages ;
        var final = true;

        var rules = selectorRules[rule.selector];//selectorRules.name = [f,f]
        for(var i = 0; i < rules.length; i++){
            switch(inputElement.type)
            {
                case 'radio':
                case 'checkbox':
                    errorMessages = rules[i](formElememt.querySelector(rule.selector + ':checked'));//ru.selec == name, lấy ra element đc checked
            
                    break;
                default:
                    errorMessages = rules[i](inputElement.value)// var errorMessages = rule.test(inputElement.value);
            }
           
            if(errorMessages) break;// lôiz đâu tiên tìm đươc
        }
        if(errorMessages){
            getparent(inputElement, option.formGroupSelector).classList.add('invalid');
            errorElement.innerText = errorMessages;
            final = false;
        }else{
            getparent(inputElement, option.formGroupSelector).classList.remove('invalid');
            errorElement.innerText = '';
            final = true;
        }
        return !!final;
    }
    var formElememt = document.querySelector(option.form)

    if(formElememt){
        //lặp qua từng rule và kiểm tra để validate(tích đỏ)
        formElememt.onsubmit = function(e){
            e.preventDefault();

            var isFormValid = true;
            option.rules.forEach(function(rule){
                var inputElement = formElememt.querySelector(rule.selector);
                var isValid = Validate(inputElement, rule);
                if(!isValid){
                    isFormValid = false ;
                } 
                // console.log(isValid)
            });
            
            if(isFormValid){
                if(typeof  option.onSubmit === 'function'){
                    var enableInpt = formElememt.querySelectorAll('[name]:not([disabled])');//nodeList
                    var valueForm = Array.from(enableInpt).reduce(function(values, input){//duyệt qua từng phần tử 
                        switch(input.type)
                        {
                            case 'radio':
                                values[input.name] = formElememt.querySelector('input[name="' + input.name + '"]:checked').value ;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {//ko đc checked = true
                                    // values[input.name] = '';
                                    return values;
                                } 
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];//nếu ko phải mảng tạo mảng vì checkbox tích nhiều ô 
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                (values[input.id] = input.value);
                        }
                        // return (values[input.id] = input.value) && values; // toán tử && return vaeef values
                        // (values[input.id] = input.value);
                        return  values;
                    },{});
                    // console.log(enableInpt); 
                    option.onSubmit(valueForm);
                }else{
                    formElememt.onsubmit();//mặc định k=cảu trình duyệt 
                }
            }
        }



        option.rules.forEach(function(rule){

            if(Array.isArray( selectorRules[rule.selector]))//neus key(vd: fullnam là [array])
            {
                //neu đã la mang thì push vô key da có tao ra [test1,test2]
                selectorRules[rule.selector].push(rule.test)
            }else{
                selectorRules[rule.selector] = [rule.test];
            }
            
            //Xử lý khi nhấp vào hoặc ra khỏi input
            var inputElements = formElememt.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function(inputElement){//lúc tìm all thì thành node list nên cho thành mảng
                // var errorElement = inputElement.parentElement.querySelector('.form_message');
            var errorElement = getparent(inputElement, option.formGroupSelector).querySelector(option.errorSelector);
                inputElement.onblur = function(){
                    Validate(inputElement, rule)
                }
                inputElement.oninput = function(){
                    if(inputElement.value){
                        getparent(inputElement, option.formGroupSelector).classList.remove('invalid')
                        errorElement.innerText = '';
                    }
                }
            })
            // var errorElement = inputElement.parentElement.querySelector('.form_message');
            // var errorElement = getparent(inputElement,option.formGroupSelector).querySelector(option.errorSelector);
            // if(inputElement){
            //     inputElement.onblur = function(){
            //         Validate(inputElement, rule)
            //     }
            //     inputElement.oninput = function(){
            //         if(inputElement.value){
            //             getparent(inputElement, option.formGroupSelector).classList.remove('invalid')
            //             errorElement.innerText = '';
            //         }
            //     }
            // }
        });
        // console.log(selectorRules)
    }
}

Validator.isRequired = function(selector){
    return {
        selector: selector,
        test: function(value){
            // return value.trim() ? undefined : 'Vui long nhap truong nay!!'//trim bỏ khoabg trang 
            return value ? undefined : 'Vui long nhap truong nay!!'//trim bỏ khoabg trang 
        }
    };
}

Validator.isEmail = function(selector){
    return {
        selector: selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui long nhap dung gmail'
        }
    };
}

Validator.minLenght = function(selector,min,messages){
    return {
        selector: selector,
        test: function(value){
            return value.length >= min ? undefined : messages || 'Vui long nhap đủ 6 kí tự'
        }
    };
}

Validator.isConfirmed = function(selector,getPassword,messages){
    return {
        selector: selector,
        test: function(value){
            return value === getPassword() ? undefined : messages || 'khong tuong dong!!'
        }
    };
}