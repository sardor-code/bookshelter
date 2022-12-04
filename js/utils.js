"use strict";
function findElement(selector) {
  return document.querySelector(selector);
}
function findElements(selectors) {
  return document.querySelectorAll(selectors);
}

function createElement(TagName, className, textContent) {
  const newElement = document.createElement(TagName);
  if (className) {
    newElement.setAttribute("class", className);
  }
  if (textContent) {
    newElement.innerHTML = `${textContent}`;
  }

  return newElement;
}
