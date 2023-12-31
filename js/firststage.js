const elRegosterBtn = document.querySelector('.js-inner-register-btn');
const elLoginBtn = document.querySelector(".js-inner-login-btn");

elRegosterBtn.addEventListener("click", () => {
  window.location.href = "register.html";
});

elLoginBtn.addEventListener("click", () => {
  window.location.href = "login.html";
})