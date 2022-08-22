const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

const expression = [];
let valueHolder = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        switch (button.classList.value) {
            case 'digit':
                processOperand(button.attributes.id.nodeValue);
                break;
            case 'operator':
                processOperator(button.attributes.id.nodeValue);
                break;
            case 'equals':
                calculate();
                break;
            case 'clear':
                clear();
                break;
        }
    });
});

function processOperator(operator) {
    switch(expression.length) {
        case 0:
            if(valueHolder === '') {
                expression.push(0);
                expression.push(operator);
            } else {
                expression.push(parseInt(valueHolder));
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
                expression.push(parseInt(valueHolder));
                valueHolder = '';
                let result = operate();
                if (result == Infinity) {
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
                expression.push(parseInt(valueHolder));
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
                expression.push(parseInt(valueHolder));
                valueHolder = '';
                let result = operate();
                if (result == Infinity) {
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
    if (isResult) display.textContent = expression[0];
    else display.textContent = parseInt(valueHolder);
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