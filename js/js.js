// const menuextend = document.querySelector(".menu-bar-extend")
// menuextend.addEventListener("click",function(){
//     menuextend.classList.toggle("active")
//     document.querySelector(".menu-bar-left").classList.toggle("active")
// })
const icon = document.querySelector(".fa-times")
icon.addEventListener("click",function(){
    document.querySelector(".search-icon").classList.toggle("active")
})
const ico = document.querySelector(".fa")
ico.addEventListener("click",function(){
    document.querySelector(".search-icon").classList.toggle("active")
})
const header =  document.querySelector(".header")
const bar =  document.querySelector(".row")
window.addEventListener("scroll",function(){
    const x =  this.pageYOffset
    if(x > 150){
        header.classList.add("active")
        bar.classList.add("active")
    }  
    else{
       header.classList.remove("active")
       bar.classList.remove("active")
    }      
})

const ClosePic =  document.querySelector(".fa-times-circle")
    ClosePic.addEventListener("click",function(){
      document.querySelector(".zoomOver-wrap").style.display="none"
})
const bigImg =  document.querySelector(".zoomOver img")
const smallImg =  document.querySelectorAll(".food-list-itme img")
smallImg.forEach(function(imgItem,x){
    imgItem .addEventListener("click",function(){
        bigImg.src = imgItem.src
        document.querySelector(".zoomOver-wrap").style.display="flex"
    })
})
	
const choseMenu =  document.querySelector(".food-menu")
choseMenu.addEventListener("click",function(x){
    if(x.target.classList.contains("food-menu-button"))
        {
        const Target = x.target.getAttribute("data-food");
        choseMenu.querySelector(".active").classList.remove("active")
        x.target.classList.add("active") /*x đã điều hướng tới button*/

        const putMenu =  document.querySelector(".food-elective")
        putMenu.querySelector(".food-elective-items.active").classList.remove("active")
        putMenu.querySelector(Target).classList.add("active")
    }       
}) 


$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
         },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
})
 