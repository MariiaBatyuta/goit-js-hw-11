import{i,S as m}from"./assets/vendor-46aac873.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?e.credentials="include":t.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function n(t){if(t.ep)return;t.ep=!0;const e=r(t);fetch(t.href,e)}})();const f=document.querySelector(".js-gallery"),d=document.querySelector(".input-string"),p=document.querySelector(".submitBtn"),a=document.getElementById("photo-loader"),h="https://pixabay.com/api/",g="41857217-9df28d1efe56a78287de94859",y="Sorry, there are no images matching your search query. Please try again!";let c="";const b=o=>{c=o.target.value};d.addEventListener("input",b);d.addEventListener("keydown",o=>{o.key==="Enter"&&u()});p.addEventListener("click",u);function u(){a.classList.add("loader"),fetch(`${h}?key=${g}&q=${c}&image_type=photo&orientation=horizontal&safesearch=true`).then(o=>o.json()).then(o=>{if(c.trim()==="")return i.error({title:"Error",message:"Please, type a search query"});if(o.total===0)return i.error({title:"Error",message:`${y}`});const s=o.hits.map(r=>L(r.webformatURL));Promise.all(s).then(()=>{const r=o.hits.reduce((t,e)=>t+`
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
                </li>`,"");f.innerHTML=r,new m(".gallery-image-lightbox",{captions:!0,captionPosition:"bottom",captionsData:"alt",close:!0,loop:!0,enableKeyboard:!0,slideSpeed:400}).refresh()}).catch(r=>{console.log("Error loading photos: ",r),i.error({title:"Error",message:"Error loading photos"}),a.classList.remove("loader")}).finally(()=>{d.value="",a.classList.remove("loader")})}).catch(o=>{console.error("Error fetching photos:",o),i.error({title:"Error",message:"Error fetching photos"}),a.classList.remove("loader")})}function L(o){return new Promise((s,r)=>{const n=new Image;n.onload=s,n.onerror=r,n.src=o})}
//# sourceMappingURL=commonHelpers.js.map
