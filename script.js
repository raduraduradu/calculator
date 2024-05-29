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
for (let i = 0; i < buttonsNodelist.length; i++){
  buttons[buttonsNodelist[i].textContent] = buttonsNodelist[i];
  if (["=","Clear","Delete"].includes(buttonsNodelist[i].textContent) == false) {
    operatorBtns = ["/","x","+","-","."];
    if(operatorBtns.includes(buttonsNodelist[i].textContent)){
      buttons[buttonsNodelist[i].textContent].onclick = (e) => {
        console.log(displayValue.textContent.slice(-1), e.target.textContent)
        if(!(displayValue.textContent.slice(-1) == "-" && e.target.textContent == "-")){
          if(operatorBtns.includes(displayValue.textContent.slice(-1)) && (e.target.textContent != "-" /*&& displayValue.textContent.slice(-1) == "-"*/)){ // these combos should work: /-, --, *-
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
  }
}
delete buttonsNodelist;
