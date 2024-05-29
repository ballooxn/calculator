let firstNumber = [];
let secondNumber = [];
let operator;
let answer;
let displayArray = [];
let secondDisplayArray = [];
const display = document.querySelector("#display");
const secondDisplay = document.querySelector("#top-display");

function operate() {
  let newFirst = Number(firstNumber.join(""));
  let newSecond = Number(secondNumber.join(""));
  console.log(newFirst);
  console.log(newSecond);
  console.log(operator);
  switch (operator) {
    case "+":
      answer = add(newFirst, newSecond);
      break;
    case "-":
      answer = subtract(newFirst, newSecond);
      break;
    case "*":
      answer = multiply(newFirst, newSecond);
      break;
    case "/":
      answer = divide(newFirst, newSecond);
      break;
    default:
      return "ERROR";
  }
  console.log(answer);
  firstNumber = [answer];
  secondNumber = [];
  displayArray = [answer];
  display.textContent = displayArray.join("");
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

function updateSecondDisplay() {
  secondDisplay.textContent = secondDisplayArray.join("");
}

function updateDisplay(e, isOperator) {
  // change operator, and number variables
  if (
    e == "=" ||
    (isOperator &&
      operator)
  ) {
    // This is an equals sign or a secondary operator
    console.log("operate");
    operate();
  } else if (isOperator && e !== "=") {
    // This is an add, subtract, multiply, or divide
    operator = e;
  } else if (
    (displayArray.includes("-") ||
      displayArray.includes("+") ||
      displayArray.includes("/") ||
      displayArray.includes("*")) &&
    secondNumber.length !== 0
  ) {
    // We are continuing the second number
    secondNumber.push(e);
    console.log("second");
  } else if (
    (displayArray.includes("-") ||
      displayArray.includes("+") ||
      displayArray.includes("/") ||
      displayArray.includes("*")) &&
    !secondNumber.length
  ) {
    // We are starting the second number.
    displayArray = [];
    secondNumber.push(e);
  } else {
    // We are in the first number
    firstNumber.push(e);
    console.log("first");
  }
  

  // Put it on the display
  if (!isOperator) {
    displayArray.push(e);
    display.innerHTML = displayArray.join("");
    secondDisplayArray.push(e)
  }
  else if (e === "=") {
    secondDisplayArray.push(e);
    if (answer !== undefined) secondDisplayArray.push(answer);
  } 
  else {
    displayArray.push(e);
    secondDisplayArray.push(e)
  }
  console.log(secondDisplayArray);
  answer = undefined;
  console.log(answer);
  updateSecondDisplay();
}

//clear the display

const clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", () => {
  displayArray = [];
  display.innerHTML = "0";
  secondDisplay.innerHTML = "";
  secondDisplayArray = [];
  firstNumber = [];
  secondNumber = [];
  operator = undefined;
});
