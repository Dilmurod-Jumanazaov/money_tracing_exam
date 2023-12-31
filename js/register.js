const elRegisterForm = document.querySelector('.js-register-form');
const elLastnameInput = elRegisterForm.querySelector(".js-register-lastname-input");
const elFirstnameInput = elRegisterForm.querySelector(".js-register-firstname-input");
const elEmailInput = elRegisterForm.querySelector(".js-register-email-input");
const elPasswordInput = elRegisterForm.querySelector(".js-register-password-input");
const elAgeInput = elRegisterForm.querySelector(".js-register-age-input");
const elEyeBtn = elRegisterForm.querySelector(".js-register-eye-btn");

// register form.
elRegisterForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  
  register(`http://localhost:9090/register`,elLastnameInput.value,elFirstnameInput.value,elEmailInput.value,elPasswordInput.value,elAgeInput.value);
})

// user register process
function register(url,last_name,frist_name,email,password,age) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      last_name,
      frist_name,
      email,
      password,
      age,
    })
  })
  .then(response => response.json())
  .then(data => {
    if(data.token) {
      window.localStorage.setItem("token",data.token);
      window.location.href = "index.html";
    }
  })
}





// register password input input.type to  input.type text.
elEyeBtn.addEventListener("click", () => {
  if(elPasswordInput.type == "password") {
    elPasswordInput.type = "text";
    elEyeBtn.textContent = "";
  } else {
    elPasswordInput.type = "password";
    elEyeBtn.textContent = "/";
  }
});
