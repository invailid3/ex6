function calculate (){
    let s = document.getElementById("calc-opt");
    let select = s[0];
    let price = 0;
    let prices = getPrices();
    let priceIndex = parseInt(select.value) - 1;

    if (priceIndex >= 0) {
        price = prices.prodTypes[priceIndex];
      }

    let quantityEl = document.getElementById("calc-quantity");
    let quantity = 0;
    quantity = parseInt(quantityEl.value);
    
    let radioCondition0 = document.getElementById("radios");
    radioCondition0.style.display = (select.value == "" ? "block" : "none");

    let checkCondition0 = document.getElementById("checkboxes");
    checkCondition0.style.display = (select.value == "" ? "block" : "none");

    let radioCondition = document.getElementById("radios");
    radioCondition.style.display = (select.value == "2" ? "block" : "none");
  
    let radios = document.getElementsByName("prodOptions");
    radios.forEach(function(radio) {
      if (radio.checked) {
        let optionPrice = prices.prodOptions[radio.value];
        if (optionPrice !== undefined) {
          price += optionPrice;
        }
      }
    });

    let checkCondition = document.getElementById("checkboxes");
    checkCondition.style.display = (select.value == "2" ? "none" : "block");

    let checkboxes = document.querySelectorAll("#checkboxes input");
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        let propPrice = prices.prodProperties[checkbox.name];
        if (propPrice !== undefined) {
          price += propPrice;
        }
      }
    });

  
    let resultEl = document.getElementById("calc-out");
    let result = quantity * price;
    if(isNaN(result)){
        resultEl.innerHTML = "PLEASE SELECT";
    }
    else{
        resultEl.innerHTML = "Result: " +  result;    
    }
}

function getPrices() {
    return {
      prodTypes: [1000000, 2500000, 1500000, 3008000],
      prodOptions: {
        option2: 100000,
        option3: 500000,
      },
      prodProperties: {
        prop1: 10000,
        prop2: 0,
      }
    };
  }

window.addEventListener('DOMContentLoaded', function (event) {

    let radioDiv = document.getElementById("radios");
    radioDiv.style.display = "none";

    let s = document.getElementById("calc-opt");
    let select = s[0];

    select.addEventListener("change", function(event) {
        let target = event.target;
        console.log(target.value);
        calculate();
    });

    let checkboxess = document.getElementById("checkboxes");
    checkboxess.style = "none";

    let radios = document.getElementsByName("prodOptions");
    radios.forEach(function(radio) {
      radio.addEventListener("change", function(event) {
        let r = event.target;
        console.log(r.value);
        calculate();
      });
    });

    let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", function(event) {
      let c = event.target;
      console.log(c.name);
      console.log(c.value);
      calculate();
    });
  });
  calculate();
});