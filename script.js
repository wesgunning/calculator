// Global variables
let firstNumber;
let operator;
let secondNumber;
let sum;
let difference;
let product;
let dividend;
let keyCount;
let storedSecondNumber;

// Display
const display = document.querySelector('#display');
display.textContent = "0";

// Number buttons
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', changeDisplay);
    button.addEventListener('mousedown', keypress);
    /*button.addEventListener('mouseup', () => {
        button.style.backgroundColor = 'rgb(99, 98, 98)';
    })*/
});

// Keypress events
window.addEventListener('keydown', function(e) {
        buttons.forEach((button) => {
            if (button.value == e.key) {
                console.log(button.value);
                changeDisplay(button);
            }
            else if (button.value == '=' && e.key == 'Enter'){
                changeDisplay(button);
            }
    });
});

// Basic Operator Functions

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
// Keypress visual
function keypress(e) {
    e.target.style.backgroundColor = 'white';
    e.target.addEventListener('mouseup', () => {
        e.target.style.backgroundColor = 'rgb(99, 98, 98)';
    })
}

// Change display
function changeDisplay(e) {
    if (e.value != undefined && this.value != e.value) {
        this.value = e.value;
        this.classList = e.classList;
        changeDisplay(e);
    }
    else if(this.value == 'clear') {
        display.textContent = '0';
        firstNumber = null;
        secondNumber = null;
        storedSecondNumber = null;
        keyCount = 0;
    }
    else if (this.value == '%') {
        operator = '/';
        firstNumber = parseFloat(display.textContent);
        secondNumber = 100;
        display.textContent = (operate(operator,firstNumber,secondNumber));
        // Reset
        firstNumber = parseFloat(display.textContent);
        secondNumber = null;
        keyCount = 0;
    }
    else if (this.value == '+/-') {
        display.textContent *= -1;
        firstNumber = parseFloat(display.textContent);
        secondNumber = null;
        keyCount = 0;
    }
    else if (this.value == '=') {
        if (storedSecondNumber == null && keyCount == 0) {
            storedSecondNumber = parseFloat(display.textContent);
            secondNumber = storedSecondNumber;
        }
        else if (keyCount > 0) {
            secondNumber = parseFloat(display.textContent);
        }
        else {
            secondNumber = storedSecondNumber;
        }
        display.textContent = (operate(operator, firstNumber, secondNumber));
        firstNumber = parseFloat(display.textContent);
        storedSecondNumber = secondNumber;
        secondNumber = null;
        keyCount = 0;
    }
    else if (this.classList.contains('operator')) {
        if (firstNumber == null) {
            firstNumber = parseFloat(display.textContent);
            operator = this.value;
            keyCount = 0;
            return;
        }
        // Allows new operator key input without storing secondNumber or calling operate()
        else if (secondNumber == null && keyCount == 0) {
            operator = this.value;
            storedSecondNumber = null;
            return;
        }
        else if (secondNumber == null) {
            secondNumber = parseFloat(display.textContent);
            display.textContent = (operate(operator, firstNumber, secondNumber));
            // Reset
            firstNumber = parseFloat(display.textContent);
            storedSecondNumber = secondNumber;
            secondNumber = null;
            operator = this.value;
            keyCount = 0;
        }
    }
    else if (display.textContent == '0' && this.value != '.') {
        display.textContent = this.value;
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
        if (firstNumber != null) {
            display.textContent = '0.';
            keyCount += 1;
        }
    }
    // Removes firstNumber from display and allows input of secondNumber
    else if (firstNumber != null && keyCount == 0) {
        display.textContent = '';
        display.textContent += this.value.toString();
        keyCount += 1;
    }
    else {
        display.textContent += this.value.toString();
        keyCount += 1;
    }
}