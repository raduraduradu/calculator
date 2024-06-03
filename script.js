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

const operatorTypingRules = function(btnValue){

  let lastChar = displayValue.textContent.slice(-1);
  let secondLastChar = displayValue.textContent.slice(-2)[0];

  let onDecimal = function(){
    for(let i = displayValue.textContent.length-1; i > 0; i--){
      if(displayValue.textContent[i] == '.'){
        return true;
      }
      else if(operatorBtns.includes(displayValue.textContent[i])){
        return false;
      }
    }
    return false;
  }
  if((onDecimal() && btnValue == '.') == false &&
    (operatorBtns.includes(secondLastChar) && lastChar == '-') == false &&
    lastChar != ''){
      if (lastChar >= '0' && lastChar <= '9' || btnValue == '-'){
        return "add";
      }
      else {
        return "replace";
      }
  }
}

//convert buttonsNodelist to buttons object for more convenient access(buttonsNodelist(3) = buttons["/"])
//and adds event listener for number and operator buttons
for (let i = 0; i < buttonsNodelist.length; i++){

  btnKey = buttonsNodelist[i].textContent; //current button key
  buttons[btnKey] = buttonsNodelist[i]; //adds button objects to buttons object

  if(["=", "Clear", "Delete"].includes(btnKey) == false) {
    if (operatorBtns.includes(btnKey)) { //event listener for operator buttons
      buttons[btnKey].onclick = (e) => {
        
        let btnValue = e.target.textContent;

        if(operatorTypingRules(btnValue) == "add"){
          displayValue.textContent += btnValue;
        }
        else if(operatorTypingRules(btnValue) == "replace"){
          displayValue.textContent = displayValue.textContent.replace(/.$/, btnValue);
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

buttons["Clear"].onclick = () => {
  displayValue.textContent = '';
}

buttons["Delete"].onclick = () => {
  displayValue.textContent = displayValue.textContent.slice(0, -1);
}

let opOrder = [/[*/]/, /[+-]/]; //(order of operation)

buttons["="].onclick = () => {
  let equ = displayValue.textContent //equation

  if (operatorBtns.includes(equ.slice(-1)) == false){ //only perform calculation if last character isn't an operator
    for(let i = 0; i < opOrder.length; i++) { //does all multiplication and division first then does the adding and subtracting
      while(equ.slice(1).search(opOrder[i]) != -1){ //calculate while there are still operators, doesn't take into account first character so it doesn't break when first number is negative
        if(equ[0] == '-'){
          operatorIndex = equ.slice(1).search(opOrder[i]) + 1;
        } //if equation starts with a negative number ignore the first minus as an operator
        else {
          operatorIndex = equ.search(opOrder[i]);
        }

        let startIndex = 0;
        for(let i = operatorIndex - 1; (/[*/+-]/.test(equ[i]) == false && i >= 0) || (equ[i] == '-' && i == 0); i--){
          startIndex = i;
        } //get index for first char of the operation

        let endIndex = 0;
        for(let i = operatorIndex + 1; (/[*/+-]/.test(equ[i]) == false && i < equ.length) || (equ[i] == '-' && i == operatorIndex+1); i++){
          endIndex = i;
        }

        let result = operate(Number(equ.substring(startIndex,operatorIndex)), equ[operatorIndex], Number(equ.substring(operatorIndex+1, endIndex + 1))); 
        result = Math.round(result * 10000) / 10000;
        equ = equ.substring(0, startIndex) + result + equ.substring(endIndex+1, equ.length) // replace operation with result
      }
    }
  }
  displayValue.textContent = equ;
}
