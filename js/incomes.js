const localToken = window.localStorage.getItem("token");
const elIncomeForm = document.querySelector(".js-income-form");
const elIncomeTitleInput = document.querySelector(".js-income-title-input");
const elIncomeAmountInput = document.querySelector(".js-income-amount-input");
const elIncomeTypeSelect = document.querySelector(".js-income-form-select");
const elIncomeDescriptionInput = document.querySelector(".js-income-description-input");
const elIncomeDateInput = document.querySelector(".js-income-date-input");
const elIncomeList = document.querySelector(".js-income-list");

elIncomeForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  
  createIncome(`http://localhost:9090/add-income`,elIncomeTitleInput.value,elIncomeAmountInput.value,elIncomeTypeSelect.value,elIncomeDescriptionInput.value,elIncomeDateInput.value);

  elIncomeTitleInput.value = "";
  elIncomeAmountInput.value = "";
  elIncomeDescriptionInput.value = "";
  elIncomeDateInput.value = "";
})

// this created income function
function createIncome(url,title,amount,category,description,date) {
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
      getIncome(`http://localhost:9090/get-incomes`);
    }
  });
};
createIncome(`http://localhost:9090/add-income`);

// this get income function
function getIncome(url) {
  fetch(url, {
    method: "GET",
    headers: {
      token: localToken,
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data) {
      renderIncome(data,elIncomeList);
    }
  });
}


// this function render income
function renderIncome(array,node) {
  node.innerHTML = "";
  
  array.forEach(element => {
    node.innerHTML += `
    <li class="income__item">
    <div class="income__item-info-box">
    <h3 class="income__title">${element.title}</h3>
    <p class="income__amount income-text">
    Amount: 
    <span class="income__text">
    ${element.amount}
    </span>
    </p>
    <p class="income__type income-text">
    Category:
    <span class="income__text">
    ${element.category}
    </span>
    </p>
    <p class="income__desc income-text">
    Description:
    <span class="income__text">
    ${element.description}
    </span>
    </p>
    <time class="income-text" datetime="2024-01-01">
    Date:
    <span class="income__text">
    ${element.date.slice(0,11)}
    </span>
    </time>
    </div>
    <button class="incmoe__delete-btn js-income-delete-btn" data-id="${element.id}" type="button">Delete</button>
    </li>
    `
  });
};

// this function for delete income
function deleteIncome(id) {
  fetch(`http://localhost:9090/delete-income/`+ id, {
    method: "DELETE",
    headers: {
      token: localToken,
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.status == 200) {
      getIncome(`http://localhost:9090/get-incomes`);
    }
  });
}

elIncomeList.addEventListener("click", (evt) => {
  if(evt.target.matches(".js-income-delete-btn")) {
    const deletedIncomeId = evt.target.dataset.id;
    deleteIncome(deletedIncomeId);
  }
})




