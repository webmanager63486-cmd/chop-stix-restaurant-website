const menu = [
  {cat:"Single Veggie Pizza", anchor:"pizza", veg:true, items:[
    ["CHEESE & CAPSICUM","Fresh & crisp capsicum",70,100,"pizza"],
    ["CHEESE & ONION","Crunchy onion on a cheesy base",70,100,"pizza"],
    ["CHEESE & TOMATO","Juicy tomato with cheese & tangy sauce",70,100,"pizza"],
    ["CHEESE & CORN","Fresh juicy golden corn",70,100,"pizza"]
  ]},
  {cat:"Double Veggie Pizza", anchor:"pizza", veg:true, items:[
    ["ONION & CAPSICUM","Onion & capsicum with mozzarella cheese",90,120,"pizza"],
    ["TOMATO & CORN","Mozzarella cheese, corn and juicy tomato",90,120,"pizza"],
    ["ONION & PANEER","Creamy paneer & onion with mozzarella cheese",90,120,"pizza"]
  ]},
  {cat:"Classic Veg Pizza", anchor:"pizza", veg:true, items:[
    ["MARGHERITA","Classic delight with 100% real mozzarella cheese",90,120,"pizza"],
    ["MEXICAN VEGGIE WAVES","Mexican herbs, onion, capsicum, tomato & jalapeno",100,150,"pizza"],
    ["SPICE PANEER","Spiced paneer, onion, green capsicum & red paprika herbs",100,150,"pizza"],
    ["CORN EXOTICA","Golden corn with onion & tomato",100,150,"pizza"],
    ["PANEER MAKHANI","Makhani sauce topped with paneer, capsicum & onion",120,150,"pizza"],
    ["VEGGIE OVERLOADED","Veg delight with onion, capsicum, tomato, corn, paneer, red paprika & double cheese",200,200,"pizza"]
  ]},
  {cat:"Tandoori Pizza", anchor:"pizza", veg:true, items:[
    ["TANDOORI PANEER PIZZA","Tandoori paneer with capsicum, red paprika & tandoori mayo",120,160,"pizza"],
    ["TANDOORI CHICKEN PIZZA","Tandoori masala with chicken tikka, onion, red paprika & tandoori mayo",120,160,"tandoori"]
  ]},
  {cat:"Classic Non Veg Pizza", anchor:"pizza", veg:false, items:[
    ["BBQ CHICKEN","BBQ chicken, butter, sesame seed & chilly flake",130,180,"bbq"],
    ["CHICKEN EXOTICA","Juicy chicken, capsicum, onion & tomato",130,180,"chicken"],
    ["CHICKEN GOLDEN DELIGHT","Herbed chicken, sweet corn & tomato",130,180,"chicken"],
    ["PERI PERI CHICKEN BITE","Peri peri chicken, onion, tomato & jalapeno",130,180,"chicken"]
  ]},
  {cat:"Chinese Favourites", anchor:"chinese", veg:true, items:[
    ["CHILLI GARLIC NOODLES","Wok-tossed noodles with chilli, garlic & vegetables",110,160,"noodles"],
    ["VEG HAKKA NOODLES","Classic street-style Hakka noodles with fresh vegetables",100,150,"noodles"],
    ["CHICKEN HAKKA NOODLES","Wok-tossed Hakka noodles with tender chicken",130,180,"noodles"],
    ["VEG MANCHURIAN","Crispy vegetable balls in a savoury Indo-Chinese sauce",100,150,"manchurian"]
  ]},
  {cat:"Momos", anchor:"momos", veg:true, items:[
    ["VEG MOMOS","Steamed dumplings filled with seasoned vegetables",70,120,"momos"],
    ["PANEER MOMOS","Soft dumplings with a creamy paneer filling",90,140,"momos"],
    ["CHICKEN MOMOS","Steamed dumplings filled with seasoned chicken",90,140,"momos"],
    ["AFGHANI MOMOS","Creamy, rich momos with a mildly spiced sauce",100,150,"momos"]
  ]}
];

