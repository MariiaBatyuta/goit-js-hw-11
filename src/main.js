import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.js-gallery');
const input = document.querySelector('.input-string');
const submit = document.querySelector('.submitBtn');
const photoLoader = document.getElementById('photo-loader');

const BASIC_URL = 'https://pixabay.com/api/';
const KEY = '41857217-9df28d1efe56a78287de94859';
const ERROR_MESSAGE = 'Sorry, there are no images matching your search query. Please try again!';


let inputValue = '';

const onInput = (e) => { 
    inputValue = e.target.value;
}
input.addEventListener('input', onInput);
input.addEventListener('keydown', (e) => { if (e.key === 'Enter') onClick() });


submit.addEventListener('click', onClick);
function onClick() {
    photoLoader.classList.add('loader');

    fetch(`${BASIC_URL}?key=${KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(res => res.json())
        .then(images => {
            if (inputValue.trim() === '') return iziToast.error({title: 'Error', message: 'Please, type a search query'})
            if (images.total === 0) return iziToast.error({ title: 'Error', message: `${ERROR_MESSAGE}` })
           
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
                    
                    const lightbox = new SimpleLightbox('.gallery-image-lightbox', {
                        captions: true, 
                        captionPosition: 'bottom', 
                        captionsData: 'alt', 
                        close: true, 
                        loop: true, 
                        enableKeyboard: true, 
                        slideSpeed: 400, 
                    });
                    lightbox.refresh();
                })
                .catch((error) => {
                    console.log('Error loading photos: ', error);
                    iziToast.error({ title: 'Error', message: 'Error loading photos' });
                    photoLoader.classList.remove('loader');
                })
                .finally(() => {
                    input.value = '';
                    photoLoader.classList.remove('loader'); 
                });
        })
        .catch(error => {
            console.error('Error fetching photos:', error);
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


