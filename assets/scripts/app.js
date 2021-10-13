const imageContainer = document.getElementById('image-container');
const loader = document.querySelector('.loader');
const loaderContainer = document.querySelector('.loader-container');
const body = document.querySelector('body');
const buttonMode = document.getElementById('button-mode');
const block = document.getElementById('block');

//Define Ready State, Image Loaders, Total Images Number Start Count & API Key

let ready = false;
let areImagesLoaded = 0;
let totalImgNumber = 0;
let count = 5;
// const apiKey = '9aYvL-k_zKwyVb7uHUpp_9cFjrekqO9gT2sGaF2jGBk';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count};`

//Setting New Count Start Point
function updatedCount(newCount) {
    newCount = 10;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${newCount};`
}

function removeLoader() {
    loaderContainer.parentNode.removeChild(loaderContainer);
}

//Check For The Loaded Images
function imageLoaded() {
    areImagesLoaded++;
    // console.log(areImagesLoaded)
    if (areImagesLoaded === totalImgNumber) {
        ready = true;
        loader.style.display = 'none';
        updatedCount()
    }
}

//Setting setAttributes Function For Manipulating Dom Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}
//Displaying Photos
function displayPhotos() {
    areImagesLoaded = 0;
    totalImgNumber = photosArray.length;
    // console.log(totalImgNumber)
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description + photo.current_user_collections.title,
            title: photo.alt_description,
        })
        //Check For Finishing Loading
        img.addEventListener('load', imageLoaded)
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

//Fetching Photos From API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();

        displayPhotos()
    } catch (error) {
        alert('Bibiti Bobiti Boo This Error Is For You :)');
    }
}

//Check Scroll To The Bottom Of Page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos()
    }
})

getPhotos();