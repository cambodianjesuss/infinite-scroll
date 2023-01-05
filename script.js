const count = 10;
const apiKey = 'KL1ne9E6KAmbf6N48hUihxOyL6a8c4XWf0OBMkHgXbw';
// Unsplash API
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get Photos from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch(error){
    console.log(error);
  }
}

// On Load
getPhotos();