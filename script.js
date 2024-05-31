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
  if(b != 0){
    return a / b;
  }
  else {
    return "cannot divide by zero";
  };
}

function operate(a, operator, b) {
  switch(operator) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "*":
      return multiply(a, b);
      break;
    case "/":
      return divide(a, b);
      break;
  }
}

const displayValue = document.querySelector("#calculator-screen");

buttonsNodelist = document.querySelectorAll(".calculator-box button");

let buttons = {};

let isReplaceable = true; //when false it means that the last character was a minus that can't be replaced with another operator

const operatorBtns = ["/","x","+","-","."];

for (let i = 0; i < buttonsNodelist.length; i++){
  btnKey = buttonsNodelist[i].textContent; //current button key
  buttons[btnKey] = buttonsNodelist[i]; //adds button objects to buttons object

  /*if (["=","Clear","Delete"].includes(buttonsNodelist[i].textContent) == false) {
    if(operatorBtns.includes(buttonsNodelist[i].textContent)){
      buttons[buttonsNodelist[i].textContent].onclick = (e) => {
        console.log(displayValue.textContent.slice(-1), e.target.textContent)
        if(!(displayValue.textContent.slice(-1) == "-" && e.target.textContent == "-")){
          if(operatorBtns.includes(displayValue.textContent.slice(-1)) && (e.target.textContent != "-")){
            displayValue.textContent = displayValue.textContent.replace(/.$/, e.target.textContent);
          }
          else {
            displayValue.textContent += e.target.textContent;
          }
        }
      }
    }
    else {
      buttons[buttonsNodelist[i].textContent].onclick = (e) => {
        displayValue.textContent += e.target.textContent;
      }
    }
  }*/

  if(["=", "Clear", "Delete"].includes(btnKey) == false) {
    if (operatorBtns.includes(btnKey)) { //event listener for operator buttons
      buttons[btnKey].onclick = (e) => {
        if((displayValue.textContent.slice(-1) >= '0' && displayValue.textContent.slice(-1) <= '9')
          || (e.target.textContent == "-"
            && (operatorBtns.includes(displayValue.textContent.slice(-2)[0]) && displayValue.textContent.slice(-1) == '-') == false
            && displayValue.textContent.slice(-1) != ' ')){
          displayValue.textContent += e.target.textContent;
        }
        else if(displayValue.textContent.slice(-1) != ' '
          && operatorBtns.includes(displayValue.textContent.slice(-2)[0]) == false
          && displayValue.textContent.slice(-1) != '-'){
          displayValue.textContent = displayValue.textContent.replace(/.$/, e.target.textContent);
        }
      };
    }
    else { //event listener for number buttons
      buttons[btnKey].onclick = (e) => {
        displayValue.textContent += e.target.textContent;
      }
    }
  }
}
delete buttonsNodelist;
