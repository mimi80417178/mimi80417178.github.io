const openbars = document.querySelector(".fa-bars")
const togglenavList = document.querySelector(".toggle-navList")
const videocontent = document.querySelector(".video-content")
const videoImage = document.querySelectorAll(".image img")
console.log(videoImage)


openbars.onclick = function () {
	togglenavList.classList.toggle("show");
	videocontent.classList.toggle("contentToggle");
	
}

document.addEventListener("DOMContentLoaded",() =>{
const videoContent = new VC()
videoContent.displayimage()

});

class VC{
   displayimage(){
	      fetch("videoImage.json").then(function(response) {
		  return response.json();
	   
	    }).then(function(videoImageDATA){
	       //console.log(videoImageDATA)
		   let html = " ";		   
		   videoImageDATA.forEach(item => {
			 html += `<div class="image">
			                   <img src= ${item.image} />
				          <div class="icon-text">
					           <i class="fa fa-user-secret" ></i>
					           <span>
							      Best Channal to learn coding that 
							      <br>help you to be web develper<br>Lets started......
					          </span>
				          </div>
		             </div> `
		       });		  
		       videocontent.innerHTML = html;
	      })
		 
     }

}




