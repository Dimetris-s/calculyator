const displayAction = document.querySelector('.display-action')                 //!Место для оператора на дисплее
const displayValue = document.querySelector('.display-number')                  //!Место для чисел на дисплее       
const pmButton = document.querySelector('.button-plusminus')                    //!Кнопка равно
const totalButton = document.querySelector('.button-total')  
const sqrtButton =  document.querySelector('.button-sqrt')
const dotButton = document.querySelector('.button-dot')                  

const keys = document.querySelectorAll('.key')                                  //!Кнопки с цифрами
const actions = document.querySelectorAll('.action')                            //!Кнопки операторов

let terms = []

for(let key of keys) {
    key.addEventListener('click', function() {                                                                  //!Отвечает за вывод чисел на дисплей
        if(displayValue.textContent.length > 8) {
            displayValue.textContent = 'Error'
        } else {
            if(displayValue.textContent != '0' && displayValue.textContent != 'Error' && displayValue.textContent != 'Infinity' && displayValue.textContent != 'NaN') {
                displayValue.textContent += key.textContent 
               } else {
                displayValue.textContent = key.textContent 
               }
               
            }
        }
       )
}


for(let action of actions) {                                                    //!Изменение оператора на дисплее и добавление слагаемого в массив
    action.addEventListener('click', function() {
        terms.push(Number(displayValue.textContent)) 
        displayValue.textContent = '0'
        displayAction.textContent = action.textContent
        
    })
}

dotButton.onclick = function() {
    if(displayValue.textContent.indexOf('.') == -1) {
        displayValue.textContent += '.'
    }
}

pmButton.onclick = function() {
    displayValue.textContent = Number(displayValue.textContent) * -1
}

sqrtButton.onclick = function() {
    let result = Math.sqrt(Number(displayValue.textContent))
    if(result % Math.trunc(result) !== 0) {
        displayValue.textContent = result.toFixed(2) 
    } else {
        displayValue.textContent = result
    }
    
}

function degree(numbers) {
    let result = numbers[0]
    for(let i = 1; i < numbers.length; i++) {
        result **= numbers[i]
    }
    return result
}

function division(numbers) {                                                    //!Деление
    let result = numbers[0]
    for(let i = 1; i < numbers.length; i++) {
        result /= numbers[i]
    }
    if(result % Math.trunc(result) !== 0) {
        return result.toFixed(2)
    } else {
        return result
    }
    
}

function multiplication(numbers) {                                               //!Умножение
    let result = 1
    for(let i = 0; i < numbers.length; i++) {
        result *= numbers[i]
    }
    return result
}

function sum(numbers) {                                                         //!Сумма
    let result = 0
    for(let i = 0; i < numbers.length; i++) {
        result += numbers[i]
    }
    return result
}

function subtraction(numbers) {                                                 //!Вычитание
    let result = numbers[0]
    for(let i = 1; i < numbers.length; i++) {
        result -= numbers[i]
    }
    return result
}

totalButton.onclick = function() {                                                    //! Обработка нажатия кнопки равно
    terms.push(Number(displayValue.textContent))
    let result = 0

    if(displayAction.textContent == '+') {                                              //! Фильтр выбора нужного оператора
        result = sum(terms)
    } else if(displayAction.textContent == '-') {
        result = subtraction(terms)
    } else if(displayAction.textContent == '*') {
        result = multiplication(terms)
    } else if(displayAction.textContent == '/') {
        result = division(terms)
    } else if(displayAction.textContent == '^'){
        result = degree(terms)
    } else if(displayAction.textContent == '=') {
        result = displayValue.textContent
    }
    
    displayValue.textContent = result
    if(displayValue.textContent.length > 9) {
        displayValue.textContent = 'Error'
    }
    displayAction.textContent = '='
    terms = []
}



//? Нет возможности комбинировать операторы
