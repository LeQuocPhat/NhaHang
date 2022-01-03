// JavaScript Document
window.onscroll = function(){
	
	var header = document.getElementById("myHeader");
	var gototop = document.getElementById("gototop");
  if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
	 	 
		 header.style.position = "fixed";
		 header.style.position = "inherit";
		  header.style.backgroundColor = "rgb(255,255,255,0.8)";
		  header.style.left = 0;
		  header.style.right = 0;
		   header.style.zIndex = 9;
		   gototop.style.display = "block";
		   
  }else{
	  header.style.position = "inherit";
	   header.style.backgroundColor = "rgb(255,255,255)";
	   gototop.style.display = "none";
 		}

}

function gototop(){
	var timer = setInterval(function(){
		document.documentElement.scrollTop-= 30;
		if(document.documentElement.scrollTop <= 0)
			clearInterval(timer);
		},10);
	
}

