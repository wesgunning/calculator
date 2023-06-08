// Global variables
let firstNumber;
let operator;
let secondNumber;
let sum;
let difference;
let product;
let dividend;
let answer;
let keyCount;
let storedSecondNumber;

// Display
const display = document.querySelector('#display');
display.textContent = "0";
const displayWrap = document.querySelector('#displayWrap');

// Number buttons
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', changeDisplay);
    button.addEventListener('mousedown', keypress);
});

// Keypress events
window.addEventListener('keydown', function(e) {
        if (e.key == 'Backspace' || e.key == '^') {
            changeDisplay(e.key);
        }
        buttons.forEach((button) => {
            if (button.value == e.key) {
                keypress(button);
                changeDisplay(button);
            }
            else if (button.value == '=' && e.key == 'Enter'){
                keypress(button);
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
    if (num2 == 0) {
        alert("Oops! \nLooks like you tried to break reality & divide by zero. \nUnless you're an evil villain bent on universal destruction, please try again!");
        dividend = num1;
        return dividend;
    }
    else {
        dividend = num1 / num2;
        return dividend;
    }
}

// Exponent
function exponent(num1, num2) {
    answer = num1 ** num2;
    return answer;
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
    else if (operator == "^") {
        exponent(firstNumber, secondNumber);
        return answer;
    }
}
// Keypress visual
function keypress(e) {
    let mouseDownColor = 'white';
    let mouseUpColor = 'rgb(99, 98, 98)';
    if (e.type == 'mousedown') {
        e.target.style.backgroundColor = mouseDownColor;
        e.target.addEventListener('mouseup', () => {
        e.target.style.backgroundColor = mouseUpColor;
        })
    }
    else {
        e.style.backgroundColor = mouseDownColor;
        setTimeout(() => {
        e.style.backgroundColor = mouseUpColor;
        }, 100)
    }
}

// Change display
function changeDisplay(e) {
    if (e == 'Backspace') {
        if (keyCount == 0) {
            return;
        }
        else if (display.textContent != '0') {
            let current = display.textContent;
            if (current.length == 1) {
                display.textContent = '0';
            }
            else {
                display.textContent = current.substr(0, current.length - 1);
            }
        }
        else {
            return;
        }
    }
    else if (e == '^') {
        if (firstNumber == null) {
            firstNumber = parseFloat(display.textContent);
            operator = e;
            keyCount = 0;
            return;
        }
        // Allows new operator key input without storing secondNumber or calling operate()
        else if (secondNumber == null && keyCount == 0) {
            operator = e;
            storedSecondNumber = null;
            return;
        }
        else if (secondNumber == null) {
            secondNumber = parseFloat(display.textContent);
            display.textContent = (operate(operator, firstNumber, secondNumber));
            if (display.scrollWidth >= displayWrap.scrollWidth) {
                makeScientific();
            }
            // Reset
            firstNumber = parseFloat(display.textContent);
            storedSecondNumber = secondNumber;
            secondNumber = null;
            operator = e;
            keyCount = 0;
        }
    }
    else if (e.value != undefined && this.value != e.value) {
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
        fontEnlarge();
    }
    else if (this.value == '%') {
        operator = '/';
        firstNumber = parseFloat(display.textContent);
        secondNumber = 100;
        display.textContent = (operate(operator,firstNumber,secondNumber));
        if (display.scrollWidth >= displayWrap.scrollWidth) {
            makeScientific();
        }
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
        if (display.textContent.length > 15) {
            makeScientific();
        }
        while (display.scrollWidth >= displayWrap.scrollWidth) {
            fontShrink();
        }
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
            if (display.scrollWidth >= displayWrap.scrollWidth) {
                fontShrink();
            }
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
        keyCount += 1;
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
        fontEnlarge();
        display.textContent += this.value.toString();
        keyCount += 1;
    }
    else {
        display.textContent += this.value.toString();
        keyCount += 1;
        if (display.scrollWidth >= displayWrap.scrollWidth) {
            fontShrink();
        }
    }
}
function fontEnlarge() {
    display.style.fontSize = '4em';
}
function makeScientific() {
    display.textContent = parseFloat(display.textContent).toExponential(4);
    fontEnlarge();
}
function fontShrink() {
    if (display.style.fontSize == '') {
        fontEnlarge();
    }
    let fontSize = display.style.fontSize;
    let currentSize = fontSize.substr(0,fontSize.length-2);
    let newSize = (currentSize * 0.9) + 'em';
    display.style.fontSize = newSize;
}