//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];


// Function to download an image
function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);  // Resolve when image loads
        img.onerror = () => reject(`Failed to load image: ${url}`); // Reject if image fails
    });
}

// Function to download all images using Promise.all()
function downloadImages() {
    const outputDiv = document.getElementById("output");
    const loadingDiv = document.getElementById("loading");
    const errorDiv = document.getElementById("error");

    // Clear previous output
    outputDiv.innerHTML = "";
    errorDiv.innerHTML = "";
    loadingDiv.style.display = "block"; // Show loading

    // Create an array of promises
    const promises = imageUrls.map(url => downloadImage(url));

    // Use Promise.all to download all images
    Promise.all(promises)
        .then(images => {
            loadingDiv.style.display = "none"; // Hide loading
            images.forEach(img => outputDiv.appendChild(img)); // Append images to output div
        })
        .catch(error => {
            loadingDiv.style.display = "none"; // Hide loading
            errorDiv.innerHTML = error; // Show error message
        });
}

