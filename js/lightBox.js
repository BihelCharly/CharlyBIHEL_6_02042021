function lightBox() {

    let body = document.querySelector("body");
    let header = document.querySelector("header");
    let main = document.querySelector("main");
    let footer = document.querySelector("footer");
    let lightBox = document.querySelector(".modal-lightbox");
    let closeLightBox = document.querySelector(".close");
    let lightBoxImg = document.querySelector(".lightbox__photo");
    let lightBoxTxt = document.querySelector(".lightbox__caption");
    let lightBoxArrows = document.querySelectorAll(".lightbox-content a");
    let galeryPhotos = document.querySelectorAll(".grid-card a");

    // TO REMOVE ELEMENTS IN LIGHTBOX
    function cleanElements() {
        lightBoxImg.innerHTML = "";
        lightBoxTxt.innerHTML = "";
    }
    // TO GIVES VIDEO ATTRIBUTES WHEN ELEMENT IS A VIDEO
    function setVideoMode(element) {
        element.setAttribute('controls', true);
        element.setAttribute('preload', 'auto');
        return element;
    }

    // TO DISABLE BG ELEMENTS
    function disableBG() {
        header.style.display = "none";
        main.style.display = "none";
        footer.style.display = "none";
    }

    // TO ENABLE BG ELEMENTS
    function enableBG() {
        header.style.display = "";
        main.style.display = "";
        footer.style.display = "";
    }

    // FOR EACH PHOTOS ON CLICK OPEN LIGHTBOX
    galeryPhotos.forEach(item => item.addEventListener('click', function(e) {
        pushToLightBox(item);
    }));
    galeryPhotos.forEach(item => item.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            pushToLightBox(item);
        }
    }));

    // CLONE CLIKED NODE ELEMENT TO THE LIGHTBOX
    function pushToLightBox(e) {
        // CLEAN
        cleanElements();
        // CLONE
        let cloneNode = e.lastChild.cloneNode(true);
        // IF ELEMENT IS A VIDEO THEN SET VIDEO ATTRIBUTES
        if (cloneNode.tagName == "VIDEO") {
            setVideoMode(cloneNode);
        }
        lightBoxImg.append(cloneNode);
        lightBoxTxt.innerHTML = e.lastChild.title;
        lightBox.style = "display:block";
        body.style = "overflow-y: hidden;overflow-x: hidden;";
        // BG
        disableBG();
    }

    // FOR ARROWS INSIDE LIGHTBOX
    lightBoxArrows.forEach((event) => event.addEventListener("click", showNewSlide));
    lightBoxArrows.forEach((event) => event.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            showNewSlide(event);
        }
    }));

    // THIS FUNCTION RECEIVE PARAMETERS FROM FUNCTION FINDNEXTSLIDE
    function showNewSlide(event) {
        // DOM ELEMENTS TO CHECK IF ARROW IS
        let arrow = event.target.className;
        const newSlide = ((arrow) => {
            // PREVIOUS
            if (arrow == "prev") {
                let newSlide = findNextSlide()[0];
                return newSlide;
                // NEXT
            } else if (arrow == "next") {
                let newSlide = findNextSlide()[1];
                return newSlide;
            }
        })(arrow);
        if (newSlide.tagName == "VIDEO") {
            setVideoMode(newSlide);
        }
        cleanElements();
        lightBoxImg.append(newSlide);
        lightBoxTxt.innerHTML = newSlide.title;
    }

    // FUNCTION TO FIND WHAT ELEMENTS ARE THE NEXT/PREVIOUS ONES INSIDE THE GALLERY
    // THIS FUNCTION SEND PARAMETERS TO FUNCTION SETNODES
    function findNextSlide() {
        let collection = gridGallery.children;
        for (i = 0; i < collection.length; i++) {
            if (collection[i].firstChild.firstChild.title == lightBoxTxt.textContent) {
                const prevNode = setNodes(collection[i], collection)[0];
                const nextNode = setNodes(collection[i], collection)[1];
                let prevClonedNode = prevNode.firstChild.cloneNode(true);
                let nextClonedNode = nextNode.firstChild.cloneNode(true);
                return [prevClonedNode, nextClonedNode];
            }
        }
    }

    // FUNCTION TO SET NEXT AND PREV NODES
    function setNodes(element, collection) {
        let array = [];
        if (element.previousSibling !== null && element.nextSibling == null) {
            let prevNode = element.previousSibling.firstChild;
            let nextNode = collection[0].firstChild;
            array.push(prevNode, nextNode);
        } else if (element.previousSibling == null) {
            let prevNode = element.parentNode.lastChild.firstChild;
            let nextNode = element.nextSibling.firstChild;
            array.push(prevNode, nextNode);
        } else if (element.previousSibling.firstChild == null && element.nextSibling.firstChild !== null) {
            let prevNode = element.parentNode.lastChild.firstChild;
            let nextNode = element.nextSibling.firstChild;
            array.push(prevNode, nextNode);
        } else {
            let prevNode = element.previousSibling.firstChild;
            let nextNode = element.nextSibling.firstChild;
            array.push(prevNode, nextNode);
        }
        return array;
    }

    // TO CLOSE THE LIGHTBOX
    closeLightBox.addEventListener("click", closeLightBoxModal);
    closeLightBox.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            closeLightBoxModal();
        }
    });

    function closeLightBoxModal() {
        enableBG();
        cleanElements();
        lightBox.style = "display:none";
        body.style = "overflow-y: visible;overflow-x: visible;";
    }
}