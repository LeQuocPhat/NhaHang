function Validator(formSelector, options){
    // if(!options){
    //     options = {};
    // }
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
    var formRules ={};
    var ValidatorRules ={
        required: function(value){
            return value ? undefined : 'Vui lòng nhập trường này!'
        },

        email: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập đúng email!'
        },

        min: function(min){
            return function(value){
                return value.length >= min ? undefined : 'Nhập tối thiểu 6 kí tự!!'
            }
           
        },
        
    }

    var formElement = document.querySelector(formSelector);

    if(formElement){
        var inputs = formElement.querySelectorAll('[name][rules]');//lấy ra thẻ có name va có thuộc tính là rule

        for(var input of inputs){
            var ruleInfo ;
            var rules = input.getAttribute('rules').split('|')// cắt chuỗi
            for(var rule of rules){
                var isRuleHAs = rule.includes(':');
                if(isRuleHAs){
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }

                var ruleFunc = ValidatorRules[rule];

                if(isRuleHAs){
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }
                
                if(Array.isArray(formRules[input.name])){
                    formRules[input.name].push(ruleFunc);
                }else{
                    formRules[input.name] = [ruleFunc];
                }
            }
         
            //lắng nghe sự kiện...
             input.onblur = handleValidate;
             input.oninput = handleClear;
        }
        function handleValidate(event){//event chính là element
            var rules = formRules[event.target.name];//đổ ra [f,f]
            var errorMessage;
            rules.find(function (rule){//find duuyeet qua từng rules trong đó, dùng for cũng đc  rules =  rules(event.target.value). tức là f(value)
                errorMessage = rule(event.target.value);
                return errorMessage;
            });
            if(errorMessage){
                var formGroup = getparent(event.target, '.form-group');
                if(formGroup){
                    formGroup.classList.add('invalid');
                    var formMessage = formGroup.querySelector('.form-message');
                    formMessage.innerText = errorMessage;
                }
            }
            return !errorMessage;

        }

        function handleClear(event){
            var formGroup = getparent(event.target, '.form-group');
            if(formGroup.classList.contains('invalid')){
                formGroup.classList.remove('invalid');
                    var formMessage = formGroup.querySelector('.form-message');
                    formMessage.innerText = "";
            }
        }

        formElement.onsubmit = function(event){
            event.preventDefault();
            var inputs = formElement.querySelectorAll('[name][rules]');//lấy ra thẻ có name va có thuộc tính là rule
            var isValid = true;
            
        for(var input of inputs){
            if(!handleValidate({target: input})){ //event vốn là object 
                isValid = false ;
            }
        // console.log(formRules)
    }
    if(isValid){
        if(typeof options.onSubmit === 'function'){
            var enableInpt = formElement.querySelectorAll('[name]');//nodeList
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
                        values[input.name] = input.value;
                }
                // return (values[input.id] = input.value) && values; // toán tử && return vaeef values
                // (values[input.id] = input.value);
                return values;
            },{});
            options.onSubmit(valueForm);
        }else{
            formElement.submit();
        }
    }
}}
}