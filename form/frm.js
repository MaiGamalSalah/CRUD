var nameInput = document.getElementById("name");
var priceInput = document.getElementById("price");
var descriptionInput = document.getElementById("description");
var tableBody = document.getElementById("tableBody-result");
var addbtn = document.getElementById("addbtn");
var currentIndex = null; 
var products;


if (localStorage.getItem("products")) {
    products = JSON.parse(localStorage.getItem("products"));
    display(products);
} else {
    products = [];
}

//check
addbtn.addEventListener("click", function () {
    if (addbtn.innerHTML === "Add") {
        addProduct();
    } else {
        updateProduct();
    }
});
//addional
function addProduct() {
    if(nameInput.value.trim() && priceInput.value.trim() && descriptionInput.value.trim()){
        var product = {
            name: nameInput.value,
            price: priceInput.value,
            description: descriptionInput.value
        };
        products.push(product);
        setLocalStorage()
        display(products);
        clear();
    }
    
}
//updateing 
function updateProduct() {
    var product = {
        name: nameInput.value,
        price: priceInput.value,
        description: descriptionInput.value
    };
    products[currentIndex] = product;
    setLocalStorage()
    display(products);
    clear();
    addbtn.innerHTML = "Add"; 
    currentIndex = null;
}

function clear() {
    nameInput.value = "";
    priceInput.value = "";
    descriptionInput.value = "";
}

function display(products) {
    var row = "";
    for (var i = 0; i < products.length; i++) {
        row += `
            <tr>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].description}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editRow(${i})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteRow(${i})">Delete</button>
                </td>
            </tr>
        `;
    }
    tableBody.innerHTML = row;
}

function deleteRow(index) {
    products.splice(index, 1);
    setLocalStorage()
    display(products);
}
//update the table
function editRow(index) {
    currentIndex = index;
    var product = products[index];
    nameInput.value = product.name;
    priceInput.value = product.price;
    descriptionInput.value = product.description;
    addbtn.innerHTML = "Update"; 
}

function search(query) {
    var newData = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase().trim())
    );
    display(newData);
}
function getLocalStorage(){
  return JSON.parse(localStorage.getItem("products")) || [];
 
}
function setLocalStorage(){
    localStorage.setItem("products", JSON.stringify(products));
}