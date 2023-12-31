const localToken = window.localStorage.getItem("token");
const elHistoryList = document.querySelector(".js-history-list");
let newHsitoryArr = [];

function getData(url1,url2) {
  fetch(url1, {
    method: "GET",
    headers: {
      token: localToken,
    }
  })
  .then(response => response.json())
  .then(data => {
    if(newHsitoryArr) {
      renderHistoryData(newHsitoryArr,elHistoryList);
    }
    return newHsitoryArr = [...data];
  });
  
  
  fetch(url2, {
    method: "GET",
    headers: {
      token: localToken,
    }
  })
  .then(response => response.json())
  .then(data => {
    if(newHsitoryArr) {
      renderHistoryData(newHsitoryArr,elHistoryList);
    }
    return newHsitoryArr = [...data];
  })
}
getData(`http://localhost:9090/get-incomes`,`http://localhost:9090/get-expenses`);

function renderHistoryData(array,node) {
  node.innerHTML = "";
  
  array.forEach(element => {
    node.innerHTML += `
    <li class="history__item">
    <div class="history__item-info-box">
    <h3 class="history__title">${element.title}</h3>
    <p class="history__amount history-text">
    Amount: 
    <span class="history__text">
    ${element.amount}
    </span>
    </p>
    <p class="history__type history-text">
    Category:
    <span class="history__text">
    ${element.category}
    </span>
    </p>
    <p class="history__desc history-text">
    Description:
    <span class="history__text">
    ${element.description}
    </span>
    </p>
    <time class="history-text" datetime="2024-01-01">
    Date:
    <span class="history__text">
    ${element.date.slice(0,11)}
    </span>
    </time>
    </div>
    <button class="history__delete-btn js-history-delete-btn" data-id="${element.id}" type="button">Delete</button>
    </li>
    `
  });
}

// delete function 
function deleteHistoryData(url1,id1,url2,id2) {
  fetch(url1 + id1, {
    method: "DELETE",
    headers: {
      token: localToken,
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.status == 200) {
      getData(`http://localhost:9090/get-incomes`,`http://localhost:9090/get-expenses`);
    }
  });
  
  fetch(url2 + id2, {
    method: "DELETE",
    headers: {
      token: localToken,
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.status == 200) {
      getData(`http://localhost:9090/get-incomes`,`http://localhost:9090/get-expenses`); 
    }
  })
};

elHistoryList.addEventListener("click", (evt) => {
  if(evt.target.matches(".js-history-delete-btn")) {
    const deletedHistoryId = evt.target.dataset.id;
    deleteHistoryData(`http://localhost:9090/delete-income/`,deletedHistoryId,`http://localhost:9090/delete-expense/`,deletedHistoryId);
  }
})