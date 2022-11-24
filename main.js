let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("submit");
let search = document.getElementById("search");
let tbody = document.getElementById("tbody");
let deleteAllBtn = document.getElementById("delete-all");

let temp;
let mood = "create";
let searchMood = "title";

// get total

function getTotal() {
  if (price.value !== "") {
    total.innerHTML =
      +price.value + +taxes.value + +ads.value - +discount.value;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
}

// create data
let allProducts;
if (localStorage.getItem("products")) {
  allProducts = JSON.parse(localStorage.getItem("products"));
} else {
  allProducts = [];
}

create.addEventListener("click", createData);

function createData() {
  let product = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (mood === "create") {
    if (title.value !== "" && price.value !== "" && category.value !== "") {
      if (product.count > 1) {
        for (let i = 0; i < product.count; i++) {
          allProducts.push(product);
        }
      } else {
        allProducts.push(product);
      }
    }
  } else {
    allProducts[temp] = product;
    count.style.display = "block";
    mood = "create";
    create.innerHTML = "create";
  }
  localStorage.setItem("products", JSON.stringify(allProducts));
  clearData();
  showData();
}

// read data

function showData() {
  let table = "";

  for (let i = 0; i < allProducts.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td> 
    <td>${allProducts[i].title}</td>
    <td>${allProducts[i].price}</td>
    <td>${allProducts[i].taxes}</td>
    <td>${allProducts[i].ads}</td>
    <td>${allProducts[i].discount}</td>
    <td>${allProducts[i].total}</td>
    <td>${allProducts[i].category}</td>
    <td><button id="update" onclick="updateData(${i})">update</button></td>
    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
    </tr>
    `;
  }
  tbody.innerHTML = table;

  if (allProducts.length > 1) {
    deleteAllBtn.innerHTML = `<button onclick="deleteAll()">Delete All</button`;
  } else {
    deleteAllBtn.innerHTML = "";
  }
}

showData();

// clear data

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  getTotal();
  count.value = "";
  category.value = "";
  search.value = "";
}

// delete data

function deleteData(i) {
  allProducts.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(allProducts));
  showData();
}

function deleteAll() {
  allProducts.splice(0);
  localStorage.setItem("products", JSON.stringify(allProducts));
  showData();
}

// update data

function updateData(i) {
  title.value = allProducts[i].title;
  price.value = allProducts[i].price;
  taxes.value = allProducts[i].taxes;
  ads.value = allProducts[i].ads;
  discount.value = allProducts[i].discount;
  total.innerHTML = allProducts[i].total;
  getTotal();
  category.value = allProducts[i].category;
  count.style.display = "none";
  create.innerHTML = "update";
  temp = i;
  mood = "update";
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// searchMood

function getSearchMood(id) {
  if (id === "search-title") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.focus();
  search.placeholder = `search by ${searchMood}`;
  clearData();
  showData();
}

// search data

function searchData(value) {
  let table = "";

  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].title.includes(value.toLowerCase())) {
      table += `
      <tr>
      <td>${i + 1}</td> 
      <td>${allProducts[i].title}</td>
      <td>${allProducts[i].price}</td>
      <td>${allProducts[i].taxes}</td>
      <td>${allProducts[i].ads}</td>
      <td>${allProducts[i].discount}</td>
      <td>${allProducts[i].total}</td>
      <td>${allProducts[i].category}</td>
      <td><button id="update" onclick="updateData(${i})">update</button></td>
      <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
      </tr>
      `;
    } else {
      if (allProducts[i].category.includes(value.toLowerCase())) {
        table += `
      <tr>
      <td>${i + 1}</td> 
      <td>${allProducts[i].title}</td>
      <td>${allProducts[i].price}</td>
      <td>${allProducts[i].taxes}</td>
      <td>${allProducts[i].ads}</td>
      <td>${allProducts[i].discount}</td>
      <td>${allProducts[i].total}</td>
      <td>${allProducts[i].category}</td>
      <td><button id="update" onclick="updateData(${i})">update</button></td>
      <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
      </tr>
      `;
      }
    }
  }
  tbody.innerHTML = table;
}