const imageMap={
  pizza:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=82",
  tandoori:"https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=700&q=82",
  bbq:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=82",
  chicken:"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=82",
  noodles:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=82",
  manchurian:"https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=700&q=82",
  momos:"https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=82"
};
let cart=JSON.parse(localStorage.getItem("chopstix-cart")||"[]");

const menuList=document.getElementById("menuList");
menu.forEach(section=>{
  const wrap=document.createElement("section"); wrap.id=section.anchor;
  wrap.innerHTML=`<h2 class="menu-category-title">${section.cat.replace("Pizza","<em> Pizza</em>")}</h2><div class="items-grid"></div>`;
  const grid=wrap.querySelector(".items-grid");
  section.items.forEach((x,i)=>{
    const [name,desc,s,m,img]=x;
    const id=(section.cat+"-"+name).toLowerCase().replace(/[^a-z0-9]+/g,"-");
    const card=document.createElement("article"); card.className="food-card "+(section.veg?"":"nonveg");
    card.innerHTML=`<div class="food-img"><img src="${imageMap[img]}" alt="${name}" loading="lazy"><span class="veg-dot"></span></div>
      <div class="food-body"><h3>${name}</h3><p>${desc}</p><div class="price-row"><div class="prices">S <strong>₹${s}</strong> &nbsp; M <strong>₹${m}</strong></div><button class="add-btn" data-id="${id}">Add to order</button></div></div>`;
    card.querySelector(".add-btn").addEventListener("click",()=>addItem({id,name,desc,price:m,img:imageMap[img],size:"M"}));
    grid.appendChild(card);
  });
  menuList.appendChild(wrap);
});

function addItem(item){const found=cart.find(x=>x.id===item.id&&x.size===item.size); if(found)found.qty++; else cart.push({...item,qty:1}); save(); renderCart(); toast("Added to your order");}
function save(){localStorage.setItem("chopstix-cart",JSON.stringify(cart));}
function money(n){return "₹"+n.toLocaleString("en-IN")}
function renderCart(){
  document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);
  const el=document.getElementById("cartItems");
  if(!cart.length){el.innerHTML='<div class="empty-cart">Your basket is empty.<br><span>Add something delicious.</span></div>';}
  else el.innerHTML=cart.map((x,i)=>`<div class="cart-line"><img src="${x.img}" alt=""><div><h4>${x.name}</h4><small>${x.size} • ${money(x.price)} each</small><div class="qty"><button data-i="${i}" data-d="-1">−</button><b>${x.qty}</b><button data-i="${i}" data-d="1">+</button></div></div><strong class="line-price">${money(x.price*x.qty)}</strong></div>`).join("");
  el.querySelectorAll(".qty button").forEach(b=>b.onclick=()=>changeQty(+b.dataset.i,+b.dataset.d));
  const total=cart.reduce((a,x)=>a+x.price*x.qty,0); document.getElementById("subtotal").textContent=money(total);
}
function changeQty(i,d){cart[i].qty+=d;if(cart[i].qty<=0)cart.splice(i,1);save();renderCart();}
function toast(t){const el=document.getElementById("toast");el.textContent=t;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),1300)}
function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("cartBackdrop").classList.add("show")}
function closeCart(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("cartBackdrop").classList.remove("show")}
document.getElementById("openCart").onclick=openCart; document.getElementById("closeCart").onclick=closeCart; document.getElementById("cartBackdrop").onclick=closeCart;
document.getElementById("checkout").onclick=()=>{
  if(!cart.length){toast("Add an item first");return}
  const dialog=document.getElementById("checkoutDialog"), summary=document.getElementById("dialogSummary");
  summary.innerHTML=cart.map(x=>`<div class="summary-line"><span>${x.qty} × ${x.name}</span><span>${money(x.price*x.qty)}</span></div>`).join("");
  document.getElementById("dialogTotal").textContent=document.getElementById("subtotal").textContent;
  dialog.showModal();
};
renderCart();
