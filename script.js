// Elements
const welcomeEl = document.querySelector("#welcome");
const startQuizBtnEl = document.querySelector("#startQuiz");
const quizEl = document.querySelector("#quiz");
const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");
const inputScoreEl = document.querySelector("#inputScore");
const initialsEl = document.querySelector("#initials");
const submitInitialsBtnEl = document.querySelector("#submitInitials");
const userScoreEl = document.querySelector("#score");
const highScoresEl = document.querySelector("#highScores");
const scoresEl = document.querySelector("#scores");
const goBackBtnEl = document.querySelector("#goBack");
const clearScoresBtnEl = document.querySelector("#clearScores");
const viewHScoresBtnEl = document.querySelector("#viewHScores");
const timerEl = document.querySelector("#timer");

// Variable
var score = 0;
var currentQ = 0;
var highScores = [];
var interval;
var timeGiven = 100;
var secondsElapsed = 0;

// Starts and updates the timer
function startTimer() {
    timerEl.textContent = timeGiven;
    interval = setInterval(function () {
        secondsElapsed++;
        timerEl.textContent = timeGiven - secondsElapsed;
        if (secondsElapsed >= timeGiven) {
            currentQ = questions.length;
            nextQuestion();
        }
    }, 1000);
}

// Stops Timer
function stopTimer() {
    clearInterval(interval);
}

// Calls for next question & for submit if last question
function nextQuestion() {
    currentQ++;
    if (currentQ < questions.length) {
        renderQuestion();
    } else {
        stopTimer();
        if ((timeGiven - secondsElapsed) > 0)
            score += (timeGiven - secondsElapsed);
        userScoreEl.textContent = score;
        hide(quizEl);
        show(inputScoreEl);
        timerEl.textContent = 0;
    }
}

// Checks answer
function checkAnswer(answer) {
    if (questions[currentQ].answer == questions[currentQ].choices[answer.id]) {
        score += 5;
        displayMessage("Correct!");
    }
    else {
        secondsElapsed += 10;
        displayMessage("Wrong...");
    }
}

// Displays a message 
function displayMessage(m) {
    let messageHr = document.createElement("hr");
    let messageEl = document.createElement("div");
    messageEl.textContent = m;
    document.querySelector(".jumbotron").appendChild(messageHr);
    document.querySelector(".jumbotron").appendChild(messageEl);
    setTimeout(function () {
            messageHr.remove();
            messageEl.remove();
    }, 2000);
}

// Hides element
function hide(element) {
    element.style.display = "none";
}

// Shows element
function show(element) {
    element.style.display = "block";
}

// Resets variables
function reset() {
    score = 0;
    currentQ = 0;
    secondsElapsed = 0;
    timerEl.textContent = 0;
}

// Renders current question
function renderQuestion() {
    questionEl.textContent = questions[currentQ].title;
    for (i = 0; i < answersEl.children.length; i++) {
        answersEl.children[i].children[0].textContent = `${(i + 1)}: ${questions[currentQ].choices[i]}`;
    }
}

// Renders High score in local storage
function renderHighScores() {
    scoresEl.innerHTML = "";
    show(highScoresEl);
    highScores = JSON.parse(localStorage.getItem("scores"));
    for (let i = 0; i < highScores.length; i++) {
        let scoreItem = document.createElement("div");
        scoreItem.className += "row mb-3 p-2";
        console.log(scoreItem)
        scoreItem.setAttribute("style", "background-color:PaleTurquoise;");
        scoreItem.textContent = `${(i + 1)}. ${highScores[i].username} - ${highScores[i].userScore}`;
        scoresEl.appendChild(scoreItem);
    }
}

// Displays highscores
viewHScoresBtnEl.addEventListener("click", function () {
    hide(welcomeEl);
    hide(quizEl);
    hide(inputScoreEl);
    renderHighScores();
    stopTimer();
    reset();
});

// Starts quiz
startQuizBtnEl.addEventListener("click", function () {
    hide(welcomeEl);
    startTimer();
    renderQuestion();
    show(quizEl);
});

// Checks if answer correct and moves to next question
answersEl.addEventListener("click", function (e) {
    if (e.target.matches("button")) {
        checkAnswer(e.target);
        nextQuestion();
    }
});

// Submit high score
submitInitialsBtnEl.addEventListener("click", function () {
    let initValue = initialsEl.value.trim();
    if (initValue) {
        let userScore = { username: initValue, userScore: score };
        initialsEl.value = '';
        highScores = JSON.parse(localStorage.getItem("scores")) || [];
        highScores.push(userScore)
        localStorage.setItem("scores", JSON.stringify(highScores));
        hide(inputScoreEl);
        renderHighScores();
        reset();
    }
});

// Button to go back to main page
goBackBtnEl.addEventListener("click", function () {
    hide(highScoresEl);
    show(welcomeEl);
});

// Clears saved scores
clearScoresBtnEl.addEventListener("click", function () {
    highScores = [];
    localStorage.setItem("scores", JSON.stringify(highScores));
    renderHighScores();
});

// Questions
var questions = [
    {
        title: "What extension should a Javascript file be?",
        choices: [".js", ".ps", ".css", ".html"],
        answer: ".js"
    },
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<scripting>", "<js>", "<script>","<javascript>"],
        answer: "<script>"
    },
    {
        title: "Where is the correct place to insert a JavaScript?",
        choices: ["the <head> section", "Both the <head> section and the <body> section are correct", "the <body> section", "In a <div>"],
        answer: "Both the <head> section and the <body> section are correct"
    },
    {
        title: "How can you add a comment in JavaScript?",
        choices: ["<!--This is a comment>", "'This is a comment'", "//This is a comment", "None of the Above"],
        answer: "//This is a comment"
    },
    {
        title: "What event occurs when the user clicks on and html element",
        choices: ["onmouseclick", "onmouseover", "onchange", "onclick"],
        answer: "onclick"
    },
    {
        title: "How do you declare a variable in JavaScript?",
        choices: ["v carName", "variable carName", "var carName", "carName var"],
        answer: "var carName"
    }
];
