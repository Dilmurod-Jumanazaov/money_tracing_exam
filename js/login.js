const elLoginForm = document.querySelector(".js-login-form");
const elEmailInput = document.querySelector(".js-login-email-input");
const elPasswordInput = document.querySelector(".js-login-password-input");
const elEyeBtn = document.querySelector(".js-login-eye-btn");

elLoginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  login(`http://localhost:9090/login`,elEmailInput.value,elPasswordInput.value);
});

// user login procsess
function login(url,email,password) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.token);
    if(data.token) {
      window.localStorage.setItem("token",data.token);
      window.location.href = "index.html";
    }
  })
}

// login eye btn 
elEyeBtn.addEventListener("click", () => {
  if(elPasswordInput.type == "password") {
    elPasswordInput.type = "text";
    elEyeBtn.textContent = "";
  } else {
    elPasswordInput.type = "password";
    elEyeBtn.textContent = "/";
  }
});