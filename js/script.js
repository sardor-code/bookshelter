"use strict";
const elLogoutBtn = findElement(".logout");
const btnMode = findElement(".mode");
const modeImg = findElement(".mode-image");
const modalClose = document.querySelector(".modal__exit");
const elModal = document.querySelector(".modal2");
const elOverlay = document.querySelector(".overlay");
const searchInput = findElement(".search-input");
const sortBtn = findElement(".sort-btn");
let elCounter = findElement(".counter");
let search = "Java";
//==========================================
// logout
let localToken = window.localStorage.getItem("token");
if (!localToken) {
  window.location.replace(home.html);
}
elLogoutBtn.addEventListener("click", () => {
  window.localStorage.removeItem("token");
  window.location.replace("index.html");
});
// mode
btnMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  if (document.body.classList.contains("dark")) {
    btnMode.innerHTML = `<img src="./svg/dark.svg">`;
    findElements("div").forEach((item) => {
      item.style.backgroundColor = "#232B2B";
    });

    findElements(".card__item").forEach((item) => {
      item.style.backgroundColor = "#232B2B";
    });
    findElements(".card__heading").forEach((item) => {
      item.style.color = "#fff";
    });
    findElement("section").style.backgroundColor = "#232B2B";
    findElement("nav").style.backgroundColor = "#232B2B";
  } else {
    btnMode.innerHTML = `<img src="./svg/sun.svg">`;
    findElements("div").forEach((item) => {
      item.style.backgroundColor = "";
    });
    findElements("li").forEach((item) => {
      item.style.backgroundColor = "";
    });
    findElements(".card__heading").forEach((item) => {
      item.style.color = "black";
    });
    findElement("nav").style.backgroundColor = "";
    findElement("section").style.backgroundColor = "";
  }
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
} else {
  document.body.classList.remove("dark");
}
//==============================================================================
//============== search function ==================

searchInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    if (e.target.value == "") {
      return alert(`Please fill out the task!`);
    } else {
      list.innerHTML = "";
      search = e.target.value.trim();
      getAllData();
    }
  }
});

//====================================
const list = findElement(".js-list");
async function getAllData() {
  let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search.toLowerCase()}+terms`);
  try {
    let result = await response.json();
    (elCounter.textContent = result.totalItems), "1";
    sortFunction(result.items, list);
    // renderBooks(result.items, list);
  } catch (error) {
    alert(error.message);
  }
}

function sortFunction(arr = [], list) {
  renderBooks(arr, list);
  sortBtn.addEventListener("click", () => {
    arr.sort((a, b) => {
      if (a.volumeInfo.publishedDate > b.volumeInfo.publishedDate) {
        return -1;
      } else {
        renderBooks(arr, list);
      }
    });
  });
}

getAllData();

function renderBooks(books = [], list) {
  list.innerHTML = "";
  books.slice(0, 9).forEach((book, i) => {
    elCounter.innerHTML = `${i + 1}`;

    const elLi = createElement(
      "li",
      "card__item my-3 d-flex flex-wrap",
      ` 
    <a href="#" class="card__img-link">
      <img class="card__img" src="${book.volumeInfo.imageLinks.smallThumbnail}" alt="" width="201" height="202"></a>

    <div class="card__info">
      <h3 class="card__heading">${book.volumeInfo.title}</h3>
      <p class="card__desc">${book.volumeInfo.authors}</p>
      <p class="card__year">${book.volumeInfo.publishedDate}</p>
    </div>
    <div class="card__buttons">
      <button class="card__bookmark">
        <p class="card__btn-bookmark">Bookmark</p>
      </button>
      <button type="button" class="card__more-info">
        <p class="card__btn-desc  more-info">More Info</p>
      </button>
      <a class="card__read" href="${book.volumeInfo.previewLink}" target="_blank"><p class="card__btn-desc">Read</p></a>
    </div>
 `
    );

    elLi.dataset.id = book.id;

    list.appendChild(elLi);
  });

  list.addEventListener("click", function (evt) {
    if (evt.target.matches(".more-info")) {
      elModal.classList.remove("hidden");
      elOverlay.classList.add("overlay");
    }
  });

  // CLOSE MODAL BUTTON

  modalClose.addEventListener("click", () => {
    elModal.classList.add("hidden");
    elOverlay.classList.remove("overlay");
  });
}
