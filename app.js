const resetBtn = document.getElementById("reset");
const billInput = document.getElementById("bill");
const buttonInputs = document.getElementsByClassName("button-container");
const tipAmount = document.getElementById("tip-amount");
const total = document.getElementById("total");
const tipAmountValue = document.getElementById("tip-amount-value");
const totalValue = document.getElementById("total-value");
const numberPeople = document.getElementById("people-input");
const numberSpan = document.getElementById("number-span");
const customId = document.getElementById("custom-id");


tipAmountValue.innerHTML = "$0.00";
totalValue.innerHTML = "$0.00";

customId.addEventListener("input", () => {
  
  if (customId.value.length > 0) {
    const lastPerson = parseFloat(numberPeople.value);
    if (lastPerson > 0) {
      const billAmount = parseFloat(billInput.value);
      const tipPercentage = parseFloat(customId.value.replace("%", ""));
      const tip = (billAmount * (tipPercentage / 100)) / lastPerson;
      const totalAmount = (billAmount + (tip * lastPerson)) / lastPerson;

      tipAmountValue.textContent = tip.toFixed(2);
      totalValue.textContent = totalAmount.toFixed(2);

      resetBtn.disabled = false;
    } else {
      tipAmountValue.textContent = "$0.00";
      totalValue.textContent = "$0.00";
      numberSpan.innerHTML = "Can't be Zero";
      numberSpan.style.color = "red";
      numberSpan.style.fontWeight = "bold";
      numberPeople.style.border = "1px solid red";
    }
  }
  updateResetButtonState();
});


numberPeople.addEventListener("input", (e) => {
  if (numberPeople.value.length > 0) {
    const lastPerson = parseFloat(numberPeople.value);
    const customPercentage = parseFloat(customId.value.replace("%", ""));

    if (lastPerson === 0) {
      tipAmountValue.textContent = "$0.00";
      totalValue.textContent = "$0.00";
    } else if (isNaN(customPercentage)) {
      const selectedButton = document.querySelector(".button-container button.active");
      if (selectedButton) {
        const tipPercentage = parseFloat(selectedButton.innerText.replace("%", ""));
        const billAmount = parseFloat(billInput.value);
        const tip = (billAmount * (tipPercentage / 100)) / lastPerson;
        const totalAmount = billAmount / lastPerson + tip;

        tipAmountValue.textContent = "$" + tip.toFixed(2);
        totalValue.textContent = "$" + totalAmount.toFixed(2);
      }
    } else {
      const billAmount = parseFloat(billInput.value);
      const tip = (billAmount * (customPercentage / 100)) / lastPerson;
      const totalAmount = billAmount / lastPerson + tip;

      tipAmountValue.textContent = "$" + tip.toFixed(2);
      totalValue.textContent = "$" + totalAmount.toFixed(2);
    }
  }

  updateResetButtonState();
});





for (let i = 0; i < buttonInputs.length; i++) {
  const button = buttonInputs[i].querySelector("button");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    customId.value = "";
    // Önce tüm butonların rengini varsayılan renge döndürelim
    for (let j = 0; j < buttonInputs.length; j++) {
      buttonInputs[j].querySelector("button").classList.remove("active");
    }

    // Basılan butonun rengini değiştirelim
    button.classList.add("active");

    if (numberPeople.value.length === 0) {
      tipAmountValue.textContent = "$0.00";
      totalValue.textContent = "$0.00";
      numberSpan.innerHTML = "Enter Number";
      numberSpan.style.color = "black";
      numberSpan.style.fontWeight = "normal";
      numberPeople.style.border = "1px solid black";
    } else if (numberPeople.value == 0) {
      tipAmountValue.textContent = "$0.00";
      totalValue.textContent = "$0.00";
      numberSpan.innerHTML = "Can't be Zero";
      numberSpan.style.color = "red";
      numberSpan.style.fontWeight = "bold";
      numberPeople.style.border = "1px solid red";
    } else {
      const billAmount = parseFloat(billInput.value);
      const tipPercentage = parseFloat(button.innerText.replace("%", ""));
      const people = parseFloat(numberPeople.value);
      const tip = (billAmount * (tipPercentage / 100)) / people;
      const totalAmount = (billAmount + (tip * people)) / people;

      tipAmountValue.textContent = tip.toFixed(2);
      totalValue.textContent = totalAmount.toFixed(2);

      resetBtn.disabled = false;
    }
  });
  updateResetButtonState();
}


resetBtn.addEventListener("click", () => {
  
  if (numberPeople.value !== "" || billInput.value !== "") {
    
    tipAmountValue.textContent = "$0.00";
    totalValue.textContent = "$0.00";
    numberPeople.value = "";
    billInput.value = "";
  }
  resetBtn.disabled = true;
  resetBtn.classList.remove("active");
});

function updateResetButtonState() {
  if (numberPeople.value !== "" || billInput.value !== "") {
    resetBtn.disabled = false;
    resetBtn.classList.add("active");
  } else {
    resetBtn.disabled = true;
    resetBtn.classList.remove("active");
  }
}



