const display = document.querySelector("#display");
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

const digits = document.querySelectorAll("button");
console.log(digits);

digits.forEach(digit => {
    digit.addEventListener('click', () => {
        helper(digit);
    });
//    console.log(digit.attributes.id.nodeValue);
});

let valueContainer = ''
let firstOperand;
let secondOperand;
let operator;

function helper(digit){

    let value = digit.attributes.id.nodeValue;
    switch(value) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            valueContainer += value;
            display.textContent = valueContainer;
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            firstOperand = valueContainer;
            valueContainer = '';
            operator = value;
            break;
        case 'equals':
            secondOperand = valueContainer;
            valueContainer = '';
            display.textContent = operate(operator, parseInt(firstOperand), parseInt(secondOperand));
            console.log(operate(operator, parseInt(firstOperand), parseInt(secondOperand)));
            break;
        case 'clear':
            display.textContent = '0';
            valueContainer = '';
            firstOperand = '';
            secondOperand = '';
            operator = '';
    }

    console.log(digit.attributes.id.nodeValue);
}

function storeValue(digit) {
    let value = digit.attributes.id.nodeValue;
    console.log(value);
}

function showValue(digit) {
    display.textContent = digit.attributes.id.nodeValue;
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