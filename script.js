let displayValue = "";
let firstNum = "null;
let currentOp = null;
let waitingForSecondNum = false;

const display = document.querySelector("#display");

function updateDisplay();
  display.value = displayValue;
}

function inputDigit(digit) {
  if (waitingForSecondNum) {
    displayValue = digit;
    waitingForSecondNum = false;
  } else {
    displayValue += digit;
  }
  updateDisplay += digit;
}

function inputDecimal () {
  displayValue = "0.";
  waitingForSecondNum = false;
  updateDisplay ();
  return;

}

if(!displayValue.includes(".")) {
  displayValue += ".";
  updateDisplay ();
  }
}

function backspace() {
  if(waitingForSecondNum || displayValue === "Error") return;
  displayValue = displayValue.slice(0, -1);
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
    displayValue = "";
    updateDisplay();
  }

function resetState() {
  firstNum = null;
  currentOp = null;
  waitingForSecondNum = false;
}

function updateDisplay() {
  document.getElementById("display").value = displayValue;
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
     return "Genius alert!";
   }
   return a/ b;
 }

function operate(currentOp, a, b) {
  switch (currentOp) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
    default:  return "Error";
  }
}

// ==== Keyboard====
document.addEventListener("keydown", (event) => {
const key = event.key;
if (!isNaN(Key)) {
  inputDigit(key);
} else if (["+", "-", "*", "/"].includes.(key)) {
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
  
  

     
