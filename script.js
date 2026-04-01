const form = document.getElementById("form");

const storageKey = "Expenses Data";

let editingId = null;

let editingRow = null;

displayExistedData();

calculateTotalExpenses();

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    if (validateForm()) {
        if (editingId === null) {
            const id = Date.now();
            //declare the id and get elements from input fields
            const data = declarationData(id);
            saveToLocalStorage(data);
            appendTableRow(data);
        }
        else {
            updateTableRow();
        }
        resetForm();
        editingId = null;
    }

    calculateTotalExpenses();
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
function buildTableRow(data, referenceRow) {

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
    if (referenceRow) {
        tableBody.insertBefore(tableRow, referenceRow);
    }
    else {
        tableBody.appendChild(tableRow);
    }

    //create table data for each values
    const dateTableData = document.createElement("td");
    const paymentTableData = document.createElement("td");
    const descriptionTableData = document.createElement("td");
    const quantityTableData = document.createElement("td");
    const costTableData = document.createElement("td");
    const totalTableData = document.createElement("td");

    //create edit button
    const editBtn = document.createElement("button");

    //create delete button
    const deleteBtn = document.createElement("button");

    //feed data to each created element
    dateTableData.textContent = data.date;
    paymentTableData.textContent = data.payment;
    descriptionTableData.textContent = data.description;
    quantityTableData.textContent = data.quantity;
    costTableData.textContent = data.cost;
    totalTableData.textContent = data.cost * data.quantity;

    //text content of the edit button should be "Edit"
    editBtn.textContent = "Edit"

    //text content of the delete button should be "Delete"
    deleteBtn.textContent = "Delete"

    //append table body to table row
    tableRow.appendChild(dateTableData);
    tableRow.appendChild(paymentTableData);
    tableRow.appendChild(descriptionTableData);
    tableRow.appendChild(quantityTableData);
    tableRow.appendChild(costTableData);
    tableRow.appendChild(totalTableData);

    //append edit button
    tableRow.appendChild(editBtn);

    //append delete button
    tableRow.appendChild(deleteBtn);

    editBtn.addEventListener("click", function() {
        document.getElementById("date").value = data.date;
        document.getElementById("payment-method").value = data.payment;
        document.getElementById("description").value = data.description;
        document.getElementById("quantity").value = data.quantity;
        document.getElementById("cost").value = data.cost;

        editingId = data.id;

        editingRow = tableRow;
    });

    deleteBtn.addEventListener("click", function() {

        const getExistedData = JSON.parse(localStorage.getItem(storageKey) || "[]"); 

        const filterData = getExistedData.filter(function(item) {
            return item.id !== data.id;
        });

        localStorage.setItem(storageKey, JSON.stringify(filterData));

        tableRow.remove();

        calculateTotalExpenses();
    })
};

//append table row
function appendTableRow(data) {

    //build table row with table dataS
    buildTableRow(data);
};

//Why? Because using local storage we need to get existing data first if not then we will override the new data in it
function saveToLocalStorage(data) {

    //get existing data from local storage if no then use empty array 
    const getExistedData = JSON.parse(localStorage.getItem(storageKey) || "[]");

    //push new data to existing array
    getExistedData.push(data);

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

function declarationData(id) {
    
    return {
        id: id,
        ...getElementValue()
    };
};

function updateTableRow() {
    const getExistingData = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const mapData = getExistingData.map(function(item) {
        if (item.id === editingId) {
            return {
                id: editingId,
                ...getElementValue()
            };
        }
        else {
            return item;
        }
    });

    localStorage.setItem(storageKey, JSON.stringify(mapData));

    const updateExpenses = mapData.find(function(item) {
        return item.id === editingId;
    })

    buildTableRow(updateExpenses, editingRow);

    editingRow.remove();
};

function calculateTotalExpenses() {
    const getExistingData = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const todayDate = new Date();

    const todayMonth = todayDate.getMonth();

    const todayYear = todayDate.getFullYear();

    const filterExpenses = getExistingData.filter(function(item) {
        const expenseDate = new Date(item.date);

        return expenseDate.getMonth() === todayMonth && expenseDate.getFullYear() === todayYear;
    });

    const totalExpenses = filterExpenses.reduce(function(accumulator, item) {
        return accumulator + (item.cost * item.quantity)
    }, 0);

    const getTotalElement = document.getElementById("total-spend-amount");

    getTotalElement.textContent = totalExpenses.toFixed(2);
}