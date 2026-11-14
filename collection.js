"use strict";
const grid=document.getElementById("collection-grid");
const escapeHtml=x=>String(x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
fetch("./data/collections/aurelle.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Unable to load collection");return r.json()}).then(data=>{
const entries=data.sections||[];
document.getElementById("collection-count").textContent=entries.length+" sections";
grid.innerHTML=entries.map((item,i)=>
'<article class="card"><div class="card-top"><span class="num">'+String(i+1).padStart(2,"0")+' / '+String(entries.length).padStart(2,"0")+'</span><span class="status">'+(item.published?"AVAILABLE":"TESTING PENDING")+'</span></div>'+
'<span class="category">'+escapeHtml(item.type)+'</span><h3>'+escapeHtml(item.name)+'</h3>'+
'<p>'+escapeHtml(item.description)+'</p>'+
'<div class="card-bottom"><a href="./section.html?section='+encodeURIComponent(item.id)+'" aria-label="View '+escapeHtml(item.name)+'">Section details ↗</a><span>'+(item.published?"Buy & download":"Private ZIP build")+'</span></div></article>').join("");
}).catch(()=>{grid.innerHTML='<p>Could not load the collection. Refresh this page.</p>'});