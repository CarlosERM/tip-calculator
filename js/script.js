const bill = document.querySelector("#money");

const percentage = document.querySelectorAll(".tip-list li");
const customTip = document.querySelector("#input-custom");

const numberPeople = document.querySelector("#people");
const inputReset = document.querySelector(".inputs--reset");

const tip = document.querySelector(".calculator__tip-amount h4");
let percentageValue;
const total = document.querySelector(".calculator__total h4");

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function handleLi() {
  percentage.forEach((li) => {
    li.classList.remove("active");
  });
}
function reseter() {
  bill.value = ``;
  handleLi();

  numberPeople.value = ``;

  tip.innerHTML = `$0.00`;
  total.innerHTML = `$0.00`;

  inputReset.classList.add("inputs--reset--op");
}

function handleInput() {
  const value = +bill.value || 0.0;
  let tipValue = value * 0.05;

  if (percentageValue) {
    tipValue = +value * percentageValue;
  }

  if (customTip.value) {
    tipValue = +value * (customTip.value / 100);
  }

  const people = +numberPeople.value || 1;

  const grandTotal = value + tipValue;

  tip.innerHTML = `$${roundToTwo(tipValue / (people || 1))}`;
  total.innerHTML = `$${roundToTwo(grandTotal / people)}`;

  if (inputReset.classList.contains("inputs--reset--op")) {
    inputReset.classList.remove("inputs--reset--op");
  }
  if (
    bill.value === `` &&
    numberPeople.value === `` &&
    tip.innerHTML === `$0.00` &&
    total.innerHTML === `$0.00` &&
    customTip.value === ``
  ) {
    inputReset.classList.add("inputs--reset--op");
  }

  inputReset.addEventListener("click", reseter);
}

function handleClick(e) {
  percentageValue = e.target.dataset.value;
  percentage.forEach((li) => {
    if (li != e.target) li.classList.remove("active");
  });
  e.target.classList.toggle("active");
  handleInput();
}

bill.addEventListener("input", handleInput);
percentage.forEach((a) => a.addEventListener("click", handleClick));
numberPeople.addEventListener("input", handleInput);

customTip.addEventListener("focus", handleLi);
customTip.addEventListener("input", handleInput);
