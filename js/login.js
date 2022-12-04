"use strict";
let elForm = document.querySelector(".js-form");
let elInputName = document.querySelector(".user__name");
let elInputPassword = document.querySelector(".user__password");

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  let nameValue = elInputName.value;
  let passwordValue = elInputPassword.value;
  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: nameValue,
      password: passwordValue,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.token) {
        window.localStorage.setItem("token", data.token);

        window.location.replace("index.html");
      } else {
        alert("please try again");
      }
    });
});
