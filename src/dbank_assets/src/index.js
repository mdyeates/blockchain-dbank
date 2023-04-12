import { dbank } from "../../declarations/dbank";

const inputAmountElement = document.getElementById("input-amount");
const withdrawAmountElement = document.getElementById("withdrawal-amount");
const valueElement = document.getElementById("value");
const submitButtonElement = document.querySelector("#submit-btn");

window.addEventListener("load", async () => {
  console.log("loaded");
  update();
});

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  submitButtonElement.setAttribute("disabled", true);

  const inputAmount = parseFloat(inputAmountElement.value);
  const withdrawAmount = parseFloat(withdrawAmountElement.value);

  if (inputAmount) {
    await dbank.topUp(inputAmount);
  }

  if (withdrawAmount) {
    await dbank.withdraw(withdrawAmount);
  }

  await dbank.compound();
  updateInputFieldsAndButton();

  submitButtonElement.removeAttribute("disabled");
});

async function update() {
  const balance = await dbank.checkBalance();
  valueElement.innerText = balance.toFixed(2);
}

function updateInputFieldsAndButton() {
  inputAmountElement.value = "";
  withdrawAmountElement.value = "";
  update();
}
