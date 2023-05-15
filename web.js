let shop=document.getElementById('shop');
let basket=JSON.parse(localStorage.getItem("Cart_Items"))||[];
let generateshop =()=>{
    return shop.innerHTML=(shop.innerHTML=shopItemsData.map((x)=>{
        let{id,name,price,desc,img}=x;

        let search= basket.find((x)=>x.id==id)||[]
        return` 
        <div id=product-id-${id} class="item">
        <img width="220"  src=${img} alt="">
        <div class="details">
            <h3>
              ${name}
            </h3>
            <p>${desc} </p>
         <div class="price-quantity">
         <h2 style="font-size: 30px;" style="text-align: left;" >
         <i class="bi bi-star"></i>
         <i class="bi bi-star"></i>
         <i class="bi bi-star"></i>
         <i class="bi bi-star"></i>
            Rs.${price}
         </h2>
                <div class="buttons">
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    <div id=${id} class="quantity">${search.item===undefined?0:search.item}</div>
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                </div>
            </div>
            </div>
            
    
    </div>
        `
    }).join(""));
};
generateshop();
let increment= (id) =>{
    let selectedItem= id;
    
    let search =basket.find((x)=>x.id===selectedItem.id)
    if(search=== undefined)
    {

    basket.push({
        id:selectedItem.id,
        item:1,
        
    });
}
else
{
    search.item+=1;
}
localStorage.setItem("Cart_Items",JSON.stringify(basket));
    update(selectedItem.id);

};
let decrement= (id) =>{
    let selectedItem= id;
   
    let search =basket.find((x)=>x.id===selectedItem.id)
    if(search===0) return;
    else if(search.item === 0) return;
else
{
    search.item-=1;
}
update(selectedItem.id);

basket=basket.filter((x)=>x.item!==0);
 
    localStorage.setItem("Cart_Items",JSON.stringify(basket));
};

let update = (id) =>{
    let search= basket.find((x)=>x.id === id);
    document.getElementById(id).innerHTML=search.item;
    calculation();
};
let calculation=()=>{
    let cartIcon=document.getElementById("cartamount");
    cartIcon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
};
calculation();

