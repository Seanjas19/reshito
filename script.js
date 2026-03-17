const form = document.getElementById("form");

const storageKey = "Expenses Data";

displayExistedData();

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    if (validateForm()) {
        appendTableRow();
        saveToLocalStorage();
        resetForm();
    }

});

function resetForm() {
    form.reset();
}

//Get element values from input field
function getElementValue() {

    return {
        date: document.getElementById("date").value,
        payment: document.getElementById("payment-method").value,
        description: document.getElementById("description").value,
        quantity: document.getElementById("quantity").value,
        cost: document.getElementById("cost").value,
    };

};

//validate form field data
function validateForm() {

    //get element values
    const data = getElementValue();

    //get error message element id
    const dateErrMsg = document.getElementById("date-err-msg");
    const paymentErrMsg = document.getElementById("payment-err-msg");
    const descriptErrMsg = document.getElementById("descript-err-msg");
    const quantityErrMsg = document.getElementById("quantity-err-msg");
    const costErrMsg = document.getElementById("cost-err-msg");

    //make function become boolean unit
    let isValid = true;

    //validate date input value
    if (data.date === "") {
        dateErrMsg.textContent = "Please select a date";
        dateErrMsg.style.display = "block";
        isValid = false;
    }
    else {
        dateErrMsg.style.display = "none";
    };

    //validate payment method input value
    if (data.payment === "") {
        paymentErrMsg.textContent = "Please choose a payment method";
        paymentErrMsg.style.display = "block";
        isValid = false;
    }
    else {
        paymentErrMsg.style.display = "none";
    };

    //validate description input value
    if (data.description === "") {
        descriptErrMsg.textContent = "Please enter a description";
        descriptErrMsg.style.display = "block";
        isValid = false;
    }
    else {
        descriptErrMsg.style.display = "none";
    }

    //validate quantity input value
    if (data.quantity === "") {
        quantityErrMsg.textContent = "Please enter a quantity";
        quantityErrMsg.style.display = "block";
        isValid = false;
    }
    //validate input value is less than 1
    else if (data.quantity < 1) {
        quantityErrMsg.textContent = "Quantity must be 1 or more";
        quantityErrMsg.style.display = "block";
        isValid = false;
    }
    else {
        quantityErrMsg.style.display = "none";
    }

    //validate cost input value
    if (data.cost === "") {
        costErrMsg.textContent = "Please enter a cost";
        costErrMsg.style.display = "block";
        isValid = false;
    }
    //validate if input value less or equal to 0
    else if (data.cost <= 0) {
        costErrMsg.textContent = "Cost must be more than 0";
        costErrMsg.style.display = "block";
        isValid = false;
    }
    else {
        costErrMsg.style.display = "none";
    }

    return isValid;
};

//build table row
function buildTableRow(data) {

    //get table body element id
    const tableBody = document.getElementById("table-body");

    //create table row element
    const tableRow = document.createElement("tr");

    //append table row to table body
    /* 
    <tbody>
        <tr></tr>  <--- Append 
    </tbody>
    */
    tableBody.appendChild(tableRow);

    //create table data for each values
    const dateTableData = document.createElement("td");
    const paymentTableData = document.createElement("td");
    const descriptionTableData = document.createElement("td");
    const quantityTableData = document.createElement("td");
    const costTableData = document.createElement("td");
    const totalTableData = document.createElement("td");

    //feed data to each created element
    dateTableData.textContent = data.date;
    paymentTableData.textContent = data.payment;
    descriptionTableData.textContent = data.description;
    quantityTableData.textContent = data.quantity;
    costTableData.textContent = data.cost;
    totalTableData.textContent = data.cost * data.quantity;

    //append table body to table row
    tableRow.appendChild(dateTableData);
    tableRow.appendChild(paymentTableData);
    tableRow.appendChild(descriptionTableData);
    tableRow.appendChild(quantityTableData);
    tableRow.appendChild(costTableData);
    tableRow.appendChild(totalTableData);
};

//append table row
function appendTableRow() {

    //get element data
    const data = getElementValue();

    //build table row with table dataS
    buildTableRow(data);
};

//Why? Because using local storage we need to get existing data first if not then we will override the new data in it
function saveToLocalStorage() {

    //get existing data from local storage if no then use empty array 
    const getExistedData = JSON.parse(localStorage.getItem(storageKey) || "[]");

    //get new data from input field
    const newData = getElementValue();

    //push new data to existing array
    getExistedData.push(newData);

    //save back to local storage
    localStorage.setItem(storageKey, JSON.stringify(getExistedData));
};

//Why? This is like Reverse Engineering which is the opposite way of append table row just using existing data
function displayExistedData() {

    const getExistedData = JSON.parse(localStorage.getItem(storageKey) || "[]");

    for (const data of getExistedData) {
        buildTableRow(data);
    };

};