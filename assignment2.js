document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const overlay = document.createElement("div");
    const favorites = document.getElementById("favorites");
    const images = Array.from(lightbox.getElementsByTagName("img"));
    let favoriteImages = [];
    let currentIndex = 0;
 
    // Create overlay structure for image zoom
    overlay.id = "lbOverlay";
    overlay.style.display = "none"; 
    overlay.innerHTML = `
       <figure>
          <img src="" alt="Zoomed Image">
          <figcaption></figcaption>
       </figure>
       <div id="lbOverlayClose">&times;</div>
       <div id="lbPrev" class="nav-arrow">&#9665;</div>
       <div id="lbNext" class="nav-arrow">&#9655;</div>
    `;
    document.body.appendChild(overlay);
 
    const overlayImg = overlay.querySelector("img");
    const overlayCaption = overlay.querySelector("figcaption");
    const overlayClose = overlay.querySelector("#lbOverlayClose");
    const overlayPrev = overlay.querySelector("#lbPrev");
    const overlayNext = overlay.querySelector("#lbNext");
 
    // Style navigation arrows
    overlayPrev.style.position = "absolute";
    overlayPrev.style.left = "10px";
    overlayPrev.style.top = "50%";
    overlayPrev.style.transform = "translateY(-50%)";
    overlayPrev.style.fontSize = "50px";
    overlayPrev.style.color = "white";
    overlayPrev.style.cursor = "pointer";
 
    overlayNext.style.position = "absolute";
    overlayNext.style.right = "10px";
    overlayNext.style.top = "50%";
    overlayNext.style.transform = "translateY(-50%)";
    overlayNext.style.fontSize = "50px";
    overlayNext.style.color = "white";
    overlayNext.style.cursor = "pointer";
 
    // Open image in overlay
    lightbox.addEventListener("click", (e) => {
       if (e.target.tagName === "IMG") {
          currentIndex = images.indexOf(e.target);
          showImage(currentIndex);
       }
    });
 
    function showImage(index) {
       if (index >= 0 && index < images.length) {
          overlayImg.src = images[index].src;
          overlayCaption.textContent = "";
          overlay.style.display = "flex";
 
          overlayCaption.innerHTML = "";
          const favoriteButton = document.createElement("button");
          favoriteButton.textContent = "Add to Favorites";
          favoriteButton.onclick = () => {
             if (favoriteImages.length < 5) {
                if (!favoriteImages.includes(images[index].src)) {
                   favoriteImages.push(images[index].src);
                   updateFavorites();
                } else {
                   alert("Image is already in favorites!");
                }
             } else {
                alert("Maximum of 5 favorites reached. Remove one to add a new favorite.");
             }
          };
          overlayCaption.appendChild(favoriteButton);
       }
    }
 
    // Close overlay
    overlayClose.addEventListener("click", () => {
       overlay.style.display = "none";
       overlayCaption.textContent = "";
    });
 
    // Navigate to previous image
    overlayPrev.addEventListener("click", () => {
       if (currentIndex > 0) {
          currentIndex--;
          showImage(currentIndex);
       }
    });
 
    // Navigate to next image
    overlayNext.addEventListener("click", () => {
       if (currentIndex < images.length - 1) {
          currentIndex++;
          showImage(currentIndex);
       }
    });
 
    // Update favorites section
    function updateFavorites() {
        if (!document.querySelector("#favorites h2")) {
           const title = document.createElement("h2");
           favorites.prepend(title);
        }
     
        const existingImages = favorites.querySelectorAll("div");
        existingImages.forEach((imgContainer) => imgContainer.remove());
     
        // Add favorite images
        favoriteImages.forEach((src, index) => {
           const imgContainer = document.createElement("div");
           const img = document.createElement("img");
           const removeButton = document.createElement("button");
     
           img.src = src;
           img.alt = `Favorite ${index + 1}`;
           removeButton.textContent = "Remove";
           removeButton.onclick = () => {
              favoriteImages = favoriteImages.filter((item) => item !== src);
              updateFavorites();
           };
     
           imgContainer.appendChild(img);
           imgContainer.appendChild(removeButton);
           favorites.appendChild(imgContainer);
        });
     }
});     
 