//Defining Calculator class
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
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
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
        let computeResult 
        let prev = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+' :
                computeResult = prev + current
                break
            case '-' :
                computeResult = prev - current
                break
            case '×' :
                computeResult = prev * current
                break
            case '÷' :
                computeResult = prev / current
                break
            default:
                return  
        }
        this.currentOperand = computeResult;
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
       if(isNaN(integerDigits)){
        integerDisplay = ''
       }else{
        integerDisplay =  integerDigits.toLocaleString('en', {
            maximumFractionDigits : 0 })
       } 

       if(decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`;
       } else {
        return integerDisplay;
       }
    }


    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOpefrand)}${this.operation}` 
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}


//Mapping all the HTML tags
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
    '.' : () => calculator.chooseOperations('.'),
    '+' : () => calculator.chooseOperations('+'),
    '-' : () => calculator.chooseOperations('-'),
    '/' : () => calculator.chooseOperations('÷'),
    '*' : () => calculator.chooseOperations('×'),
    "Enter" : () => calculator.compute(),
    "Backspace" : () => calculator.delete(),
}


//Creating Calculator Object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);


//Any numbers button 
numbersBtn.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

//Any Operations button
operationsBtn.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperations(button.innerText);
        calculator.updateDisplay();
    })
})

//AC button
allClearBtn.addEventListener('click' , ()=>{
    calculator.clear();
    calculator.updateDisplay();
})


//Delete button
deleteBtn.addEventListener('click' , (button)=> {
    calculator.delete();
    calculator.updateDisplay();
})

//euqals button
equalsBtn.addEventListener('click' , ()=> {
    calculator.compute();
    calculator.updateDisplay();
})



document.addEventListener('keyup', (e) => {
    const button = keys[e.key];

    if (button) {
        button();
        calculator.updateDisplay();
    }
})
