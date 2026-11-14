/* modu. Shopify sections marketplace.
   Only real existing builds with catalogVisible=true are shown. Unverified items are previews only; secure checkout is never simulated.
   Paid Liquid source must NEVER be placed in this public static repository. */
"use strict";

const TYPES = ["Product sections","Hero & banners","Collections","Social proof","Interactive","Content & story"];
const INDUSTRIES = [
  ["Skincare & beauty","✳"],["Fashion & apparel","◈"],["Home & living","⌂"],
  ["Jewelry & accessories","◇"],["Wellness","✺"],["Food & drink","◌"],
  ["Electronics","▣"],["Pets","♡"]
];
const STYLES = ["Minimal","Editorial","Modern","Bold","Playful"];
let CATALOG = [];
let catalogStatus = "loading";
const state = {
  query:"",industries:new Set(),types:new Set(),styles:new Set(),
  sort:"featured",savedOnly:false,saved:new Set(),modalId:null,device:"desktop"
};
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const icon = name => '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
const escapeHtml = value => String(value == null ? "" : value).replace(/[&<>"']/g, char => ({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
}[char]));
const normalize = value => String(value || "").toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
const assetUrl = value => {
  if (typeof value !== "string" || !value.trim()) return "";
  try {
    const u = new URL(value, window.location.href);
    return ["https:","http:"].includes(u.protocol) ? escapeHtml(u.href) : "";
  } catch { return ""; }
};
const safeId = value => /^[a-z0-9][a-z0-9-]*$/i.test(String(value || ""));
let lastFocused = null;

