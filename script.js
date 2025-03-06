const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image
function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);  // Resolve promise when image loads
        img.onerror = () => reject(`Failed to load image: ${url}`); // Reject if error
    });
}

// Function to handle downloading all images
function downloadImages() {
    output.innerHTML = "<p>Loading images, please wait...</p>"; // Show loading text

    const promises = images.map(imgObj => downloadImage(imgObj.url));

    Promise.all(promises)
        .then(images => {
            output.innerHTML = ""; // Clear loading text
            images.forEach(img => output.appendChild(img)); // Append images
        })
        .catch(error => {
            output.innerHTML = `<p style="color: red;">${error}</p>`; // Show error message
        });
}

// Add event listener to button
btn.addEventListener("click", downloadImages);
