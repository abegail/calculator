const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

const expression = [];
let valueHolder = '';

window.addEventListener('keydown', checkKey);

function checkKey(e) {
    console.log(e);
    switch (e.key) {
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
        case '.':
            processOperand(e.key);
            break;
        case '+':
        case '-':
        case '*':
            processOperator(e.key);
            break;
        case '/':
            processOperator(e.key);
            break;
        case 'Enter':
            e.preventDefault();
        case '=':
            calculate();
            break;
        case 'Backspace':
            remove();
            break;
        case 'Escape':
            clear();
            break;
    }
    console.log(expression);
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.value);

        switch (button.classList.value) {
            case 'digit':
                processOperand(button.value);
                break;
            case 'operator':
                processOperator(button.value);
                break;
            case 'equals':
                calculate();
                break;
            case 'clear':
                clear();
                break;
            case 'remove':
                remove();
                break;
        }
    });
}); 

function remove() {
    const newValue = valueHolder.slice(0, valueHolder.length-1);
    valueHolder = newValue;
    updateDisplay(false);
}

function processOperator(operator) {
    switch(expression.length) {
        case 0:
            if(valueHolder === '') {
                expression.push(0);
                expression.push(operator);
            } else {
                expression.push(parseFloat(valueHolder));
                valueHolder = '';
                expression.push(operator);
            }
            break;
        case 1:
            expression.push(operator);
            break;
        case 2:
            if (valueHolder === '') {
                expression[1] = operator;
            } else {
                expression.push(parseFloat(valueHolder));
                valueHolder = '';
                let result = operate();
                if (result == Infinity || NaN) {
                    clear();
                    display.textContent = 'Yo mama';
                } else {
                    expression.push(result);
                    updateDisplay(true);
                    expression.push(operator);
                }
            }
    }
}

function calculate() {
    switch (expression.length) {
        case 0:
            if (valueHolder !== ''){
                expression.push(parseFloat(valueHolder));
                valueHolder = '';
                updateDisplay(true);
            }
            break;
        case 1:
            updateDisplay(true);
            break;
        case 2:
            if (valueHolder === ''){
                let result = expression.shift();
                let operator = expression.shift();
                switch (operator) {
                    case '+':
                        expression.push(result += result);
                        updateDisplay(true);
                        break;
                    case '-':
                        expression.push(result -= result);
                        updateDisplay(true);
                        break;
                    case '*':
                        expression.push(result *= result);
                        updateDisplay(true);
                        break;
                    case '/':
                        expression.push(result /= result);
                        updateDisplay(true);
                        break;
                 }
            } else {
                expression.push(parseFloat(valueHolder));
                valueHolder = '';
                let result = operate();
                if (result == Infinity || NaN) {
                    clear();
                    display.textContent = 'Yo mama';
                } else {
                    expression.push(result);
                    updateDisplay(true);
                }
            }    
    }
}

function processOperand(digit) {
    if (expression.length === 1) expression.length = 0;
    valueHolder += digit;

    updateDisplay(false);
}

function clear() {
    expression.length = 0;
    display.textContent = 0;
    valueHolder = ''
}

function updateDisplay(isResult) {
    if (isResult) display.textContent = Math.round(expression[0] * 100) / 100;
    else display.textContent = valueHolder;
}

function operate() {
    let result;
    let firstOperand = expression.shift();
    let operator = expression.shift()
    let secondOperand = expression.shift()
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

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;