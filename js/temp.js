const choseSanh =  document.querySelector(".chose-lobbly")
choseSanh.addEventListener("click",function(x){
    if(x.target.classList.contains("oppti"))
        {
        const Target = x.target.getAttribute("data-sanh");
        // choseMenu.querySelector(".active").classList.remove("active")
        // x.target.classList.add("active") /*x đã điều hướng tới button*/
        console.log(Target)

        // const putMenu =  document.querySelector(".detail-pri-itme .img")
        // putMenu.querySelector(".im active").classList.remove("active")
        // putMenu.querySelector(Target).classList.add("active")
    }       
}) 
