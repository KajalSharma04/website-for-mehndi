constcart= document.querySelector("nav.cart")
const cartsidebar = document.querySelector(".cart-sidebar")
const closecart = document.querySelector(".close-cart")
const buger = document.querySelector(".burger")
const menusidebar = document.querySelector(".menu-sidebar")
const clodemenu = document.querySelector(".close-menu")
const cartItemTotal = document.querySelector("noi")
const cartPriceTotal = document.querySelector(".total-amount")
const cartUi = document.querySelector(".cart-sidebar .cart")
const totalDiv = document.querySelector(".totle-sum")
const clearbtn = document.querySelector(".clear-cart-btn")
const cartcontent = document.querySelector(".cart-content")

let cart=[];
let buttonDOM =[];

cart.addEventListener("click",function(){
    cartsidebar.style.transform = "translate(0%)"
    const bodyOverlay = document.createElement("div")
    bodyOverlay.classList.add("overlay");
    setTimeout(function(){
        document.querySelector("body").append(bodyOverlay)
    },300)
})

closecart.addEventListener("click",function(){
    cartsideBar.style.transform= "translate(100%)"
    const bodyOverlay = document.querySelector(".overlay")
    document.querySelector("body").removeChild(bodyOverlay)
})

buger.addEventListener("click",function(){
    menusidebar.style.transform="translate(0%)"
})

clodemenu.addEventListener("click",function(){
    menusidebar.style.transform="translate(-100%)"
})

class product{
    async getproduct(){
        const response = await fetch("product.json");
        const data = await response.json();
        let product= data.item;
        product = product.map(item=>{
            const{title}= item.fields;
            const{id}= item.sys;
            const image = item.fields.image.fields.file.url;
            return {title,id,image};
        })
        return products;
    }
}

class UI {
    displayproducts(products){
        let result= "";
        products.forEach(product=>{
            const productDiv = document.createElement("div")
            productDiv.innerHTML = `<div class = "product-card">
            <img src="${product.image}"alt="product">
            <span class= "add-to-cart" data-id="${product.id}">
            <i class = "fa fa-cart--plus fa-1x"
            style=margin-right:0.1em; font-size:1em;"></i>
            Add to Cart
            </span>
            <div class="product-name">${product.title}</div>
            </div>`
            const p = document.querySelector(".product")
            p.append(productDiv)

        })
    }
}

getButtons()
{
    const btns = document.querySelectorAll(".add-to-cart")
    Array.from(btns)
    buttonDOM = btns;
    btns.forEach((btn)=>{
        let id = btn.dataset.id
        let incart = cart.find((item)=>item.id===id);
        if(incart)
        {
            btn.innerHTML = "In Cart"
            btn.dissabled = true

        }
        btn.addEventListener("click",(e)=>{
            e.currentTarget.innerHTML = "In Cart"
            e.currentTarget.style.color = "white"
            e.currentTarget.style.pointerEvent = "none"
            let cartitem = {...Storage.getStorageproducts(id),'amount':1}
            cart.pushO(cartitem)
            Storage.saveCart(cart)
            this.setcertValues(cart)
            this.addcartItem(cartItem)
        })
    })
}
setcCartValues(cart)
{
    let tempTotal = 0;
    let itemTotal = 0;
    cart.map((item)=>{
        tempTotal += (item.price*item.amount);
        itemTotal += item.amount;
        parseFloat(tempTotal.toFixed(2))
    })
    cartItemTotal.innerHTML = itemTotal
    cartPriceTotal.innerHTML = parseFloat(tempTotal.toFixed(2))
}
addcartItem(cartItem)
{
    let cartItemUi = document.createElement("div")
    cartItemUi.innerHTML = `<div class = "cart-product">
    <div class = "product-image">
    <img src"${cartItem.image} alt="product">
    </div>
    <div class = "cart-product-content">
    <div class = "cart-product-name"><h3>${cartitem.title}</h3></div>
    <div
    class = "cart-product-price"><h3>₹${cartitem.price}>/h3></div>
    <div class = "cart-product-remove data-id="${cartItem.id}"
    href = "#" style="color:red;">remove</a></div>
    </div>
    <div class = "plus-minus">
    <i class = "fa fa-angle-left add-amount"
    data-id="${cartItem.id}"></i>
    <span class ="no-of-items">${cartItem.amount}</span>
    data-id="${cartItem.id}"</i>
    </div>
    </div>`
    cartcontent.append(cartItemUi)
}
setupApp()
{
    cart = Storage.getCart()
    this.setcCartValues(cart)
    cart.map((item)=>{
        this.addcartItem(item)
    })
}
cartLogic()
{
    clearbtn.addEventListener("click",()=>{
        this.closecart()
    })
    cartcontent.addEventListener("click",(event)=>{
        if(event.target.classList.contains("cart-product-remove")){
            let id = event.target.dataset.id
            this.removeItem(id)
            let div = event.target.parentElement.parentElement.parentElement.parentElement
            div.removeChild(event.target.parentElement.parentElement.parentElement.parentElement)
        }
        else if(event.target.classList.contains("add-amount")){
            let id = event.target.dataset.id
            let item = cart.find((item)=>item.id===id)
            item.amount++
            Storage,saveCart(cart)
            this.setcCartValues(cart)
            event.target.nextElementSibling.innerHTML = item.amount
        }
        else if (event.target.classList.contains("reduce-amount")){
            let id = event.target.dataset.id
            let item = cart.find((item)=>item.id===id)
            if(item.amount>1){
                item.amount--
                Storage.saveCart(cart)
                this.saveCartValues(cart)
                event.target.previosElementSibling.innerHTML = item.amount
            }
            else{
                this.removeItem(id)
                let div= event.target.parentElement.parentElement.parentElement.parentElement
                div.removeChild(event.target.parentElement.parentElement.parentElement.parentElement)
            }
        }
    })

}

