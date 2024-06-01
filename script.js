function operate(a, operator, b) {
  switch(operator) {
    case "+":
      return a + b;
      break;
    case "-":
      return a - b;
      break;
    case "*":
      return a * b;
      break;
    case "/":
      return a / b;
      break;
  }
}

const displayValue = document.querySelector("#calculator-screen");

buttonsNodelist = document.querySelectorAll(".calculator-box button");

let buttons = {};

const operatorBtns = ["/","*","+","-","."];

for (let i = 0; i < buttonsNodelist.length; i++){
  btnKey = buttonsNodelist[i].textContent; //current button key
  buttons[btnKey] = buttonsNodelist[i]; //adds button objects to buttons object
  if(["=", "Clear", "Delete"].includes(btnKey) == false) {
    if (operatorBtns.includes(btnKey)) { //event listener for operator buttons
      buttons[btnKey].onclick = (e) => {

        let lastChar = displayValue.textContent.slice(-1);
        let secondLastChar = displayValue.textContent.slice(-2)[0];
        let btnValue = e.target.textContent;

        //add new character if last character is a number OR last character is '-' and: last two characters aren't an operator and a '-', last character isn't a '.', displayValue isn't empty
        if((lastChar >= '0' && lastChar <= '9') || (btnValue == "-" && (operatorBtns.includes(secondLastChar) && lastChar == '-') == false && ['.'].includes(lastChar) == false)){
          displayValue.textContent += btnValue;
        }
        //replace last character if displayValue isn't empty and last two characters aren't an operator and a '-'
        else if(lastChar != '' && (operatorBtns.includes(secondLastChar) && lastChar == '-') == false){
          displayValue.textContent = displayValue.textContent.replace(/.$/, btnValue);
        }
        //otherwise do nothing
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

buttons["Clear"].onclick = () => {
  displayValue.textContent = '';
}

buttons["Delete"].onclick = () => {
  displayValue.textContent = displayValue.textContent.slice(0, -1);
}

let opOrder = [/[*/]/, /[+-]/];

buttons["="].onclick = () => {
  for(let i = 0; i < opOrder.length; i++) {
    while(displayValue.textContent.slice(1).search(opOrder[i]) != -1){
      if(displayValue.textContent[0] == '-'){
        operatorIndex = displayValue.textContent.slice(1).search(opOrder[i]) + 1;
      }
      else {
        operatorIndex = displayValue.textContent.search(opOrder[i]);
      }

      let startIndex = 0;
      for(let i = operatorIndex - 1; (/[*/+-]/.test(displayValue.textContent[i]) == false && i >= 0) || (displayValue.textContent[i] == '-' && i == 0); i--){
        startIndex = i;
      }

      let endIndex = 0;
      for(let i = operatorIndex + 1; (/[*/+-]/.test(displayValue.textContent[i]) == false && i < displayValue.textContent.length) || (displayValue.textContent[i] == '-' && i == operatorIndex+1); i++){
        endIndex = i;
      }

      let result = operate(Number(displayValue.textContent.substring(startIndex,operatorIndex)), displayValue.textContent[operatorIndex], Number(displayValue.textContent.substring(operatorIndex+1, endIndex + 1)));
      if(result % 1 != 0){
        result = result.toFixed(4);
      }
      displayValue.textContent = displayValue.textContent.substring(0, startIndex) + result + displayValue.textContent.substring(endIndex+1, displayValue.textContent.length)
    }
  }
}
