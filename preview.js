"use strict";const $=q=>document.querySelector(q);let item=null,device="desktop",scale="fit";const id=new URLSearchParams(location.search).get("section");
function show(selector,on){$(selector).hidden=!on}
function safeURL(str){if(typeof str!=="string"||!str.trim())return null;try{const url=new URL(str,document.baseURI);return ["http:","https:"].includes(url.protocol)?url.href:null}catch{return null}}
function render(){
 if(!item)return;
 const mobile=device==="mobile";
 const activeDemo=safeURL(item.liveDemoUrl);
 const isLive=Boolean(activeDemo);
 const image=safeURL(mobile?item.previewMobile:item.previewImage);
 show("#loading",false);show("#error",false);
 show("#live-demo-frame",isLive);
 show("#image-box",!isLive&&!!image);
 show("#mobile-missing",!isLive&&mobile&&!image);
 $("#desktop").classList.toggle("active",!mobile);$("#mobile").classList.toggle("active",mobile);
 $("#desktop").setAttribute("aria-pressed",String(!mobile));$("#mobile").setAttribute("aria-pressed",String(mobile));
 $("#fit").classList.toggle("active",scale==="fit");$("#actual").classList.toggle("active",scale==="100");
 $("#fit").setAttribute("aria-pressed",String(scale==="fit"));$("#actual").setAttribute("aria-pressed",String(scale==="100"));
 $("#image-box").classList.toggle("actual-size",scale==="100");
 const frame=$("#live-demo-frame");
 frame.dataset.device=device;
 frame.classList.toggle("actual-size",scale==="100");
 if(isLive){
  const iframe=$("#demo-iframe");if(iframe.dataset.src!==activeDemo){iframe.src=activeDemo;iframe.dataset.src=activeDemo}
  $("#preview-caption").textContent="Interactive browser demo · Not Shopify runtime";
 }else{
  $("#preview-caption").textContent=mobile&&!image?"Mobile preview not available":"Design reference · Shopify test pending";
  if(image){$("#design-image").src=image;$("#design-image").alt=(mobile?"Mobile":"Desktop")+" reference of "+item.name}
 }
}
function changeDevice(to){device=to;scale="fit";render()}
$("#desktop").addEventListener("click",()=>changeDevice("desktop"));$("#mobile").addEventListener("click",()=>changeDevice("mobile"));$("#back-desktop").addEventListener("click",()=>changeDevice("desktop"));$("#fit").addEventListener("click",()=>{scale="fit";render()});$("#actual").addEventListener("click",()=>{scale="100";render()});
$("#fullscreen").addEventListener("click",async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen()}catch(e){console.warn("Browser fullscreen permission denied",e)}});
document.addEventListener("fullscreenchange",()=>{$("#fullscreen").innerHTML=document.fullscreenElement?"⤢ <span>Exit full screen</span>":"⛶ <span>Full screen</span>"});
fetch("./data/collections/aurelle.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Catalog unavailable");return r.json()}).then(data=>{item=(data.sections||[]).find(x=>x.id===id);if(!item)throw Error("Unknown section");$("#section-name").textContent=item.name;document.title="Preview — "+item.name+" · modu.";$("#collection-name").textContent="AURELLE · "+item.type;$("#back").href="./section.html?section="+encodeURIComponent(item.id);render()}).catch(()=>{show("#loading",false);show("#error",true)});
