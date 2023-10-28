const product = {
  "type1": {
    "checkbox": false,
    "subproduct": false
  },
  "type2":{
    "checkbox": false,
    "subproduct": true
  },
  "type3":{
    "checkbox": true,
    "subproduct": false
  }
};

const prices = {
  "type1": 2000,
  "type2": 10000,
  "type3": 6000
};

function calculate(){
  let selectElem = document.getElementsByName("prodType");
  let select;
  selectElem.forEach((child) => {
    if(child.checked){
      select = child.value;
    }
  });
  let quantityEl = document.getElementById("quantity");
  let quantity = parseInt(quantityEl.value);
  let result = 0;
  let subCheck;
  let subPrice;
  if(select === "type1"){
    result = prices[select]*quantity;
  }
  else if(select === "type2"){
    subCheck = document.getElementById("calc-subproduct-select-outter");
    subPrice = parseInt(subCheck.value);
    result = prices[select]*quantity + subPrice;
  }
  else if(select === "type3"){
    subCheck = document.getElementById("checkboxes");
    subPrice = 0;
    subCheck.childNodes.forEach((child) => {
      if (child.nodeName !== "#text") {
        if(child.firstChild.checked === true){
          subPrice += parseInt(child.firstChild.value);
        }
      }
    });
    result += prices[select]*quantity + subPrice;
  }

  let resultEl = document.getElementById("calc-out");
   if(Number.isNaN(result) || result < 0){
       resultEl.innerHTML = "Invalid input";
   }
   else{
       resultEl.innerHTML = "Result: " +  result;
   }
}



function changeType(){
  let productTypeEls = document.getElementsByName("prodType");
  let productType;
  productTypeEls.forEach((child) => {
    if(child.checked){
      productType = child.value;
    }
  });

  let selectEl;
  if(product[productType].subproduct) {
    selectEl = document.getElementById("calc-subproduct-select-outter");
    selectEl.removeAttribute("disabled");
    selectEl.style = "opacity: 1";
  }
  else {
    selectEl = document.getElementById("calc-subproduct-select-outter");
    selectEl.setAttribute("disabled", "");
    selectEl.style = "opacity: 0";
  }

  let checkboxSelect;
  if(product[productType].checkbox){
    checkboxSelect = document.getElementById("checkboxes");
    checkboxSelect.removeAttribute("disabled");
    checkboxSelect.style = "opacity: 1";
  }
  else{
    checkboxSelect = document.getElementById("checkboxes");
    checkboxSelect.setAttribute("disabled", "");
    checkboxSelect.style = "opacity: 0";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let buttonEl = document.getElementById("calc-butt");
  buttonEl.addEventListener("click", calculate);

  let productTypeEl = document.getElementById("product-type");
  productTypeEl.addEventListener("change", changeType);

});