function validItem(item) {
  return item && (item.catalogVisible === true || item.published === true) && safeId(item.id) &&
    typeof item.name === "string" && item.name.trim() &&
    TYPES.includes(item.type) && Array.isArray(item.industry) &&
    item.industry.length > 0 && item.industry.every(v => INDUSTRIES.some(([name]) => name === v)) &&
    STYLES.includes(item.style) && typeof item.thumbnail === "string" && Boolean(assetUrl(item.thumbnail));
}
function restoreSaved() {
  try {
    const ids = JSON.parse(localStorage.getItem("modu_saved") || "[]");
    state.saved = new Set(Array.isArray(ids) ? ids.filter(id => CATALOG.some(item => item.id === id)) : []);
  } catch { state.saved = new Set(); }
}
function saveShortlist() {
  try { localStorage.setItem("modu_saved", JSON.stringify([...state.saved])); } catch {}
}
function matches(item) {
  const terms = normalize(state.query).split(" ").filter(t => t && !["section","sections","shopify","for","and","the"].includes(t));
  const corpus = normalize([item.name,item.type,item.style,item.desc || "",item.keywords || "",
    ...(item.industry || []),...(item.tags || [])].join(" "));
  if (terms.some(term => !corpus.includes(term))) return false;
  if (state.industries.size && !item.industry.some(value => state.industries.has(value))) return false;
  if (state.types.size && !state.types.has(item.type)) return false;
  if (state.styles.size && !state.styles.has(item.style)) return false;
  if (state.savedOnly && !state.saved.has(item.id)) return false;
  return true;
}
function sortedItems(items) {
  const rows = [...items];
  if (state.sort === "newest") rows.sort((a,b) => (Number(Boolean(b.new))-Number(Boolean(a.new))) || (Number(a.order||0)-Number(b.order||0)));
  else if (state.sort === "name") rows.sort((a,b) => a.name.localeCompare(b.name));
  else rows.sort((a,b) => Number(a.order||0)-Number(b.order||0));
  return rows;
}
function screenshot(item, device) {
  return assetUrl(device === "mobile" ? item.previewMobile || item.previewDesktop || item.thumbnail
    : item.previewDesktop || item.thumbnail);
}
function cardMarkup(item) {
  const saved=state.saved.has(item.id);
  const tags=Array.isArray(item.tags)?item.tags:[];
  const ready=item.published===true && item.shopifyTested===true;
  const badge=ready?"Available":"In development";
  return '<article class="product-card shop-card">' +
    '<div class="card-media"><button class="card-preview-open" type="button" data-preview="'+escapeHtml(item.id)+'" aria-label="Preview '+escapeHtml(item.name)+'">' +
    '<img class="real-preview-image" src="'+assetUrl(item.thumbnail)+'" alt="Design preview of '+escapeHtml(item.name)+'" loading="lazy" decoding="async" />' +
    '<span class="card-hover-preview">'+icon("monitor")+' View preview</span></button>' +
    '<span class="shop-card-status'+(ready?" is-ready":"")+'">'+escapeHtml(badge)+'</span>' +
    '<button class="card-save'+(saved?' saved':'')+'" type="button" data-save="'+escapeHtml(item.id)+'" aria-label="'+(saved?"Remove saved ":"Save ")+escapeHtml(item.name)+'" aria-pressed="'+saved+'">'+icon("heart")+'</button></div>' +
    '<div class="card-info"><div class="card-caption"><span>'+escapeHtml(item.type)+'</span><span class="shop-brand">'+escapeHtml(item.collection||"AURELLE")+'</span></div>' +
    '<div class="card-title-row"><button data-preview="'+escapeHtml(item.id)+'" type="button">'+escapeHtml(item.name)+'</button></div>' +
    '<p class="card-description">'+escapeHtml(item.desc||"")+'</p>' +
    '<div class="card-tags">'+tags.map(tag=>'<span>'+escapeHtml(tag)+'</span>').join("")+'</div>' +
    '<div class="shop-card-footer"><a class="full-card-preview" href="./preview.html?section='+encodeURIComponent(item.id)+'" target="_blank" rel="noopener noreferrer">⛶ Full preview</a><a href="'+escapeHtml(item.detailUrl)+'" aria-label="View details for '+escapeHtml(item.name)+'">Details '+icon("northeast")+'</a></div>' +
    '</div></article>';
}
function options(label, dimension, values) {
  const selected = state[dimension];
  return '<div class="filter-group"><div class="filter-heading">' + escapeHtml(label) + ' ' + icon("chevron") + '</div><div class="filter-options">' +
    values.map(([value,display]) => {
      const count = CATALOG.filter(item => dimension === "types" ? item.type === value : dimension === "styles" ? item.style === value : item.industry.includes(value)).length;
      return '<label class="filter-option"><input data-dim="' + dimension + '" type="checkbox" value="' + escapeHtml(value) + '"' +
        (selected.has(value) ? " checked" : "") + '/><span>' + escapeHtml(display) + '</span>' +
        (CATALOG.length ? '<span class="option-count">' + count + '</span>' : "") + '</label>';
    }).join("") + '</div></div>';
}
function renderFilters() {
  $("#filter-groups").innerHTML = options("Section type","types",TYPES.map(v => [v,v])) +
    options("Industry","industries",INDUSTRIES.map(([v]) => [v,v])) +
    options("Design style","styles",STYLES.map(v => [v,v]));
  $("#industry-pills").innerHTML = '<button class="industry-pill' + (state.industries.size ? "" : " selected") + '" type="button" data-industry-all="true" aria-pressed="' + !state.industries.size + '">✦ &nbsp; All industries</button>' +
    INDUSTRIES.map(([v,symbol]) => '<button type="button" class="industry-pill' + (state.industries.has(v) ? " selected" : "") +
      '" data-industry="' + escapeHtml(v) + '" aria-pressed="' + state.industries.has(v) + '"><span class="pill-emoji">' + symbol + '</span>' + escapeHtml(v) + '</button>').join("");
  const count = state.industries.size + state.types.size + state.styles.size + Number(state.savedOnly) + Number(Boolean(state.query));
  $("#filter-num").textContent = count ? "(" + count + ")" : "";
}
function renderChips() {
  const chips = [];
  if (state.query) chips.push(["query",state.query,"Search: " + state.query]);
  if (state.savedOnly) chips.push(["saved","1","Saved only"]);
  for (const dim of ["industries","types","styles"])
    for (const value of state[dim]) chips.push([dim,value,value]);
  const target = $("#active-filters");
  target.hidden = chips.length === 0;
  target.innerHTML = chips.map(([dim,value,label]) =>
    '<button class="active-filter" type="button" data-remove="' + escapeHtml(dim) + '" data-value="' + escapeHtml(value) +
    '">' + escapeHtml(label) + ' ' + icon("close") + '</button>').join("") +
    (chips.length ? '<button class="active-clear" type="button" data-clear="true">Clear all</button>' : "");
}
function renderEmpty(count) {
  const empty = $("#no-results");
  const noCatalog = CATALOG.length === 0;
  const failure = catalogStatus === "error";
  empty.hidden = count !== 0;
  empty.classList.toggle("is-launch-state", noCatalog);
  $("#empty-title").textContent = failure ? "The library couldn't load." :
    noCatalog ? "Something thoughtfully built is coming." : "No matching sections yet.";
  $("#empty-description").textContent = failure ? "We couldn't load the section library. Please refresh the page to try again." :
    noCatalog ? "We're building our first collection of original Shopify Liquid sections. When a section is designed, coded and tested, you'll find its real preview here." :
    "Try another keyword, industry or style to find a section that fits your store.";
  $("#empty-details").hidden = failure || !noCatalog;
  $("#no-result-reset").hidden = noCatalog || failure;
  $(".empty-eyebrow").hidden = !noCatalog || failure;
  $(".empty-monogram").hidden = !noCatalog || failure;
}
function renderCatalog() {
  const items = sortedItems(CATALOG.filter(matches));
  $("#product-grid").innerHTML = items.map(cardMarkup).join("");
  $("#result-count").textContent = items.length;
  $("#result-label").textContent = state.savedOnly ? "saved section" + (items.length===1?"":"s") :
    "section" + (items.length===1?"":"s") + " in the library";
  $("#catalog-end").hidden = !items.length;
  $("#saved-count").textContent = state.saved.size;
  $("#saved-nav").setAttribute("aria-pressed", String(state.savedOnly));
  $("#saved-nav").classList.toggle("is-active", state.savedOnly);
  $("#clear-search").hidden = !state.query;
  $("#hero-query").value = state.query;
  $("#sort-select").disabled = !CATALOG.length;
  renderEmpty(items.length);
  renderFilters();
  renderChips();
}
function resetAll() {
  state.query = "";state.industries.clear();state.types.clear();state.styles.clear();state.savedOnly=false;
  state.sort="featured";$("#sort-select").value="featured";renderCatalog();
}
function scrollToCatalog() { $("#catalog").scrollIntoView({behavior:"smooth",block:"start"}); }
function doSearch(value) {
  state.query = value.trim();$("#search-suggestions").hidden = true;renderCatalog();scrollToCatalog();
}
function toggleSet(set,value) {set.has(value) ? set.delete(value) : set.add(value);renderCatalog();}
let toastTimer;
function showToast(message) {
  const el=$("#toast");el.textContent=message;el.classList.add("show");
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2700);
}
function toggleSaved(id) {
  if (!CATALOG.some(item => item.id===id)) return;
  state.saved.has(id) ? state.saved.delete(id) : state.saved.add(id);
  saveShortlist();renderCatalog();
  if (state.modalId===id) renderModalDetails(CATALOG.find(item=>item.id===id));
  showToast(state.saved.has(id)?"Saved to your shortlist":"Removed from your shortlist");
}
function renderModalDetails(item) {
 const tags=[item.type,...item.industry];
 const ready=item.published===true&&item.shopifyTested===true;
 $("#modal-details").innerHTML=
   '<div class="modal-tags">'+tags.map(tag=>'<span>'+escapeHtml(tag)+'</span>').join("")+'</div>'+
   '<h2 id="modal-name">'+escapeHtml(item.name)+'</h2><p>'+escapeHtml(item.desc||"")+'</p>'+
   '<div class="detail-divider"></div>'+
   '<div class="detail-list"><span>'+icon("check-circle")+' Standalone Shopify Liquid build</span><span>'+icon("check-circle")+' Theme editor settings included</span></div>'+
   '<a class="modal-action modal-link" href="./preview.html?section='+encodeURIComponent(item.id)+'" target="_blank" rel="noopener noreferrer">⛶ Full-screen preview '+icon("northeast")+'</a>'+ 
   '<a class="modal-action modal-link" href="'+escapeHtml(item.detailUrl)+'">View section details '+icon("northeast")+'</a>'+
   '<button class="modal-action secondary" type="button" data-modal-save="'+escapeHtml(item.id)+'">'+icon("heart")+
   (state.saved.has(item.id)?" Remove from saved":" Save section")+'</button>'+
   '<p class="modal-notice">'+(ready?"View details to purchase and download securely.":"Design preview only. Shopify theme testing and secure checkout are not yet complete; this section is not for sale yet.")+'</p>';
}
function renderModalScene(item) {
  const scene=$("#modal-scene-container");
  const full=$("#modal-full-preview");if(full)full.href="./preview.html?section="+encodeURIComponent(item.id);
  const mobile=state.device==="mobile";
  if (mobile && !item.previewMobile) {
    scene.innerHTML='<div class="scene modal-mobile-pending"><strong>Mobile preview coming after testing</strong><p>The design has not been verified in a live Shopify mobile theme yet.</p></div>';
  } else {
    const image=screenshot(item,state.device);
    scene.innerHTML='<div class="scene real-scene"><img src="'+image+'" alt="'+escapeHtml(item.name)+' — '+(mobile?'mobile':'desktop')+' design preview"/><span class="scene-preview-label">Design preview · Shopify test pending</span></div>';
  }
  scene.classList.toggle("mobile-preview",mobile);
  $("#device-desktop").classList.toggle("active",!mobile);
  $("#device-mobile").classList.toggle("active",mobile);
}
function openModal(id) {
  const item=CATALOG.find(product=>product.id===id);if(!item)return;
  lastFocused=document.activeElement;state.modalId=id;state.device="desktop";
  renderModalScene(item);renderModalDetails(item);$("#modal-overlay").hidden=false;
  document.body.style.overflow="hidden";$("#modal-close").focus();
}
function closeModal() {
  state.modalId=null;$("#modal-overlay").hidden=true;document.body.style.overflow="";
  if(lastFocused && lastFocused.isConnected)lastFocused.focus();
}
function openMobileFilters() {
  $("#sidebar").classList.add("drawer-open");$("#mobile-filter-backdrop").hidden=false;document.body.style.overflow="hidden";
}
function closeMobileFilters() {
  $("#sidebar").classList.remove("drawer-open");$("#mobile-filter-backdrop").hidden=true;document.body.style.overflow="";
}
function updateSuggestions(query) {
  const el=$("#search-suggestions");const normalized=normalize(query);
  if(normalized.length<2){el.hidden=true;return;}
  const found=CATALOG.filter(item=>normalize([item.name,item.type,item.keywords||"",...item.industry].join(" ")).includes(normalized)).slice(0,5);
  el.hidden=!found.length;
  el.innerHTML=found.length ? '<div class="suggestion-head">MATCHING SECTIONS</div>'+found.map(item=>
    '<button type="button" data-suggestion="'+escapeHtml(item.id)+'">'+icon("search")+' '+escapeHtml(item.name)+'</button>').join("") : "";
}

