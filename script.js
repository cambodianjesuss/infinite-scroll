const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'KL1ne9E6KAmbf6N48hUihxOyL6a8c4XWf0OBMkHgXbw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create Elements for Links & Photos, and Add to DOM
const displayPhotos = () =>{
  photosArray.forEach((photo)=>{
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');

    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);

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

// On Load
getPhotos();