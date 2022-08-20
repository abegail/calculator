const display = document.querySelector("#display");
const zero = document.querySelector("#zero");
/*
const one = document.querySelector("#1");
const two = document.querySelector("#2");
const three = document.querySelector("#3");
const four = document.querySelector("#4");
const five = document.querySelector("#5");
const six = document.querySelector("#6");
const seven = document.querySelector("#7");
const eight = document.querySelector("#8");
const nine = document.querySelector("#9");
*/

const digits = document.querySelectorAll(".digit");
console.log(digits);

digits.forEach(digit => {
    digit.addEventListener('click', (digit) => storeValue(digit));
    console.log(digit.attributes.id.nodeValue);
});

function storeValue(digit) {
    display.textContent = digit.attributes.id.nodeValue;
}

function showValue() {

}



const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, firstOperand, secondOperand) {
    console.log(operator);
    let result;
    switch (operator) {
        case '+':
            result = add(firstOperand, secondOperand);
            break;
        case '-':
            result = subtract(firstOperand, secondOperand);
            break;
        case '*':
            result = multiply(firstOperand, secondOperand);
            break;
        case '/':
            result = divide(firstOperand, secondOperand);
            break;
    }
    return result;
}