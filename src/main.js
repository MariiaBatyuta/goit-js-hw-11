import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.js-gallery');
const input = document.querySelector('.input-string');
const form = document.querySelector('.input-wrap');
const photoLoader = document.getElementById('photo-loader');

const BASIC_URL = 'https://pixabay.com/api/';
const KEY = '41857217-9df28d1efe56a78287de94859';

let inputValue = '';

const lightbox = new SimpleLightbox('.gallery-image-lightbox', {
    captions: true, 
    captionPosition: 'bottom', 
    captionsData: 'alt', 
    close: true, 
    loop: true, 
    enableKeyboard: true, 
    slideSpeed: 400, 
});

const onInput = (e) => { 
    inputValue = e.target.value;
}
input.addEventListener('input', onInput);

form.addEventListener('submit', onClick);
function onClick(e) {
    e.preventDefault();

    if (inputValue.trim() === '') {
        iziToast.error({ title: 'Error', message: 'Please, type a search query' });
        photoLoader.classList.remove('loader'); 
        return;
    }

    photoLoader.classList.add('loader');

    fetch(`${BASIC_URL}?key=${KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(res => res.json())
        .then(images => {
            if (images.total === 0) return iziToast.error({ title: 'Error', message: 'Sorry, there are no images matching your search query. Please try again!' })
           
            const imagePromises = images.hits.map(img => loadImage(img.webformatURL));

            Promise.all(imagePromises)
                .then(() => {
                    const marcup = images.hits.reduce((html, img) => html + `
                <li class="gallery-item">
                    <a href="${img.largeImageURL}" class="gallery-image-lightbox">
                        <img class="gallery-image"
                            src="${img.webformatURL}"
                            alt="${img.tags}"
                        />
                    </a>
                    <div class="photo-info">
                        <p class="item-info"><b>Likes</b><br>${img.likes}</p>
                        <p class="item-info"><b>Views</b><br>${img.views}</p>
                        <p class="item-info"><b>Comments</b><br>${img.comments}</p>
                        <p class="item-info"><b>Dowloads</b><br>${img.downloads}</p>
                    </div>
                </li>`, '');
                    gallery.innerHTML = marcup;
                    
                    lightbox.refresh();
                })
                .catch(() => {
                    iziToast.error({ title: 'Error', message: 'Error loading photos' });
                })
                .finally(() => {
                    input.value = '';
                    photoLoader.classList.remove('loader'); 
                });
        })
        .catch(() => {
            iziToast.error({ title: 'Error', message: 'Error fetching photos' });
            photoLoader.classList.remove('loader');
        }) 
};

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = url;
    });
}