const localToken = localStorage.getItem("token");
const elTotalList = document.querySelector(".js-total-money-list");
const elLogoutBtn = document.querySelector(".js-menu-btn");
const elMoney = document.querySelectorAll(".hero__total");
const elChart = document.querySelector(".js-chart");
const newChartMoneyArr = [];

if(!localToken) {
  window.location.href = "firststage.html";  
};

// this function for get data from backend
function getIncomeData(url) {
  fetch(url,{
    method: "GET",
    headers: {
      token: localToken,
    },
  })
  .then(response => response.json())
  .then(data => {
    const incomeTotal = data.reduce((acc,item) => {
      return acc+=item.amount;
    },0);
    elMoney[0].textContent = incomeTotal;
  })
}
getIncomeData(`http://localhost:9090/get-incomes`);

// this function for get data from backend
function getExpensesData(url) {
  fetch(url, {
    method: "GET",
    headers: {
      token: localToken,
    }
  })
  .then(response => response.json())
  .then(data => {
    const expensesTotal = data.reduce((acc,item) => {
      return acc+=item.amount;
    },0);
    elMoney[1].textContent = expensesTotal;
    elMoney.forEach((item) => {
      newChartMoneyArr.push(Number(item.textContent));
      elMoney[2].textContent = newChartMoneyArr[0] - newChartMoneyArr[1];
    })
  })
}
getExpensesData(`http://localhost:9090/get-expenses`);

// logout procsess 
elLogoutBtn.addEventListener("click", () => {
  window.localStorage.removeItem("token");
  window.location.href = "firststage.html";
})

data = newChartMoneyArr;
const chartData = {
  label:  ["Incomes","Expenses","Total balance"],
  data: [10000,3000,7000],
}

new Chart(elChart, {
  type: "bar",
  data: {
    labels: ["green","red","yellow"],
    labels: chartData.label,
    datasets: [
      {
        label: "Money tracing chart",
        data: chartData.data,
        backgroundColor: ["#32cd32","red","yellow"]
      }
    ]
  }
})


function getData(url1,url2) {
  fetch(url1,url2,{
    method: "GET",
    headers: {
      token: localToken,
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
}