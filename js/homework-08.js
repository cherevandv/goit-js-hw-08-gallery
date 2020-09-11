"use strict";

import galleryItems from './gallery-items.js';


  const galleryRef = document.querySelector(".gallery");
  const lightboxRef = document.querySelector(".lightbox");
  const lightboxImgRef = document.querySelector(".lightbox__image");
  const lightboxBtnRef = document.querySelector(".lightbox__button");


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

galleryRef.addEventListener('click', onImageClick);
// lightboxBtnRef.addEventListener('click',closeModal);

function onImageClick(event){
    event.preventDefault();
    if(event.target.nodeName!=='IMG'){
        console.log('мимо:)')
        return;
    };
    
    openModal();
       
};

function openModal(){
    window.addEventListener('keydown', onPressEscape);
    lightboxRef.classList.add("is-open");
    lightboxImgRef.setAttribute("src", `${event.target.dataset.source}`);
    lightboxImgRef.setAttribute("alt", `${event.target.getAttribute('alt')}`);
};


lightboxRef.addEventListener('click', event =>{
    if(event.target.nodeName === 'BUTTON'){
        closeModal(); 
    };
    if(event.target === event.currentTarget){
        closeModal(); 
    };

});

function closeModal(){    
    window.removeEventListener('keydown', onPressEscape);
        lightboxRef.classList.remove("is-open");
        lightboxImgRef.setAttribute("src", ``);
        lightboxImgRef.setAttribute("alt", ``);
    };

function onPressEscape (event){
  if(event.code === 'Escape'){
    closeModal();
  };
};

// function closeModal(){    
// if(event.target.nodeName === 'BUTTON'){
//     lightboxRef.classList.remove("is-open");
//     lightboxImgRef.setAttribute("src", ``);
//     lightboxImgRef.setAttribute("alt", ``);
// }
// };
