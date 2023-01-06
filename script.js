const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'KL1ne9E6KAmbf6N48hUihxOyL6a8c4XWf0OBMkHgXbw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
const imageLoaded = () => {
  console.log(imagesLoaded)
  imagesLoaded++;
  if(imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log('ready =', ready);
  }
}

// Helper Function Setting Attributes
const setAttributes = (element, attributes) => {
  for(const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links & Photos, and Add to DOM
const displayPhotos = () =>{
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log('total images', totalImages)
  photosArray.forEach((photo)=>{
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    // Event Listener, check when each if finished loading
    img.addEventListener('load', imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API
const getPhotos = async () => {

  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch(error){
    console.log(error);
  }
}

// Check to see if scrolling near near bottom of page, Load more photos
window.addEventListener('scroll', ()=>{
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    ready = false;
    getPhotos();
  }
})

// On Load
getPhotos();