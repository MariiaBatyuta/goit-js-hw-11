import{S as d,i as n}from"./assets/vendor-46aac873.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function i(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?e.credentials="include":t.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(t){if(t.ep)return;t.ep=!0;const e=i(t);fetch(t.href,e)}})();const m=document.querySelector(".js-gallery"),u=document.querySelector(".input-string"),p=document.querySelector(".input-wrap"),a=document.getElementById("photo-loader"),f="https://pixabay.com/api/",h="41857217-9df28d1efe56a78287de94859";let c="";const g=new d(".gallery-image-lightbox",{captions:!0,captionPosition:"bottom",captionsData:"alt",close:!0,loop:!0,enableKeyboard:!0,slideSpeed:400}),y=s=>{c=s.target.value};u.addEventListener("input",y);p.addEventListener("submit",b);function b(s){if(s.preventDefault(),c.trim()===""){n.error({title:"Error",message:"Please, type a search query"}),a.classList.remove("loader");return}a.classList.add("loader"),fetch(`${f}?key=${h}&q=${c}&image_type=photo&orientation=horizontal&safesearch=true`).then(r=>r.json()).then(r=>{if(r.total===0)return n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});const i=r.hits.map(o=>L(o.webformatURL));Promise.all(i).then(()=>{const o=r.hits.reduce((t,e)=>t+`
                <li class="gallery-item">
                    <a href="${e.largeImageURL}" class="gallery-image-lightbox">
                        <img class="gallery-image"
                            src="${e.webformatURL}"
                            alt="${e.tags}"
                        />
                    </a>
                    <div class="photo-info">
                        <p class="item-info"><b>Likes</b><br>${e.likes}</p>
                        <p class="item-info"><b>Views</b><br>${e.views}</p>
                        <p class="item-info"><b>Comments</b><br>${e.comments}</p>
                        <p class="item-info"><b>Dowloads</b><br>${e.downloads}</p>
                    </div>
                </li>`,"");m.innerHTML=o,g.refresh()}).catch(()=>{n.error({title:"Error",message:"Error loading photos"})}).finally(()=>{u.value="",a.classList.remove("loader")})}).catch(()=>{n.error({title:"Error",message:"Error fetching photos"}),a.classList.remove("loader")})}function L(s){return new Promise((r,i)=>{const o=new Image;o.onload=r,o.onerror=i,o.src=s})}
//# sourceMappingURL=commonHelpers.js.map
