"use strict";

import galleryItems from "./gallery-items.js";

const galleryRef = document.querySelector(".gallery");
const lightboxRef = document.querySelector(".lightbox");
const lightboxImgRef = document.querySelector(".lightbox__image");
const lightboxBtnRef = document.querySelector(".lightbox__button");

const createMarkupGallery = (galleryItems, galleryRef) => {
  const markupGallery = galleryItems.map((item) => {
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

galleryRef.addEventListener("click", onImageClick);

lightboxRef.addEventListener("click", (event) => {
  if (
    event.target.nodeName === "BUTTON" ||
    event.target === event.currentTarget.children[1]
  ) {
    closeModal();
  }
});

function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  openModal();
}

function openModal() {
  window.addEventListener("keydown", onPressEscape);
  window.addEventListener("keydown", onPressArrowKeys);

  lightboxRef.classList.add("is-open");
  lightboxImgRef.setAttribute("src", `${event.target.dataset.source}`);
  lightboxImgRef.setAttribute("alt", `${event.target.getAttribute("alt")}`);
}

function closeModal() {
  window.removeEventListener("keydown", onPressEscape);
  window.removeEventListener("keydown", onPressArrowKeys);

  lightboxRef.classList.remove("is-open");
  lightboxImgRef.setAttribute("src", ``);
  lightboxImgRef.setAttribute("alt", ``);
}

function onPressEscape(event) {
  if (event.code === "Escape") {
    closeModal();
  }
}

function onPressArrowKeys(event) {
  let index = galleryItems.indexOf(
    galleryItems.find(
      (item) => item.original === lightboxImgRef.getAttribute("src")
    )
  );

  if (event.code === "ArrowRight") {
    if (index === galleryItems.length - 1) {
      index = -1;
    }
    index += 1;
  }
  if (event.code === "ArrowLeft") {
    if (index === 0) {
      index = galleryItems.length;
    }
    index -= 1;
  }
  lightboxImgRef.setAttribute("src", `${galleryItems[index].original}`);
  lightboxImgRef.setAttribute("alt", `${galleryItems[index].description}`);
}