document.addEventListener("click",event=>{
  const target=event.target;
  let found=target.closest("[data-preview]");if(found){openModal(found.dataset.preview);return;}
  found=target.closest("[data-save]");if(found){toggleSaved(found.dataset.save);return;}
  found=target.closest("[data-industry]");if(found){toggleSet(state.industries,found.dataset.industry);return;}
  if(target.closest("[data-industry-all]")){state.industries.clear();renderCatalog();return;}
  found=target.closest("[data-type]");if(found){toggleSet(state.types,found.dataset.type);scrollToCatalog();return;}
  found=target.closest("[data-search]");if(found){doSearch(found.dataset.search);return;}
  found=target.closest("[data-suggestion]");if(found){const item=CATALOG.find(p=>p.id===found.dataset.suggestion);if(item)doSearch(item.name);return;}
  found=target.closest("[data-remove]");if(found){
    const dim=found.dataset.remove,val=found.dataset.value;
    if(dim==="query")state.query="";else if(dim==="saved")state.savedOnly=false;else state[dim].delete(val);
    renderCatalog();return;
  }
  if(target.closest("[data-clear]")){resetAll();return;}
  found=target.closest("[data-modal-save]");if(found){toggleSaved(found.dataset.modalSave);return;}
  if(target===$("#modal-overlay"))closeModal();
  if(!target.closest("#hero-form"))$("#search-suggestions").hidden=true;
});
$("#hero-form").addEventListener("submit",event=>{event.preventDefault();doSearch($("#hero-query").value);});
$("#hero-query").addEventListener("input",event=>{$("#clear-search").hidden=!event.target.value;updateSuggestions(event.target.value);});
$("#hero-query").addEventListener("keydown",event=>{if(event.key==="Escape")$("#search-suggestions").hidden=true;});
$("#clear-search").addEventListener("click",()=>{state.query="";$("#search-suggestions").hidden=true;renderCatalog();$("#hero-query").focus();});
$("#filter-groups").addEventListener("change",event=>{const el=event.target;if(el.matches("input[data-dim]"))toggleSet(state[el.dataset.dim],el.value);});
$("#reset-side").addEventListener("click",resetAll);
$("#no-result-reset").addEventListener("click",resetAll);
$("#sort-select").addEventListener("change",event=>{state.sort=event.target.value;renderCatalog();});
$("#saved-nav").addEventListener("click",()=>{state.savedOnly=!state.savedOnly;renderCatalog();scrollToCatalog();});
$("#modal-close").addEventListener("click",closeModal);
$("#device-desktop").addEventListener("click",()=>{const item=CATALOG.find(p=>p.id===state.modalId);if(item){state.device="desktop";renderModalScene(item);}});
$("#device-mobile").addEventListener("click",()=>{const item=CATALOG.find(p=>p.id===state.modalId);if(item){state.device="mobile";renderModalScene(item);}});
$("#mobile-filter-trigger").addEventListener("click",openMobileFilters);
$("#mobile-apply").addEventListener("click",closeMobileFilters);
$("#mobile-filter-backdrop").addEventListener("click",closeMobileFilters);
$("#mobile-menu").addEventListener("click",()=>{
  const nav=$("#primary-nav"),open=!nav.classList.contains("open");
  nav.classList.toggle("open",open);$("#mobile-menu").setAttribute("aria-expanded",String(open));
});
$$(".primary-nav a").forEach(a=>a.addEventListener("click",()=>{
  $("#primary-nav").classList.remove("open");$("#mobile-menu").setAttribute("aria-expanded","false");
}));
document.addEventListener("keydown",event=>{
  if(event.key==="Escape"){
    if(state.modalId)closeModal();
    if($("#sidebar").classList.contains("drawer-open"))closeMobileFilters();
  }
});
renderCatalog();
(async function loadCatalog() {
  try {
    const response = await fetch("./data/sections.json",{cache:"no-store"});
    if(!response.ok)throw Error("Catalog request failed");
    const records = await response.json();
    if(!Array.isArray(records))throw Error("Catalog must be an array");
    CATALOG = records.filter(validItem);
    catalogStatus="ready";
  } catch(error) {
    CATALOG = [];catalogStatus="error";
    console.warn("Shopify section catalog could not be loaded:",error);
  }
  restoreSaved();renderCatalog();
})();
