$(document).on(() => {
    //references
    const question = document.getElementById('questionText')
    const choices = document.getElementById('choices')
    const button = document.getElementById('check')
    const output = document.getElementById('correctAnswer')

    //create class constructor for objects
    class Query {
        constructor(question, choices, correctOutput) {
            this.question = question;
            this.choices = choices;
            this.correctOutput = correctOutput;
        }
    }

    //objects created using class constuctor
    const qOne = new Query('Who led the Swedish intervention into the Thirty Years\' War?', ['Gustavus Adolphus', 'Frederick II', 'Henry VIII', 'Gustaf V'], 0)
    const qTwo = new Query('What pope initiated the First Crusade?', ['Urban V', 'Paul VI', 'Urban II', 'Pius XII'], 2)
    const qThree = new Query('Who succeeded Amenhotep III?', ['Tutankhamun', 'Ramesses II', 'Nefertiti', 'Akhenaten'], 3)
    const qFour = new Query('How recent was the LA Dogers last world series title?', [2020, 1988, 2017, 2018], 0)
    const qFive = new Query('Whats the state flower of California?', ['Sunflower', 'California Poppy', 'Cactus Flower', 'Golden Rose'], 1)
    const qSix = new Query('How many times has Los Angeles hosted the Olympic Games?', [0, 3, 1, 2], 3)

    //array to hold objects
    let objectBank = [qOne, qTwo, qThree, qFour, qFive, qSix]
    console.log(objectBank)

    //game function
    function displayRandomQuestion() {
        //randomly selects index from object bank
        const randomize = Math.floor(Math.random() * objectBank.length)
        //store object value into variable
        let storedObj = objectBank[randomize]
        //append objects question value to DOM element[h1]
        question.textContent = storedObj.question
        //on each iteration, remove ul's previous children
        $(choices).children().remove()
        //filter storedObj.choices, assign to li's.Append class name to all, & correct id to answer
        storedObj.choices.map((val, idx) => {
            let options = document.createElement('li')
            options.textContent = val
            options.className = 'liAnswer'
            if (idx === storedObj.correctOutput) {
                options.id = 'correct'
            }
            choices.append(options)
        })
        //add an event to DOM li's that checks status & gives response
        $(choices).on('click', '.liAnswer', function (e) {
            if (this.id === 'correct') {
                output.innerHTML = `<h2>congratulations! your smart.</h2>`
            } else {
                let rightOutput = storedObj.correctOutput
                let correct = storedObj.choices[rightOutput]
                output.innerHTML = `<h2>incorrect</h2><h3>the correct answer is : ${correct}</h3>`
            }
            objectBank = objectBank.filter(obj => {
                return obj.question !== storedObj.question
            })
        })
        //runs function on button click
        $(button).on('click', function () {
            //condition (if nothing is in array, display message)
            if (objectBank.length === 0) {
                question.textContent = ''
                choices.textContent = ''
                $(button).hide()
                output.innerHTML = `<h1>to play again, refresh the page.</h1>`
                return;
            }
            output.textContent = ''
            displayRandomQuestion()
        })
    }
    //call game function
    displayRandomQuestion()

})
