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