class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete(){

    }

    appendNumber(number){
        if( number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperations(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation; 
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''
    }

    compute(){

    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
    }

}



const numbersBtn = document.querySelectorAll('[data-number]');
const operationsBtn = document.querySelectorAll('[data-operations]');
const allClearBtn = document.querySelector('[data-all-clear]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const keys = {
    '0' : () => calculator.appendNumber('0'),
    '1' : () => calculator.appendNumber('1'),
    '2' : () => calculator.appendNumber('2'),
    '3' : () => calculator.appendNumber('3'),
    '4' : () => calculator.appendNumber('4'),
    '5' : () => calculator.appendNumber('5'),
    '6' : () => calculator.appendNumber('6'),
    '7' : () => calculator.appendNumber('7'),
    '8' : () => calculator.appendNumber('8'),
    '9' : () => calculator.appendNumber('9'),
    '0' : () => calculator.appendNumber('0'),
    '.' : () => calculator.chooseOperations('.'),
    '+' : () => calculator.chooseOperations('+'),
    '-' : () => calculator.chooseOperations('-'),
    '/' : () => calculator.chooseOperations('÷'),
    '*' : () => calculator.chooseOperations('×'),
    "Enter" : () => calculator.compute(),
    "Backspace" : () => calculator.delete(),

}


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numbersBtn.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})


operationsBtn.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperations(button.innerText);
        calculator.updateDisplay();
    })
})


allClearBtn.addEventListener('click' , ()=>{
    calculator.clear();
})


document.addEventListener('keyup', (e) => {
    const key = e.key;
    const button = keys[key];

    if (button) {
        button();
        calculator.updateDisplay();
    }
})
