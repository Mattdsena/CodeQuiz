const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElements = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionsIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionsIndex++
    setNextQuestion()
})

function startGame () {
startButton.classList.add('hide')
shuffledQuestions = questions.sort(() => Math.random() - .5)
currentQuestionsIndex = 0
questionContainerElement.classList.remove('hide')
setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionsIndex])

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElements.appendChild(button)
    })
}

function resetState() {

    nextButton.classList.add('hide')
    while (answerButtonsElements.firstChild) {
        answerButtonsElements.removeChild
        (answerButtonsElements.firstChild)
    }
}


function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElements.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionsIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: "What should I call my HTML file?",
        answers: [
            { text: 'Index', correct: true},
            { text: 'Script', correct:false},
            { text: 'Script', correct:false},
            { text: 'Script', correct:false}
        ]
    },
    {
        question: "What  I call my HTML file?",
        answers: [
            { text: 'Index', correct: true},
            { text: 'Script', correct:false},
            { text: 'Script', correct:false},
            { text: 'Script', correct:false}
        ]
    },
    {
        question: "What shoulll my HTML file?",
        answers: [
            { text: 'Index', correct: true},
            { text: 'Script', correct:false},
            { text: 'Script', correct:false},
            { text: 'Script', correct:false}
        ]
    },
    {
        question: " should I call my HTML file?",
        answers: [
            { text: 'Index', correct: true},
            { text: 'Script', correct:false},
            { text: 'Script', correct:false},
            { text: 'Script', correct:false}
        ]
    },
    {
        question: "What should I call my file?",
        answers: [
            { text: 'Index', correct: true},
            { text: 'Script', correct:false},
            { text: 'Script', correct:false},
            { text: 'Script', correct:false}
        ]
    },
    {
        question: "What shoull my HTML file?",
        answers: [
            { text: 'Index', correct: true},
            { text: 'Script', correct:false},
            { text: 'Script', correct:false},
            { text: 'Script', correct:false}
        ]
    }
]