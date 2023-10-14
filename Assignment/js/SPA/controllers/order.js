$('#OrderDate').val(new Date().toISOString().slice(0, 10));
//get Customer ID
function loadAllCusID() {
    var cusSelect = '';
    for (var i = 0; i < customerDB.length; i++) {
        cusSelect += '<option value="' + customerDB[i].id + '">' + customerDB[i].id + '</option>';
    }
    $('#MenuCus').append(cusSelect);
}

function loadAllItemID(){
    var itemSelect = '';
    for (var i = 0; i < itemDB.length; i++) {
        itemSelect += '<option value="' + itemDB[i].code + '">' + itemDB[i].code + '</option>';
    }
    $('#MenuItem').append(itemSelect);
}

$('#MenuCus').change(function () {
    for (let i = 0; i < customerDB.length; i++) {
        if ($(this).val() == customerDB[i].id) {
            $('#CusAutoName').val(customerDB[i].name);
            $('#CusAutoSalary').val(customerDB[i].address)
            $('#CusAutoAddres').val(customerDB[i].salary)
            break;
        }
    }
});

$('#MenuItem').change(function () {
    for (let i = 0; i < itemDB.length; i++) {
        if ($(this).val() == itemDB[i].code) {
            $('#IAutoName').val(itemDB[i].description);
            $('#IAutoPrice').val(itemDB[i].qtyOnHand)
            $('#IAutoQty').val(itemDB[i].unitPrice)
            break;
        }
    }
});

function saveOrder(){

}

function setOrderId() {
    if (orderDB.length > 0) {
        $("#txtOrderID").val("O00" + (orderDB.length + 1));
    } else {
        $("#txtOrderID").val("O001");
    }
    $("#selectCustomerId").focus();
}


// let orderCounter = 0;
// function generateOrderID() {
//     orderCounter++;
//     const paddedCounter = orderCounter.toString().padStart(2, '0');
//     return `O${paddedCounter}`;
//   }
  
//   // Example usage:
//   const newOrderID = generateOrderID();
//   console.log(newOrderID); // This will display the next order ID, e.g., "O01"
// // Example usage:
// document.getElementById('OederId').value = generateOrderID();
  