window.addEventListener("load", createLightBox);

function createLightBox(){
    let lightBox = document.getElementById("lightbox");

    let lbTitle = document.createElement("h2");
    let lbCounter = document.createElement("div");
    let lbPrev = document.createElement("div");
    let lbNext = document.createElement("div");
    let lbPlay = document.createElement("div");
    let lbImages = document.createElement("div");

    lightBox.appendChild(lbTitle);
    lbTitle.id = "lbTitle";
    lbTitle.textContent = lightboxTitle;

    lightBox.appendChild(lbCounter);
    lbCounter.id = "lbCounter";
    let currentImg = 1;
    lbCounter.textContent = currentImg + " / " + imgCount;

    lightBox.appendChild(lbPrev);
    lbPrev.id = "lbPrev";
    lbPrev.innerHTML = "&#9664";
    lbPrev.onclick = showPrev;

    lightBox.appendChild(lbNext);
    lbNext.id = "lbNext";
    lbNext.innerHTML = "&#9654";
    lbNext.onclick = showNext;

    let isPlaying = false; // Variable to track state of play/pause button

    //Sets the initial icon to play
    lbPlay.innerHTML = '<div class="play-container"><span class="play-button">&#9654;</span></div>'; //Play icon

    //Toggles between play and pause icons
    function togglePlayPause() {
        if (isPlaying) {
            lbPlay.innerHTML = '<div class="pause-container"><span class="pause-button">&#9646;&#9646;</span></div>'; //Changes to pause icon
        } else {
            lbPlay.innerHTML = '<div class="play-container"><span class="play-button">&#9654;</span></div>'; //Changes to play icon
        }
        isPlaying = !isPlaying; //Toggles the state
    }

    //Attaches the toggle function to the click event
    lbPlay.addEventListener("click", togglePlayPause);

    lightBox.appendChild(lbPlay);
    lbPlay.id = "lbPlay";
    lightBox.appendChild(lbPlay);
    lbPlay.id = "lbPlay";
    lbPlay.classList.add("play-icon"); //CSS class applied to the play/pause button
    togglePlayPause();
    lbPlay.onclick = togglePlayPause; 
    let timeID;
    lbPlay.onclick = function() {
        if (timeID) {
            window.clearInterval(timeID);
            timeID = undefined;
        }
        else {
            showNext();
            timeID = window.setInterval(showNext, 1500);
        }
    }

    lightBox.appendChild(lbImages);
    lbImages.id = "lbImages";

    for (let i = 0; i < imgCount; i++) {
        let image = document.createElement("img");
        image.src = imgFiles[i];
        image.alt = imgCaptions[i];
        image.classList.add('lightbox-img'); //CSS class applied to lightbox images
        image.onclick = createOverlay;
        lbImages.appendChild(image);
    }

    function showNext() { 
        lbImages.appendChild(lbImages.firstElementChild);
        (currentImg < imgCount) ? currentImg++ : currentImg = 1;
        lbCounter.textContent = currentImg + " / " + imgCount;
        updateCenterImage();
    }

    function showPrev() {
        lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild);
        (currentImg > 1) ? currentImg-- : currentImg = imgCount;
        lbCounter.textContent = currentImg + " / " + imgCount;
        updateCenterImage();
    }

    //Centers image in lightbox
    function updateCenterImage() {
            let images = lbImages.querySelectorAll('img');
            for (let i = 0; i < images.length; i++) {
                images[i].classList.remove('centered');
            }
            let centerIndex = Math.floor(images.length / 2);
            images[centerIndex].classList.add('centered');

            let scrollLeft = images[centerIndex].offsetLeft - (lbImages.clientWidth / 2) + (images[centerIndex].clientWidth / 2);
            lbImages.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
    }

    let favorites = [];
    const maxFavorites = 5;

    function createOverlay() {
        let overlay = window.open("", "win", "width=900,height=600");

        let newBox = document.createElement("img");
        newBox.src = this.src;
        overlay.document.body.appendChild(newBox);

        let addToFav = document.createElement("button");
        addToFav.textContent = "Add to Favorites";
        addToFav.onclick = () => {
            addToFavorites(this.src);
            overlay.close();
        };
        overlay.document.body.appendChild(addToFav);

        //close window button
        let closeBtn = document.createElement("button");
        closeBtn.textContent = "Close Window";
        closeBtn.onclick = () => overlay.close();
        overlay.document.body.appendChild(closeBtn);

        //Links to the existing Assignment2.css file for styling
        let cssLink = overlay.document.createElement("link");
        cssLink.href = "Assignment2.css";
        cssLink.rel = "stylesheet";
        cssLink.type = "text/css";
        overlay.document.head.appendChild(cssLink);

        //Sets ID for the body element of the overlay window
        overlay.document.body.id = "overlay-body";
    }

    function addToFavorites(src) {
        if (favorites.length >= maxFavorites) {
            alert("You can only add up to " + maxFavorites + " favorites. Please remove a favorite before adding a new one.");
            return;
        }
        if (favorites.includes(src)) {
            alert("The image is already in your favorites");
            return;
        }
        favorites.push(src);
        updateFavorites();
    }

    function updateFavorites() {
        let favoritesDiv = document.getElementById("favorites");
        favoritesDiv.innerHTML = "";
        for (let i = 0; i < favorites.length; i++) {

            //Creates container for 1 favourite image and 1 remove button, each iteration
            let favoriteItemContainer = document.createElement("div");
            favoriteItemContainer.classList.add("favorite-item-container"); 

            let img = document.createElement("img");
            img.src = favorites[i];
            favoritesDiv.appendChild(img);

            let removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.onclick = () => removeFavorites(i);
            favoritesDiv.appendChild(removeButton);
            removeButton.classList.add("remove-button");//CSS class applied for remove button

            favoriteItemContainer.appendChild(img);
            favoriteItemContainer.appendChild(removeButton);
            favoritesDiv.appendChild(favoriteItemContainer);
        }
    }  

    function removeFavorites(index) {
        favorites.splice(index, 1);
        updateFavorites();
    }
}