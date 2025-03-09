let saveEl = document.getElementById("save-el");
let resultEl = document.getElementById("result-el");
let num1El = document.getElementById("num1");
let num2El = document.getElementById("num2");

let result = 0;

const calculate = ({ operation }) => {
  const num1 = parseFloat(num1El.value) || 0;
  const num2 = parseFloat(num2El.value) || 0;

  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      result = num2 === 0 ? "Error: Divide by zero" : num1 / num2;
      break;
    default:
      result = 0;
      break;
  }
  
  resultEl.innerText = result;


  console.log(`Operation: ${operation}, Num1: ${num1}, Num2: ${num2}, Result: ${result}`);
};

const save = () => {
  if (result !== 0 && result !== "Error: Divide by zero") {
    
    let saveAs = `${result} - `;
    saveEl.innerText += saveAs; 
    console.log(`Saved: ${saveAs}`);
  } else {
    console.log("No valid result to save.");
  }

  
  result = 0;
  resultEl.innerText = result;
  num1El.value = "";
  num2El.value = "";
};