addamount()
{
    const addbtn = document.querySelectorAll(".add-amount")
    addbtn.forEach((btn)=>{
        btn.addEventListener("click",(event)=>{
            let id = (event.currentTarget.dataset.id)
            cart.map((item)=>{
                if(item.id===id){
                item.amount++
                Storage.saveCart(cart)
                this.setcCartValues(cart)
                const amountUi = event.currentTarget.parentElement.children[1]
                amountUi.innerHTML = item.amount
                }
            })
        })
    })
}
reduceAmount()
{
    const reduceBtn = document.querySelectorAll(".reduce-amount")
    reduceBtn.forEach((btn)=>{
        btn.addEventListener("click",(event)=>{
            let id = (event.currentTarget.dataset.id)
            cart.map((item)=>{
                if (item.id===id){
                    item.amount--
                    if(item.amount>0){
                        Storage.saveCart(cart)
                        this.saveCartValues(cart)
                        const amountUi = event.currentTarget.parentElement.children[1]
                        amountUi.innerHTML = item.amount
                    }else{
                        event.currentTarget.parentElement.parentElement.parentElement.removeChild(event)
                        this.removeItem(id)
                    }
                }
            })
        })
    })
}
clearCart()
{
    let cartItem = cart.map(item=>item.id)
    cartItem.forEach((id)=>this.removeItem(id))
    const cartproduct = document.querySelectorAll(".cart-product")
    cartproduct.forEach((item)=>{
        if(item){
            item.parentElement.removeChild(item)
        }
    })
}
removeItem(id)
{
    cart = cart.filter((item)=>item.id!==id)
    this.setcCartValues(cart)
    Storage.saveCart(cart)
    let button = this.getSingleButton(id)
    button.style.pointerEvents = "unset" 
    button.innerHTML=`<i class = fa fa-cart-plus"></i>Add To Cart`
}
getSingleButton(id)
{
    let btn
    buttonDOM.forEach((button)=>{
        if(button.dataset.id===id){
            btn = button
        }
    })
    return btn
}
class Storage{
    static saveProducts(products){
        localStorage.setItem("products",JSON.stringify(products))
    }
    static getStorageproducts(id){
        let products = JSON.parse(localStorage.getItem1('products'))
        return products.find((item)=>item.id===id)
    }
    static saveCart(cart){
        localStorage.setItem('Cart',JSON.stringify(cart))
    }
    static getCart()
    {
        return localStorage.getItem('Cart')? JSON.parse(localStorage.getItem("cart")):[]
    }
}
document.addEventListener("DOMContentLoaded",()=>{
    const products = new product();
    const ui = new UI();
    ui.setupApp()
    products.getproduct().then(products=>{
        ui.displayproducts(products)
        Storage.saveProducts(products)

    }).then(()=>{
        ui.getButtons();
        ui.cartLogic();
    })
})

