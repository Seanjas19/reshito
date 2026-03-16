const form = document.getElementById("form");

loadToDisplayData();

form.addEventListener("submit", function(event) {

    //To avoid browser default refresh when click submit button
    event.preventDefault();

    if (validateForm()){
        appendTableRow();
        saveToLocalStorage();
        resetForm();
    }

})

//Reset the form input field
function resetForm() {
    form.reset();
}

//Append Table Row 
function appendTableRow() {

    //Declare & Collect Data from HTML input field
    const date = document.getElementById("date").value;
    const paymentMethod = document.getElementById("payment-method").value;
    const description = document.getElementById("description").value;
    const quantity = document.getElementById("quantity").value;
    let cost = document.getElementById("cost").value;

    cost *= quantity; 

    buildTableRow({
        date: date,
        paymentMethod: paymentMethod,
        description: description,
        quantity: quantity,
        cost: cost
    });
}


function validateForm() {

    //Boolean declaration to be used in event listener
    let isValid = true;
    
    //get value from input field
    const date = document.getElementById("date").value;
    const paymentMethod = document.getElementById("payment-method").value;
    const description = document.getElementById("description").value;
    const quantity = document.getElementById("quantity").value;
    const cost = document.getElementById("cost").value;

    //get error message element by id
    const dateErrorMsg = document.getElementById("date-error-msg");
    const paymentErrorMsg = document.getElementById("payment-error-msg");
    const descriptionErrorMsg = document.getElementById("descript-error-msg");
    const quantityErrorMsg = document.getElementById("quantity-error-msg");
    const costErrorMsg = document.getElementById("cost-error-msg");
    
    //Condition for validation
    //Check date if is empty
    if (date === "") {
        dateErrorMsg.textContent = "Please select a date";
        dateErrorMsg.style.display = "block";
        isValid = false;
    }
    else {
        dateErrorMsg.style.display = "none";
    }
    //Check payment method if is empty
    if (paymentMethod === "") {
        paymentErrorMsg.textContent = "Please select a payment method";
        paymentErrorMsg.style.display = "block";
        isValid = false;
    }
    else {
        paymentErrorMsg.style.display = "none";
    }
    //Check description if is empty
    if (description === "") {
        descriptionErrorMsg.textContent = "Please enter a description";
        descriptionErrorMsg.style.display = "block";
        isValid = false;
    }
    else {
        descriptionErrorMsg.style.display = "none";
    }
    //Check quantity if is empty
    if (quantity === "") {
        quantityErrorMsg.textContent = "Please enter a number of quantity";
        quantityErrorMsg.style.display = "block";
        isValid = false;
    }
    //Check quantity is less than 1
    else if (quantity < 1) {
        quantityErrorMsg.textContent = "Quantity must be 1 or more";
        quantityErrorMsg.style.display = "block";
        isValid = false;
    }
    else {
        quantityErrorMsg.style.display = "none";
    }
    //Check cost if is empty
    if (cost === "") {
        costErrorMsg.textContent = "Please enter item cost";
        costErrorMsg.style.display = "block";
        isValid = false;
    }
    //Check cost is less or equal to 0
    else if (cost <= 0) {
        costErrorMsg.textContent = "Cost must be greater than 0";
        costErrorMsg.style.display = "block";
        isValid = false;
    }
    else {
        costErrorMsg.style.display = "none";
    }
    
    //return value to function caller
    return isValid;
}

function saveToLocalStorage() {

    const key = "Retrieve Data";

    const retrieveData = JSON.parse(localStorage.getItem(key) || "[]" );
    
    //get value from input field
    const date = document.getElementById("date").value;
    const paymentMethod = document.getElementById("payment-method").value;
    const description = document.getElementById("description").value;
    const quantity = document.getElementById("quantity").value;
    let cost = document.getElementById("cost").value;

    cost *= quantity;

    const newValue = {
        date: date,
        paymentMethod: paymentMethod,
        description: description,
        quantity: quantity,
        cost: cost
    };

    retrieveData.push(newValue);

    localStorage.setItem(key, JSON.stringify(retrieveData));

}


function loadToDisplayData() {

    const displayData = JSON.parse(localStorage.getItem("Retrieve Data") || "[]");

    for (const data of displayData) {

        buildTableRow(data);

    };
}

function buildTableRow(expensesData) {

    //Get existing element from HTML
    const tableBody = document.getElementById("table-body");

    //Create HTML element
    const tableRow = document.createElement("tr");

    //Move an element inside an element
    tableBody.appendChild(tableRow);

    //Create table data elements (Each variables storing different value instead of let all in one)
    const tableDataDate = document.createElement("td");
    const tableDataPayment = document.createElement("td");
    const tableDataDescript = document.createElement("td");
    const tableDataQuantity = document.createElement("td");
    const tableDataCost = document.createElement("td");

    //Feeding each table data element with specific input data
    tableDataDate.textContent = expensesData.date;
    tableDataPayment.textContent = expensesData.paymentMethod;
    tableDataDescript.textContent = expensesData.description;
    tableDataQuantity.textContent = expensesData.quantity;
    tableDataCost.textContent = expensesData.cost;

    //Append them to table row element
    tableRow.appendChild(tableDataDate);
    tableRow.appendChild(tableDataPayment);
    tableRow.appendChild(tableDataDescript);
    tableRow.appendChild(tableDataQuantity);
    tableRow.appendChild(tableDataCost);
}