/* --------- Bar click(open & close) --------- */
const cart = document.querySelector(".cart");//40% 購物車清單畫面
const openbars = document.querySelector(".fa-cart-plus");//打開購物車
const closebars = document.querySelector(".close-cart"); //關閉購物車
console.log(cart)
openbars.onclick = function () {
	cart.classList.toggle("showCart");
}

closebars.onclick = function () {
	cart.classList.remove("showCart");
}

/* --------- End of Bar click(open & close) --------- */

/* --------- Cart Start --------- */
const addBagBtn = document.querySelectorAll(".bag-btn");//新增購買數量按鈕
const cartBtn = document.querySelector(".cart-items"); //購物車顯示數字
const cartContent = document.querySelector(".cart-content"); //購物車購買清單
const cartItem = document.querySelectorAll(".cart-item");//購物車購買細項
const cartTotal = document.querySelector(".cart-total");//購買品項總價格


 let allCartItems =[];//建立陣列array,包含所有buildCartItemsData{object}物件

/*1.--------- 建立數據，按鈕點擊時，可執行 -----*/

for (var i = 0;  i < addBagBtn.length; i++) {
	let addBtn = addBagBtn[i]
	addBtn.addEventListener("click", (e)=>{
        //console.log(addBtn)
	 e.target.preventdefault
        e.target.innerHTML = "In Cart"; // button點擊時 "Add to Bag" 會變成 "In Cart"
       
	 	 	let buildCartItemsData = {
			image: e.target.parentElement.children[0].src,
			name: e.target.parentElement.children[2].textContent,
			price:parseInt(e.target.parentElement.children[4].textContent),
			totalPrice: parseInt (e.target.parentElement.children[4].textContent), 
            id: e.target.value,
			quantity: 1
                 
		};
		   console.log(typeof buildCartItemsData.id) //string
		   addItemToLocal(buildCartItemsData)	

	});

}
/*------- END of 建立數據，按鈕點擊時，可執行 -----*/   

   /*2.---------LocalStorage(顯示Cart Item Data)  -----*/
   
    function addItemToLocal(buildCartItemsData){
     //console.log(buildCartItemsData)/*顯示let buildCartItemsData{image:name:price.....}物件所有細項*/
     let allCartItemsintoSTR = JSON.parse(localStorage.getItem("localStorageCartItem") )

     	if (allCartItemsintoSTR === null) {
     		allCartItems.push(buildCartItemsData)  //allCartItems =let buildCartItemsData{所有物件細項}
     		localStorage.setItem("localStorageCartItem" ,JSON.stringify(allCartItems))
     		//console.log(allCartItemsintoSTR)
     	}
     	else{
     		allCartItemsintoSTR.forEach(item =>{
     			if (buildCartItemsData.name == item.name){
     				buildCartItemsData.quantity = item.quantity +1; //item.quantity + 1
                    buildCartItemsData.price == item.price
     				buildCartItemsData.totalPrice = item.totalPrice += buildCartItemsData.totalPrice; 
                  		
     				
     			}
     			else{
     				allCartItems.push(item)
     			}
     			
     		});
     		allCartItems.push(buildCartItemsData)     	
     	}
     	    localStorage.setItem("localStorageCartItem" ,JSON.stringify(allCartItems))   
     	   window.location.reload() 
     }
    /*---------END of LocalStorage(顯示Cart Item Data)) -----*/


/*3.------dispCartItem CART顯示購買清單  addBtn let dispCartItem (CART 品項 數量 價格 總價格~~)-----*/
       function dispCartItem(){
           cart.classList.toggle("showCart")

            let html = '';
            let allCartItemsintoSTR = JSON.parse(localStorage.getItem("localStorageCartItem") )
            //console.log(allCartItemsintoSTR)   
            allCartItemsintoSTR.forEach(item =>{
            	html +=`
     		    <div class="cart-item">
                       <img src="${item.image}" alt="product"/>
                        <div>
                            <h4 class="name">Name : ${item.name}</h4>
                            <h5>Quantity : ${item.quantity}pc</h5>
                            <h5>Price : $${item.price}</h5>
                            <h5>TotalPrice : $${item.totalPrice}</h5>
                            <div class ="cartId">ID : <h5>${item.id}</h5> </div>
                            <span class="remove-item">remove</span>
                        </div>
                    
                             <div>                           
                             
                                <p class="item-amount"><b>QTY: ${item.quantity}</b></p>
                                                    
                             </div>
                 </div>
              `
              //console.log(html)
            });

                 cartContent.innerHTML = html; 
        }
           dispCartItem()
