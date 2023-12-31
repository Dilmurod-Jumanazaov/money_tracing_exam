const localToken = window.localStorage.getItem("token");
const elExpensesForm = document.querySelector(".js-expenses-form");
const elExpensesTitleInput = document.querySelector(".js-expenses-title-input");
const elExpensesAmountInput = document.querySelector(".js-expenses-amount-input");
const elExpensesTypeSelect = document.querySelector(".js-expenses-form-select");
const elExpensesDescriptionInput = document.querySelector(".js-expenses-description-input");
const elExpensesDateInput = document.querySelector(".js-expenses-date-input");
const elExpensesList = document.querySelector(".js-expenses-list");

// form submit
elExpensesForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  newCreateExpenses(`http://localhost:9090/add-expense`,elExpensesTitleInput.value,elExpensesAmountInput.value,elExpensesTypeSelect.value,elExpensesDescriptionInput.value,elExpensesDateInput.value);

  elExpensesTitleInput.value = "";
  elExpensesAmountInput.value = "";
  elExpensesDescriptionInput.value = "";
  elExpensesDateInput.value = "";
});

// this function for create expenses
function newCreateExpenses(url,title,amount,category,description,date) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      token: localToken,
    },
    body: JSON.stringify({
      title,
      amount,
      category,
      description,
      date,
    })
  })
  .then(response => response.json())
  .then(data => {
    if(data) {
      getExpensesData(`http://localhost:9090/get-expenses`);
    }
  });
};

// this function for get expenses data 
function getExpensesData(url) {
  fetch(url, {
    method: "GET",
    headers: {
      token: localToken,
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data) {
      renderExpensesData(data,elExpensesList);
    }
  });
}
getExpensesData(`http://localhost:9090/get-expenses`);

// this function for render expense data
function renderExpensesData(array,node) {
  node.innerHTML = "";

  array.forEach(element => {
    node.innerHTML += `
    <li class="expenses__item">
    <div class="expenses__item-info-box">
    <h3 class="expenses__title">${element.title}</h3>
    <p class="expenses__amount expenses-text">
    Amount: 
    <span class="expenses__text">
    ${element.amount}
    </span>
    </p>
    <p class="expenses__type expenses-text">
    Category:
    <span class="expenses__text">
    ${element.category}
    </span>
    </p>
    <p class="expenses__desc expenses-text">
    Description:
    <span class="expenses__text">
    ${element.description}
    </span>
    </p>
    <time class="expenses-text" datetime="2024-01-01">
    Date:
    <span class="expenses__text">
    ${element.date.slice(0,11)}
    </span>
    </time>
    </div>
    <button class="expenses__delete-btn js-expenses-delete-btn" data-id="${element.id}" type="button">Delete</button>
    </li>
    `
  });
};

// this function for delete expenses data
function deleteExpenesData(id) {
  fetch(`http://localhost:9090/delete-expense/` + id, {
    method: "DELETE",
    headers: {
      token: localToken,
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.status == 200) {
      getExpensesData(`http://localhost:9090/get-expenses`);
    }
  })
}

elExpensesList.addEventListener("click", (evt) => {
  if(evt.target.matches(".js-expenses-delete-btn")) {
    const deletedExpensesId = evt.target.dataset.id;
    deleteExpenesData(deletedExpensesId);
  }
})
