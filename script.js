let firstNumber = [];
let secondNumber = [];
let operator;
let answer;
let displayArray = [];

function operate() {
  let newFirst = Number(firstNumber.join(""));
  let newSecond = Number(secondNumber.join(""));
  let answer;
  switch (operator) {
    case "+":
      answer = add(newFirst, newSecond);
    case "-":
      answer = subtract(newFirst, newSecond);
    case "*":
      answer = multiply(newFirst, newSecond);
    case "/":
      answer = divide(newFirst, newSecond);
  }
  firstNumber = [answer];
  secondNumber = [];
  return true;
}

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

// update display

const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operators");

numberButtons.forEach(function (elem) {
  elem.addEventListener("click", () => updateDisplay(elem.textContent, false));
});
operatorButtons.forEach(function (elem) {
  elem.addEventListener("click", () => updateDisplay(elem.textContent, true));
});

const display = document.querySelector("#display");

function updateDisplay(e, isOperator) {

  // change operator, and number variables
  if (e == "=") {
    console.log("operate");
    operate();
  } else if (isOperator && e !== "=") {
    operator = e;
  } else if (
    (displayArray.includes("-") ||
    displayArray.includes("+") ||
    displayArray.includes("/") ||
    displayArray.includes("*")) && secondNumber.length !== 0
  ) 
  {
    secondNumber.push(e);
    console.log("second");
  } 
  else if ((displayArray.includes("-") ||
  displayArray.includes("+") ||
  displayArray.includes("/") ||
  displayArray.includes("*")) && !secondNumber.length) {
    // We are starting the second number.
    displayArray = []
    secondNumber.push(e);
  }
  else {
    firstNumber.push(e);
    console.log("first");
  }
  // Put it on the display
  if (!isOperator) {
    displayArray.push(e);
    display.innerHTML = displayArray.join("");
  }
  else {
    displayArray.push(e);
  }
}

//clear the display

const clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", () => {
  displayArray = [];
  display.innerHTML = "0";
  firstNumber = [];
  secondNumber = [];
  operator = undefined;
});