/*-----END of dispCartItem CART顯示購買清單  addBtn let dispCartItem (CART 品項 數量 價格 總價格~~)---*/


  /*4.------cartNumberDisplay CART顯示數量 addBtn let cartDisplayNumber (CART 數量往上+1)-----*/
       function cartNumberDisplay(){
      	   let cartNumbers = 0;
      	   let allCartItemsintoSTR = JSON.parse(localStorage.getItem("localStorageCartItem") )
      	   allCartItemsintoSTR.forEach(item =>{
      	   	   cartNumbers = item.quantity += cartNumbers;
      	  });
      	   //console.log(cartNumbers)    
      	   cartBtn.textContent = cartNumbers ;

      }
      cartNumberDisplay()//回CALL Function      

  /*------END of cartNumberDisplay CART顯示數量 addBtn let cartDisplayNumber (CART 數量往上+1)-----*/


  /* 5.------<span class="remove-item">remove</span> 移除品項-----*/
  const cartRemove = document.querySelectorAll(".remove-item");//
       for (let i = 0;  i<cartRemove.length; i++){
          let removeBtn = cartRemove[i]
          removeBtn.addEventListener("click",(e)=>{
              // console.log("remove")
          let allCartItemsintoSTR = JSON.parse(localStorage.getItem("localStorageCartItem"))  
           console.log(allCartItemsintoSTR) //{ [....] }
          // console.log(typeof e.target.parentElement.parentElement.children[1].children[4].children[0].textContent) //1 2 3 代表 Cabbage Chicken Tomatos ....
            //typeof 結果等於string
           allCartItemsintoSTR.forEach(item =>{
                   //console.log(item)//{Cabbage ...} {Tomatos...} {Tomatos...}~~~~
                      // console.log(typeof item.id) // /1 2 3 代表 Cabbage Chicken Tomatos ....   
                       //typeof 結果等於string        
                       //console.log(allCartItems) //[] empty array
                   
           
                if(item.id != e.target.parentElement.parentElement.children[1].children[4].children[0].textContent){
                    console.log(true)                                     

                    allCartItems.push(item) // [] + Chicken Tomatos  [Chicken Tomatos]
                    //console.log(item) //當點擊remove(Cabbage)時 只有顯示[Chicken Tomatos]
                    //console.log(item.id)//當點擊remove(Cabbage id:1)時 只有顯示[Chicken-id:2 Tomatos-id:3]
                }

            /* ---------- 總結:allCartItems.push(item) ------------ */ 
                 // 1.當點擊remove ，因點擊的remove項目時 空陣列要加入item的內容  
                 // 2.但因被點擊remove 的item 條件式 是等於的(====)
                 // 3.所以點擊remove 的item時，空陣列 push item 陣列裡只會加入沒點擊剩下購物車項目的清單
                 // 4. 故因被點擊的item 不會加入到空陣列哩，所以最後達到移除功能。
                else{
                    //console.log(false) //所以item.id 等於 e.target.parentElement....id的值
                    //console.log(item)
                    //console.log(allCartItemsintoSTR)
                    //allCartItems.push(item) //只有點擊的品項，空陣列的內容只會放入點擊單個品項
                    //console.log(allCartItems) 
                }

            }); 
            
           localStorage.setItem("localStorageCartItem" ,JSON.stringify(allCartItems));//當點擊removeBtn 更新localStorageCartItem最新暫存狀態[index]項目會被移除
           window.location.reload()  //當點擊removeBtn 網頁重新刷新        
        

         })
     }
  /* ------ END of <span class="remove-item">remove</span> 移除品項 -----*/
 


/*6.------cartPrice CART 總金額  addBtn let cartPrice (總金額加總~~)-----*/
         function cartTotallyPrice(){
             let subTotal = 0;
             let allCartItemsintoSTR =JSON.parse(localStorage.getItem("localStorageCartItem"))
             allCartItemsintoSTR.forEach(item =>{
             subTotal += item.totalPrice 
            });
        
              //console.log(subTotal);
             cartTotal.textContent = subTotal 
    }
          cartTotallyPrice()

/*-----END of cartPrice CART 總金額  addBtn let cartPrice (總金額加總~~)---*/



/*7.------clear Cart 清除所有購買項目-----*/
  const clearCart = document.querySelector(".clear-cart");//
        clearCart.addEventListener("click" , (e) =>{
              console.log(clearCart)

         let allCartItemsintoSTR = JSON.parse(localStorage.getItem("localStorageCartItem"))  
         console.log(allCartItemsintoSTR)
             allCartItemsintoSTR.forEach(item =>{
                  if (item.length > 0) {
                    let emptyArrayItem = [];
                    console.log(emptyArrayItem)
                   item += emptyArrayItem
                }

         })
           localStorage.setItem("localStorageCartItem" ,JSON.stringify(allCartItems));//當點擊removeBtn 更新localStorageCartItem最新暫存狀態[index]項目會被移除
           window.location.reload()  //當點擊removeBtn 網頁重新刷新     
        
  })



/*-----END of clear Cart 清除所有購買項目-----*/


     

     


















