
"use strict";
const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
const demoProducts=[
{name:"Gentle Cream Cleanser",category:"Cleansers",price:24,shape:"tube",palette:"cream",decor:"leaf",new:true,description:"A gentle daily cleanser designed for a considered skincare ritual."},
{name:"Detox Clay Mask",category:"Masks",price:28,shape:"jar",palette:"sage",decor:"leaf",new:false,description:"A mineral-inspired clay mask for your weekly care routine."},
{name:"Brightening Eye Cream",category:"Eye care",price:32,shape:"jar",palette:"gold",decor:"stone",new:true,description:"A brightening eye cream with a soft, rich texture."},
{name:"Exfoliating Toner",category:"Toners",price:26,shape:"pump",palette:"rose",decor:"flower",new:true,description:"An illustrative toning step in the AURELLE ritual."},
{name:"Daily Defense SPF 50+",category:"Sunscreen",price:30,shape:"tube",palette:"cream",decor:"flower",new:false,description:"A lightweight daily sunscreen concept."},
{name:"Renewal Night Cream",category:"Moisturizers",price:38,shape:"jar",palette:"cream",decor:"flower",new:false,description:"An evening moisturization ritual with a comforting finish."},
{name:"Gentle Foaming Cleanser",category:"Cleansers",price:27,shape:"pump",palette:"olive",decor:"bubbles",new:true,description:"A foaming cleansing step with a refreshing feel."},
{name:"Nourishing Moisturizer",category:"Moisturizers",price:34,shape:"jar",palette:"olive",decor:"leaf",new:false,description:"A rich daily cream designed for a calm-looking skincare display."},
{name:"Calming Botanical Serum",category:"Serums",price:36,shape:"dropper",palette:"olive",decor:"leaf",new:true,description:"A botanical serum illustration for curated collections."},
{name:"Hydrating Essence",category:"Essences",price:29,shape:"pump",palette:"rose",decor:"flower",new:false,description:"A hydrating essence visual for the skincare routine."},
{name:"Soft Renewal Balm",category:"Balms",price:31,shape:"jar",palette:"cream",decor:"stone",new:false,description:"A comforting balm sample, shown for layout demonstration."},
{name:"Purifying Cleanser",category:"Cleansers",price:23,shape:"tube",palette:"sage",decor:"leaf",new:true,description:"A fresh illustrative cleanser layout."},
{name:"Barrier Support Cream",category:"Moisturizers",price:39,shape:"jar",palette:"rose",decor:"flower",new:true,description:"A soothing cream display sample."},
{name:"Vitamin Glow Drops",category:"Serums",price:37,shape:"dropper",palette:"gold",decor:"stone",new:false,description:"An illuminating drops sample for hero merchandising."},
{name:"Daily Comfort Lotion",category:"Lotions",price:29,shape:"pump",palette:"cream",decor:"flower",new:false,description:"A lotion product display for catalog layout testing."},
{name:"Overnight Recovery Mask",category:"Masks",price:33,shape:"jar",palette:"olive",decor:"leaf",new:true,description:"An overnight mask sample illustrating the product-card design."},
{name:"Balance Facial Oil",category:"Oils",price:35,shape:"dropper",palette:"gold",decor:"stone",new:false,description:"A nourishing facial oil example."},
{name:"Gentle Reset Cleanser",category:"Cleansers",price:25,shape:"tube",palette:"rose",decor:"flower",new:true,description:"A delicate cleanser product illustration."},
{name:"Cooling Eye Gel",category:"Eye care",price:28,shape:"tube",palette:"sage",decor:"bubbles",new:false,description:"A cooling eye gel example."},
{name:"Botanical Facial Mist",category:"Mists",price:22,shape:"pump",palette:"olive",decor:"leaf",new:true,description:"A refreshing mist product illustration."},
{name:"Radiance Cream",category:"Moisturizers",price:35,shape:"jar",palette:"gold",decor:"stone",new:false,description:"A soft cream visual example."},
{name:"Soft Touch Toner",category:"Toners",price:26,shape:"pump",palette:"rose",decor:"flower",new:false,description:"A toner visual for category collections."},
{name:"Daily Mineral Shield",category:"Sunscreen",price:32,shape:"tube",palette:"cream",decor:"leaf",new:true,description:"A daily protection display example."},
{name:"Botanical Cream Mask",category:"Masks",price:30,shape:"jar",palette:"sage",decor:"leaf",new:false,description:"A weekly care mask example."}
];
let currentPage=0,lastFocus=null;
const state={heading:"Discover our latest rituals",description:"Gentle, effective essentials for a calm, considered routine.",columns:"4",gap:"16",badges:true,labels:true,rounded:false};
function esc(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function art(product){
  const words=product.name.split(/\s+/);
  const shortName=words.slice(0,3).join(" ");
  return '<span class="product-object shape-'+esc(product.shape)+' shape-'+esc(product.palette)+'" aria-hidden="true"><span class="container-shape"></span><span class="cap-shape"></span><span class="pack-label"><span class="pack-brand">AURELLE</span><span class="pack-labelname">'+esc(shortName)+'</span><span class="pack-details">SKINCARE · DAILY RITUAL</span></span></span><span class="product-decoration '+esc(product.decor)+'" aria-hidden="true"></span>';
}
function renderCards(){
  const slice=demoProducts.slice(currentPage*8,currentPage*8+8);
  $("#products").innerHTML=slice.map((product,i)=>{
    const idx=currentPage*8+i;
    return '<article class="product-card"><div class="product-media" style="--product-background:'+(["#f0ebe5","#f2ece3","#f2ede6","#f1e8e1"][idx%4])+'">'+
      art(product)+(product.new&&state.badges?'<span class="product-new">New</span>':'')+
      (state.labels?'<span class="product-cat">'+esc(product.category)+'</span>':'')+
      '</div><div class="product-footer"><h2>'+esc(product.name)+'</h2><span>$'+product.price+'</span></div>'+
      '<button class="product-open" type="button" data-product="'+idx+'" aria-label="View '+esc(product.name)+' demo details"></button></article>';
  }).join("");
  $("#pagination").innerHTML=[0,1,2].map(i=>'<button type="button" data-page="'+i+'" class="'+(currentPage===i?"active":"")+'" aria-label="Page '+(i+1)+' of 3" aria-current="'+(currentPage===i?"page":"false")+'"></button>').join("");
}
function update(){
  state.heading=$("#heading-input").value.trim()||"Discover our latest rituals";
  state.description=$("#description-input").value.trim()||"Gentle, effective essentials for a calm, considered routine.";
  state.columns=$("#columns-input").value;
  state.gap=$("#gap-input").value;
  state.badges=$("#badges-input").checked;
  state.labels=$("#labels-input").checked;
  state.rounded=$("#rounded-input").checked;
  $("#ritual-title").textContent=state.heading;
  $("#ritual-subtitle").textContent=state.description;
  $("#ritual-grid").style.setProperty("--grid-columns",state.columns);
  $("#ritual-grid").style.setProperty("--grid-gap",state.gap+"px");
  $("#ritual-grid").style.setProperty("--card-radius",state.rounded?"11px":"0px");
  $("#gap-value").textContent=state.gap+"px";
  renderCards();
}
function openQuick(index,invoker){
  const product=demoProducts[index];if(!product)return;
  lastFocus=invoker;
  $("#quick-title").textContent=product.name;
  $("#quick-description").textContent=product.description;
  $("#quick-price").textContent="$"+product.price+" · sample price";
  $("#quick-art").innerHTML=art(product);
  const dialog=$("#quick-dialog");if(typeof dialog.showModal==="function")dialog.showModal();else dialog.setAttribute("open","");
}
function closeQuick(){const dialog=$("#quick-dialog");if(typeof dialog.close==="function")dialog.close();else dialog.removeAttribute("open");if(lastFocus?.isConnected)lastFocus.focus();}
$("#products").addEventListener("click",e=>{const btn=e.target.closest("[data-product]");if(btn)openQuick(Number(btn.dataset.product),btn);});
$("#pagination").addEventListener("click",e=>{const btn=e.target.closest("[data-page]");if(!btn)return;currentPage=Number(btn.dataset.page);renderCards();$("#pagination").querySelector('button[data-page="'+currentPage+'"]').focus();});
$("#quick-close").addEventListener("click",closeQuick);
$("#quick-done").addEventListener("click",closeQuick);
$("#quick-dialog").addEventListener("click",e=>{if(e.target===$("#quick-dialog"))closeQuick();});
$("#quick-dialog").addEventListener("close",()=>{if(lastFocus?.isConnected)lastFocus.focus();});
const panel=$("#customizer-panel"),trigger=$("#customizer-trigger");
trigger.addEventListener("click",()=>{const opening=panel.hidden;panel.hidden=!opening;trigger.setAttribute("aria-expanded",String(opening))});
["heading-input","description-input","columns-input","gap-input","badges-input","labels-input","rounded-input"].forEach(id=>$("#"+id).addEventListener("input",update));
$("#reset-inputs").addEventListener("click",()=>{$("#heading-input").value="Discover our latest rituals";$("#description-input").value="Gentle, effective essentials for a calm, considered routine.";$("#columns-input").value="4";$("#gap-input").value="16";$("#badges-input").checked=true;$("#labels-input").checked=true;$("#rounded-input").checked=false;currentPage=0;update();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!panel.hidden){panel.hidden=true;trigger.setAttribute("aria-expanded","false");trigger.focus();}});
update();
