const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = document.getElementById('display');

keys.addEventListener('click', (event) => {
    if (event.target.matches('button')) {
        const key = event.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.value;

        Array.from(keys.children).forEach(k => k.classList.remove('is-depressed'));

        if (!action) {
            if (displayedNum === '0' || calculator.dataset.previousKeyType === 'operator' || calculator.dataset.previousKeyType === 'calculate') {
                display.value = keyContent;
            } else {
                display.value = displayedNum + keyContent;
            }
        }

        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
        }

        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.value = displayedNum + '.';
            } else if (calculator.dataset.previousKeyType === 'operator' || calculator.dataset.previousKeyType === 'calculate') {
                display.value = '0.';
            }
        }

        if (action === 'clear') {
            display.value = '0';
            delete calculator.dataset.firstValue;
            delete calculator.dataset.operator;
            delete calculator.dataset.previousKeyType;
        }

        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            if (firstValue && operator) {
                display.value = calculate(firstValue, operator, secondValue);
            }

            calculator.dataset.previousKeyType = 'calculate';
        }
    }
});

function calculate(first, operator, second) {
    first = parseFloat(first);
    second = parseFloat(second);

    switch (operator) {
        case 'add':
            return (first + second).toString();
        case 'subtract':
            return (first - second).toString();
        case 'multiply':
            return (first * second).toString();
        case 'divide':
            if (second === 0) {
                alert("Error: Division by zero");
                return '0';
            }
            return (first / second).toString();
    }
}