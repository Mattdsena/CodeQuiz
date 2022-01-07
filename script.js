const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElements = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionsIndex

startButton.addEventListener('click', startGame)

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


function selectAnswer() {

}

const questions = [
    {
        question: "What should I call my HTML file?",
        answers: [
            { text: 'Index', correct: true},
            { text: 'Script', correct:false}
        ]
    }
]