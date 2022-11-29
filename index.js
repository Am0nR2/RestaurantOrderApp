import { menuArray } from "./data.js "



let p = 0;
let h = 0;
let b= 0;



document.addEventListener("click",function(e){
   if(e.target.dataset.pizza){
    pizzaOrder(e.target.dataset.pizza)
} else if(e.target.dataset.hamburger){
    hamburgerOrder(e.target.dataset.hamburger)
} else if(e.target.dataset.beer){
    beerOrder(e.target.dataset.beer)
} else if(e.target.dataset.removepizza){
    if((p>1) && (bill>0)){
        p--
        bill -= 14
        document.getElementById("total-price").textContent = `$${bill}`
        document.getElementById(e.target.dataset.removepizza).textContent = `(x${(p)}) `
        }

    console.log(e.target.dataset.removepizza)
    
} else if(e.target.dataset.removehamburger){
    if((h>1) && (bill>0)){
    h--
    bill -= 12
    document.getElementById("total-price").textContent = `$${bill}`
    document.getElementById(e.target.dataset.removehamburger).textContent = `(x${(h)}) `
    }

    console.log(h)
    console.log(e.target.dataset.removehamburger)
} else if(e.target.dataset.removebeer){
    if((b>1)&&(bill>0)){
        b--
        bill -=12
        document.getElementById("total-price").textContent = `$${bill}`
        document.getElementById(e.target.dataset.removebeer).textContent = `(x${(b)}) `
        } if(b===0){
            allOrders.splice(2 , 1)
            renderOrdered()
            bill -=12
        }


    console.log(e.target.dataset.removebeer)
} else if(e.target.id === "finish"){
    document.getElementById("form-area").style.display= "inline"
    const paymentForm = document.getElementById("payment-form")
    paymentForm.addEventListener("submit", function(e){
        e.preventDefault()
        const myNewForm = new FormData(paymentForm)

        const userName = myNewForm.get("user-name")
        const userCard = myNewForm.get("user-card")
        const userPass = myNewForm.get("user-pass")
        document.getElementById("user-name-get").textContent = userName
        document.getElementById("form-area").style.display= "none"
        document.getElementById("form-container").style.display ="none"
        document.getElementById("section-close").style.display ="none"
        document.getElementById("thanks-area").classList.remove("hidden")
    })

} else if(e.target.id === "modal-close-btn"){
    document.getElementById("form-area").style.display= "none"
}
    
})





const allOrders = []
let bill = 0;

function render(){
let menu = "";

menuArray.forEach(function(food){
menu += `
<div class="container">
<section>
    <div class="foods">
    
        <img src="${food.emoji}" alt="">
        <div class="food-info">
             <h3>${food.name}</h3>
             <p class="content">${food.ingredients}</p>
             <p class="price">$${food.price}</p>
        </div>
        <div class="increment">
            <button data-${food.name}="${food.id}" >+</button>
        </div>
    </div>


`

})
menu += `
<div class="container hidden" id="your-order">
<section class="payment" id="section-close">
    <div class="paymenttitle">
        <h3>Your Order</h3>
    </div>
    <div class="orders" id="ordered-here">
    </div>

    <div class="complatePayment">
        <div class="order"> <p> Total Price:</p> <p id="total-price">$24 </p></div>
        <button id="finish"> Complete Order </button>
    </div>
</section>

<div class="container" id="form-container">
<div class="formArea" id="form-area">
    <button id="modal-close-btn">x</button>
    <div class="paymenttitle"> <h3> Enter Card Details</h3></div>
    <form id="payment-form">
        <input type="text" placeholder="Enter Your Name"  required name ="user-name" id="user-name">
        <input type="text" placeholder="Enter Card Number" required name ="user-card" id="user-card">
        <input type="text" placeholder="Enter Card CVV" required name ="user-pass" id="card-cvv">
    
        <button id="finish-last" type="submit"> Pay </button>
    </form>
</div>
</div>

<div class="container hidden" id="thanks-area">
    <div class="thanks-area ">
        <p>Thanks, <span id="user-name-get"></span> Your order is on its way!</p>

    </div>
</div>
    
`
document.getElementById("menuHere").innerHTML = menu;
}


render()
function renderOrdered(x){
    let ordered = ""

    allOrders.forEach(function(order){
       
     ordered += `
    
        <div class="order ">
           <p class="ordered"><span id="${order.id}"> </span>${order.name}
           <button class="remove-btn" data-remove${order.name}="${order.id}">remove</button></p> 
           <p class="ordered">$${order.price}</p>
        </div> 
        
    
    `
  
    })
    document.getElementById("your-order").classList.remove("hidden")
    document.getElementById("ordered-here").innerHTML = ordered
    
    return(allOrders)
   
}


function pizzaOrder(foodid){
    const ordered = menuArray.filter(function(menu){
        return menu.id == foodid;
    })[0]
    p++
    if(!allOrders.includes(ordered)){
        allOrders.push(ordered)
        renderOrdered()
    } else{

    }
    
    
    
    bill +=14
    if(p>1){
        document.getElementById(foodid).textContent = `(x${(p)}) `
    }
    
    document.getElementById("total-price").textContent = `$${bill}`
    return allOrders, p
    
}

function hamburgerOrder(foodid){
    
    const ordered = menuArray.filter(function(menu){
        return menu.id == foodid;
    })[0]
    h++
    if(!allOrders.includes(ordered)){
        allOrders.push(ordered)
        renderOrdered()
    } else{

    }
   
    bill += 12
    if(h>1){
        document.getElementById(foodid).textContent = ` (x${(h)}) `
    }
    
    document.getElementById("total-price").textContent = `$${bill}`
    return allOrders, h
}

function beerOrder(foodid){
    const ordered = menuArray.filter(function(menu){
         return menu.id == foodid;
         })[0]
         b++
         if(!allOrders.includes(ordered)){
            allOrders.push(ordered)
            renderOrdered()
        } else{

        }
        bill += 12
         if(b>1){
        document.getElementById(foodid).textContent = `(x${(b)}) `
        }
        document.getElementById("total-price").textContent = `$${bill}`
         return allOrders, b
}







 