let total = 0;
let firstNumber;
let operator;
let secondNumber;
let sum;
let difference;
let product;
let dividend;

// Display
const display = document.querySelector('#display');
display.textContent = "0";

// Number buttons
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', changeDisplay);
    button.addEventListener('mousedown', () => {
        button.style.backgroundColor = 'white';
    })
    button.addEventListener('mouseup', () => {
        button.style.backgroundColor = 'rgb(99, 98, 98)';
    })
});

// Basic Functions

// Add
function add(num1, num2) {
    sum = num1 + num2;
    return sum;
}

// Subtract
function subtract(num1, num2) {
    difference = num1 - num2;
    return difference;
}

// Multiply
function multiply(num1, num2) {
    product = num1 * num2;
    return product;
}

// Divide
function divide(num1, num2) {
    dividend = num1 / num2;
    return dividend;
}

// Operate
function operate(operator, firstNumber, secondNumber) {
    if (operator == "+") {
        add(firstNumber, secondNumber);
        return sum;
    }
    else if (operator == "-") {
        subtract(firstNumber, secondNumber);
        return difference;
    }
    else if (operator == "*") {
        multiply(firstNumber, secondNumber);
        return product;
    }
    else if (operator == "/") {
        divide(firstNumber, secondNumber);
        return dividend;   
    }
}

// Change display
function changeDisplay(e) {
    if(this.value == 'clear') {
        display.textContent = '0';
    }
    else if (this.value == '.') {
        let count = 0;
        for (let i=0; i < display.textContent.length; i++) {
            if (display.textContent[i] == '.') {
                count += 1;
            }
        }
        if (count == 0) {
            display.textContent += this.value;
        }
    }
    else if (this.classList.contains('operator')) {
        display.textContent = 'true';
    }
    else if (display.textContent == '0' && this.value != '.') {
        display.textContent = this.value;
    }
    else {
        display.textContent += this.value.toString();
    }
}