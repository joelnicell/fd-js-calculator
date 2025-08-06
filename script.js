let displayValue = "0";
let firstNum = null;
let currentOp = null;
let waitingForSecondNum = false;

// ===== HTML Elements =====
const display = document.querySelector("#calc-display");
const ac = document.querySelector("#ac-btn");

// ===== Functions =====
function updateDisplay() {
  display.textContent = displayValue;
};

function inputDigit(digit) {
  if (waitingForSecondNum) {
    displayValue = digit;
    waitingForSecondNum = false;
  } else {
    displayValue = displayValue === "0"? digit : displayValue + digit
  }
  updateDisplay();
}  

function inputDecimal () {
 if (!displayValue.includes(".")) {
  displayValue += ".";
 } 
  updateDisplay ();
}

function backspace() {
  if(waitingForSecondNum || displayValue === "Error") return;
  displayValue = displayValue.slice(0, -1) || "0";
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
    if (typeof result === "string") {
       displayValue = result;
      resetState();
      updateDisplay();
      return;

    }
    firstNum = result;
    displayValue = formatResult(result);
    updateDisplay();
  }   
  
  currentOp = nextOp;
  waitingForSecondNum = true;
} 

function handleEquals()  {
  const inputValue = parseFloat(displayValue);

  if (currentOp && firstNum !== null) {
    const result = operate(currentOp, firstNum, inputValue);

    if(typeof result === "string") {
      displayValue = result;
      resetState();
      updateDisplay();
      return;
    }

    displayValue = formatResult(result);
    firstNum = result;
    currentOp = null;
    waitingForSecondNum = false;
    updateDisplay();
  }
}

function clearCalculator() {
  resetState();
  displayValue = "0";
  updateDisplay();
}

function resetState() {
  firstNum = null;
  currentOp = null;
  waitingForSecondNum = false;
}

function formatResult(result) {
  if (typeof result === "string") return result;
  const rounded = parseFloat(result.toFixed(4));
  return rounded.toString();
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
  if (b === 0) {
    // todo: safely return a value we can use for error handling. e.g. NaN or null
    return "Genius alert!";
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
buttons.addEventListener("click", (event) => {
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
  } else if (button.id === "decimal-btn") {
    inputDecimal();
  } else if (!isNaN(buttonText) && buttonText.trim() !== "") {
    inputDigit(buttonText);
  }
}); 

// ==== Keyboard ====
document.addEventListener("keydown", (event) => {
const key = event.key;

if (!isNaN(key)) {
  inputDigit(key);
} else if (["+", "-", "*", "/"].includes(key)) {
  processOp(key);
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

ac.addEventListener("click", () => resetState());
