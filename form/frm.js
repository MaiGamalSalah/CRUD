var nameInput = document.getElementById("name");
var priceInput = document.getElementById("price");
var descriptionInput = document.getElementById("description");
var tableBody = document.getElementById("tableBody-result");
var addbtn = document.getElementById("addbtn");
var currentIndex = null;
var products;

var RegexName = /^[A-Z][a-zA-Z]{3,}$/; 
var RegexPrice = /^[0-9]+(\.[0-9]{1,2})?$/; 
var RegexDescription = /^.{10,}$/; 

if (localStorage.getItem("products")) {
    products = JSON.parse(localStorage.getItem("products"));
    display(products);
} else {
    products = [];
}

// Event listener for the add/update button
addbtn.addEventListener("click", function () {
    if (validateInputs()) {
        if (addbtn.innerHTML === "Add") {
            addProduct();
        } else {
            updateProduct();
        }
    }
});

// Add event listeners for real-time validation
nameInput.addEventListener("keyup", function () {
    validateField(nameInput, RegexName, "Name must start with a capital letter and have at least 4 characters.");
});
priceInput.addEventListener("keyup", function () {
    validateField(priceInput, RegexPrice, "Price must be a valid number (e.g., 100 or 100.50).");
});
descriptionInput.addEventListener("keyup", function () {
    validateField(descriptionInput, RegexDescription, "Description must be at least 10 characters long.");
});

// Add new product
function addProduct() {
    var product = {
        name: nameInput.value,
        price: priceInput.value,
        description: descriptionInput.value
    };
    products.push(product);
    setLocalStorage();
    display(products);
    clear();
}

// Update existing product
function updateProduct() {
    var product = {
        name: nameInput.value,
        price: priceInput.value,
        description: descriptionInput.value
    };
    products[currentIndex] = product;
    setLocalStorage();
    display(products);
    clear();
    addbtn.innerHTML = "Add";
    currentIndex = null;
}

// Clear input fields
function clear() {
    nameInput.value = "";
    priceInput.value = "";
    descriptionInput.value = "";
    resetValidation(nameInput);
    resetValidation(priceInput);
    resetValidation(descriptionInput);
}

// Display products in the table
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

// Delete a product
function deleteRow(index) {
    products.splice(index, 1);
    setLocalStorage();
    display(products);
}

// Edit a product
function editRow(index) {
    currentIndex = index;
    var product = products[index];
    nameInput.value = product.name;
    priceInput.value = product.price;
    descriptionInput.value = product.description;
    addbtn.innerHTML = "Update";
}

// Search products
function search(query) {
    var newData = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase().trim())
    );
    display(newData);
}

// LocalStorage helpers
function setLocalStorage() {
    localStorage.setItem("products", JSON.stringify(products));
}

// Validate all inputs
function validateInputs() {
    var isValid = true;
    if (!validateField(nameInput, RegexName, "Name must start with a capital letter and have at least 4 characters.")) {
        isValid = false;
    }
    if (!validateField(priceInput, RegexPrice, "Price must be a valid number (e.g., 100 or 100.50).")) {
        isValid = false;
    }
    if (!validateField(descriptionInput, RegexDescription, "Description must be at least 10 characters long.")) {
        isValid = false;
    }
    return isValid;
}

// Validate a single field
function validateField(input, regex, errorMessage) {
    if (!regex.test(input.value)) {
        showValidationError(input, errorMessage);
        return false;
    } else {
        showValidationSuccess(input);
        return true;
    }
}

// Show validation error
function showValidationError(input, message) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    input.nextElementSibling.innerHTML = message;
    input.nextElementSibling.style.color = "red";
}

// Show validation success
function showValidationSuccess(input) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    input.nextElementSibling.innerHTML = "";
}

// Reset validation
function resetValidation(input) {
    input.classList.remove("is-valid", "is-invalid");
    input.nextElementSibling.innerHTML = "";
}
