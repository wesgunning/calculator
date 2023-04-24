let total = 0;
let firstNumber;
let operator;
let secondNumber;

// Basic Functions

// Add
function add(num1, num2) {
    let sum = num1 + num2;
    return sum;
}

// Subtract
function subtract(num1, num2) {
    let difference = num1 - num2;
    return difference;
}

// Multiply
function multiply(num1, num2) {
    let product = num1 * num2;
    return product;
}

// Divide
function divide(num1, num2) {
    let dividend = num1 / num2;
    return dividend;
}

// Operate
function operate(operator, firstNumber, secondNumber) {
    if (operator == "+") {
        add(firstNumber, secondNumber);
    }
    else if (operate == "-") {
        subtract(firstNumber, secondNumber);
    }
    else if (operater == "*") {
        multiply(firstNumber, secondNumber);
    }
    else if (operator == "/") {
        divide(firstNumber, secondNumber);
        
    }
}