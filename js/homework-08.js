"use strict";

import galleryItems from './gallery-items.js';


  const galleryRef = document.querySelector(".gallery");


  const createMarkupGallery = (galleryItems, galleryRef) => {
    const markupGallery = galleryItems.map((item)=>{
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        const image = document.createElement("img");
        listItem.classList.add("gallery__item");
        link.classList.add("gallery__link");
        image.classList.add("gallery__image");
        link.setAttribute("href", `${item.original}`);
        image.setAttribute("src", `${item.preview}`);    
        image.setAttribute("data-source", `${item.original}`);
        image.setAttribute("alt", `${item.description}`);
        link.appendChild(image);
        listItem.appendChild(link);

        return listItem;
    });
    galleryRef.append(...markupGallery);

    return galleryRef;
};

createMarkupGallery(galleryItems, galleryRef);

// galleryRef.addEventListener('click', getBigImage);


