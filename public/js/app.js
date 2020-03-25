console.log("Client side js loaded!");

fetch("http://localhost:3000/weather?address=!").then(response => {
  response.json().then(data => {
    if (data.error) {
      return console.log(data.error);
    } else {
      console.log(data.forecast);
      console.log(data.location);
    }
  });
});

//Use the client side js to add interactivity to your html

//Select
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//messageOne.textContent = "From JavaScript";

//Listen
weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        return (messageOne.textContent = data.error);
        //console.log(data.error);
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
