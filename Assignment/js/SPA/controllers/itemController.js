// add all item
getAllItems();


// call save item method
$("#btnItem").click(function () {
    saveItem();
});

// call getAll item method
$("#btnItemGetAll").click(function () {
    getAllItems();
});

// call clear item method
$("#btnClear").click(function () {
    clearItemInputFields();
});

// call delet item method
$("#btnItemDelete").click(function (){
    let code = $("#txtItemId").val();

    let consent = confirm("Do you want to delete.?");
    if (consent) {
        let response = deleteItem(code);
        if (response) {
            alert("Item Deleted");
            clearItemInputFields();
            getAllItems();
        } else {
            alert("Item Not Removed..!");
        }
    }
});

// call item update method
$("#btnUpdate").click(function () {
    let code = $("#txtItemId").val();
    updateItem(code);
    clearItemInputFields();
});


// getAllItem method
function getAllItems() {
    //remove all the child elements of tbody before adding the table rows
    $("#tblItem").empty();

    for (let i = 0; i < itemDB.length; i++) {
        let code = itemDB[i].code;
        let description = itemDB[i].description;
        let qtyOnHand = itemDB[i].qtyOnHand;
        let unitPrice = itemDB[i].unitPrice;

        let row = `<tr>
                        <td>${code}</td>
                        <td>${description}</td>
                        <td>${qtyOnHand}</td>
                        <td>${unitPrice}</td>
                    </tr>`;
        $("#tblItem").append(row);
    }

    bindTrEvents();

}

function bindTrEvents() {
    $('#tblItem>tr').click(function () {
        //get the selected rows data
        let code = $(this).children().eq(0).text();
        let description = $(this).children().eq(1).text();
        let qtyOnHand = $(this).children().eq(3).text();
        let unitPrice = $(this).children().eq(2).text();

        //set the selected rows data to the input fields
        $("#txtItemId").val(code);
        $("#txtItemName").val(description);
        $("#txtQty").val(qtyOnHand);
        $("#txtPrice").val(unitPrice);
    })
}

// save Item method
function saveItem() {
    let itemCode = $("#txtItemId").val();
    //check customer is exists or not?
    // if (searchCustomer(customerID.trim()) == undefined) {

        //if the customer is not available then add him to the array
        let itemDescription = $("#txtItemName").val();
        let itemQty = $("#txtQty").val();
        let itemPrice = $("#txtPrice").val();

        //by using this one we can create a new object using
        //the customer model with same properties
        let newItem = Object.assign({}, item);

        //assigning new values for the customer object
        newItem.code = itemCode;
        newItem.description = itemDescription;
        newItem.qtyOnHand = itemQty;
        newItem.unitPrice = itemPrice;

        //add customer record to the customer array (DB)
        itemDB.push(newItem);
        clearItemInputFields();
        saveItem();

    // } else {
    //     alert("Customer already exits.!");
    //     clearCustomerInputFields();
    // }
}


function deleteItem(code) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == code) {
            itemDB.splice(i, 1);
            return true;
        }
    }
    return false;
}
