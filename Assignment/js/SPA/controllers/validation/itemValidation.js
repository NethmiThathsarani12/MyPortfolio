// validation for items
const ITM_ID_REGEX = /^(I00-)[0-9]{3}$/;
const ITM_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const ITM_PRICE_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;

// add validations and text fields to the array
let i_vArray = new Array();
i_vArray.push({ field: $("#txtItemId"), regEx: ITM_ID_REGEX });
i_vArray.push({ field: $("#txtItemName"), regEx: ITM_NAME_REGEX });
i_vArray.push({ field: $("#txtPrice"), regEx: ITM_PRICE_REGEX });

function clearItemInputFields() {
  $("#txtItemId,#txtItemName,#txtQty,#txtPrice").val("");
  $("#txtItemId,#txtItemName,#txtQty,#txtPrice").css("border", "1px solid #ced4da");
  $("#txtItemId").focus();
  setBtnn();
}

setBtnn();

// disable tab
$("#txtItemId,#txtItemName,#txtPrice").on("keydown keyup", function (e) {
  // get the index number of data input fields indexNo
  let indexNo = i_vArray.findIndex((c) => c.field.attr("id") == e.target.id);

  // Disable tab key
  if (e.key == "Tab") {
    e.preventDefault();
  }

  // check validations
  checkValidations(i_vArray[indexNo]);

  setBtnn();

  // If the enter key is pressed, check and focus
  if (e.key == "Enter") {
    if (e.target.id != i_vArray[i_vArray.length - 1].field.attr("id")) {
      // check validation is ok
      if (checkValidations(i_vArray[indexNo])) {
        i_vArray[indexNo + 1].field.focus();
      }
    } else {
      if (checkValidations(i_vArray[indexNo])) {
        saveItem();
      }
    }
  }
});

function checkValidations(object) {
  if (object.regEx.test(object.field.val())) {
    setBorder(true, object);
    return true;
  }
  setBorder(false, object);
  return false;
}

function setBorder(bol, ob) {
  if (!bol) {
    if (ob.field.val().length >= 1) {
      ob.field.css("border", "2px solid red");
    } else {
      ob.field.css("border", "1px solid #ced4da");
    }
  } else {
    if (ob.field.val().length >= 1) {
      ob.field.css("border", "2px solid green");
    } else {
      ob.field.css("border", "1px solid #ced4da");
    }
  }
}

function checkAll() {
  for (let i = 0; i < i_vArray.length; i++) {
    if (!checkValidations(i_vArray[i])) return false;
  }
  return true;
}

function setBtnn() {
  $("#btnItemDelete").prop("disabled", true);
  $("#btnItemUpdate").prop("disabled", true);

  if (checkAll()) {
    $("#btnItem").prop("disabled", false);
  } else {
    $("#btnItem").prop("disabled", true);
  }

  let code = $("#txtItemId").val();
  if (searchItem(code) == undefined) {
    $("#btnItemDelete").prop("disabled", true);
    $("#btnItemUpdate").prop("disabled", true);
  } else {
    $("#btnItemDelete").prop("disabled", false);
    $("#btnItemUpdate").prop("disabled", false);
  }
}