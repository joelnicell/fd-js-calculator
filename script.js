let displayValue = "0";
let firstNum = null;
let currentOp = null;
let waitingForSecondNum = false;
let newEquation = true;

// ===== HTML Elements =====
const display = document.querySelector("#calc-display");
const buttons = document.querySelectorAll("button");

const themeToggleBtn = document.getElementById('toggle-theme-btn');

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('night-mode');

  if (document.body.classList.contains('night-mode')) {
    themeToggleBtn.textContent = '🌞 Light Mode';
  } else {
    themeToggleBtn.textContent = '🌙 Dark Mode';
  }
});

// ===== Handle Calculator =====
function updateDisplay() {
  display.textContent = displayValue;
};

function inputDigit(digit) {

  if (waitingForSecondNum) {
    // starting a second number
    displayValue = digit;
    waitingForSecondNum = false;
  } else if (newEquation === true) {
    // if we're starting a new equation:
    displayValue = digit;
    newEquation = false;
  } else {
    // otherwise append to current display
    displayValue += digit;
  }
  updateDisplay();
}  

function inputDecimal () {
 if (!displayValue.includes(".")) {
  displayValue += ".";
 } 
  updateDisplay();
}

function backspace() {
  if(waitingForSecondNum || displayValue === "Error") return;
  displayValue = displayValue.slice(0, -1) || "0";
  updateDisplay();
}

// not using mod function in the end

// function calculatePercentage() {
//   const value = parseFloat(displayValue);
//   displayValue = (value / 100).toString();
//   updateDisplay();
//   waitingForSecondNum = true;
// }

function toggleSign() {
  displayValue = (parseFloat(displayValue) * -1).toString();
  updateDisplay();
}

function processOp(nextOp) {
  const inputValue = parseFloat(displayValue);

  if (currentOp && waitingForSecondNum) {
    currentOp = nextOp;
    return;
  }

  if (firstNum === null) {
    firstNum = inputValue;
  } else if (currentOp) {
    const result = operate(currentOp, firstNum, inputValue);

    if (result === null) {
      handleDivideByZero();
      resetState();
      // updateDisplay();
      return;
    }

    firstNum = result;
    displayValue = formatResult(result);
    updateDisplay();
  }   
  
  currentOp = nextOp;
  waitingForSecondNum = true;
} 

function handleDivideByZero() {
  // If the calc gives null result, we can do what we want in a separate function.
  alert("Genius Alert! ;)");
}

function handleEquals()  {
  const inputValue = parseFloat(displayValue);

  if (currentOp !== null && firstNum !== null && waitingForSecondNum === false) {
    const result = operate(currentOp, firstNum, inputValue);

    // divide by zero case
    if(result === null) {
      handleDivideByZero();
    } else {
      displayValue = formatResult(result);
    }

    resetState();
    updateDisplay();
    newEquation = true;
  }
}

function clearCalculator() {
  resetState();
  displayValue = "0";
  newEquation = true;
  updateDisplay();
}

function resetState() {
  firstNum = null;
  currentOp = null;
  waitingForSecondNum = false;
}

function formatResult(result) {
  // toFixed rounds the number, so we don't need to convert to num then to string.
  const rounded = parseFloat(result.toFixed(4));
  return rounded.toString();
  // return parseFloat(result).toFixed(4);
}

// ===== Operations =====

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
  if (b === 0) {
    return null;
  }
  return a/ b;
 }

function operate(currentOp, a, b) {
  switch (currentOp) {
    case "+": 
      return add(a, b);
    case "-": 
      return subtract(a, b);
    case "*": 
      return multiply(a, b);
    case "/": 
      return divide(a, b);
    default:  
      return "Error";
  }
}

// ==== Event Listener for Buttons ====
buttons.forEach((b) => b.addEventListener("click", (event) => {
  const button = event.target;
  const buttonText = button.textContent;

  if (button.id === "ac-btn") {
    clearCalculator();
  } else if (button.id === "backspace-btn") {
    backspace();
  } else if (button.id === "equals-btn") {
    handleEquals();
  } else if (["+", "-", "*", "/"].includes(buttonText)) {
    processOp(buttonText);
  } else if (button.id === "mod-btn") {
    calculatePercentage();
  } else if (button.id === "sign-btn") {
    toggleSign();
  } else if (button.id === "decimal-btn") {
    inputDecimal();
  } else if (!isNaN(buttonText) && buttonText.trim() !== "") {
    inputDigit(buttonText);
  }
})); 

// ==== Keyboard ====
document.addEventListener("keydown", (event) => {
const key = event.key;

if (!isNaN(key)) {
  inputDigit(key);
} else if (["+", "-", "*", "/"].includes(key)) {
  processOp(key);
} else if (key === "%") {
  calculatePercentage();
} else if (key === ".") {
  inputDecimal();
} else if (key === "Enter" || key === "=") {
  event.preventDefault();
  handleEquals();
} else if (key === "Backspace") {
  backspace();
} else if (key.toLowerCase() === "c") {
  clearCalculator();
}
});

