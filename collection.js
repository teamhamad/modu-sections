"use strict";
const grid=document.getElementById("collection-grid");
const escapeHtml=x=>String(x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
fetch("./data/collections/aurelle.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Unable to load collection");return r.json()}).then(data=>{
const entries=data.sections||[];
document.getElementById("collection-count").textContent=entries.length+" sections";
grid.innerHTML=entries.map((item,i)=>
'<article class="card"><div class="card-top"><span class="num">'+String(i+1).padStart(2,"0")+' / '+String(entries.length).padStart(2,"0")+'</span><span class="status">'+(item.published?"AVAILABLE":"IN DEVELOPMENT")+'</span></div>'+
'<div class="card-cover"><img loading="lazy" src="'+escapeHtml(item.previewImage)+'" alt="Design preview of '+escapeHtml(item.name)+'"></div><span class="category">'+escapeHtml(item.type)+'</span><h3>'+escapeHtml(item.name)+'</h3>'+
'<p>'+escapeHtml(item.description)+'</p>'+
'<div class="card-bottom"><a href="./preview.html?section='+encodeURIComponent(item.id)+'" target="_blank" rel="noopener noreferrer" aria-label="Full screen preview of '+escapeHtml(item.name)+'">⛶ Full preview</a><a href="./section.html?section='+encodeURIComponent(item.id)+'" aria-label="View details for '+escapeHtml(item.name)+'">Details ↗</a></div></article>').join("");
}).catch(()=>{grid.innerHTML='<p>Could not load the collection. Refresh this page.</p>'});