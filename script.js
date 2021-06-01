var timerInterval;
var secondsRemaining = 120;
var timeSpan = document.querySelector("#seconds-remaining");
var mainContent = document.querySelector(".main-content");
var quizIntro = document.querySelector(".quiz-intro");
var quizContent;
var quizDone;

var questions = [
    {
        question: "Who invented JavaScript?",
        choices: ["Douglas Crockford", "Sheryl Sandberg", "Brendan Eich", "Tim Berners-Lee"],
        correct: '2'
    }, {
        question: "Which one of these is a JavaScript package manager?",
        choices: ["Node.jse", "TypeScript", "npm", "Java"],
        correct: '2'
    }, {
        question: "Which tool can you use to ensure code quality?",
        choices: ["Angular", "Query", "RequireJS", "ESLint"],
        correct: '3'
    }, {
        question: "Who developed and designed TypeScript?",
        choices: ["Microsoft", "Amazon", "Oracle", "TypeScript"],
        correct: '0'
    }, {
        question: "Which of the following is the typing principle of typescript?",
        choices: ["Gradual", "Dynamic", "Duck", "All of the above"],
        correct: '3'
    }
];


function checkAnswer(index, buttonID) {
    var isCorrect = (buttonID === questions[index].correct);

    var feedback = document.createElement("div");
    var pEl = document.createElement("p");
    feedback.setAttribute("class", "feedback");

    feedback.appendChild(pEl);
    mainContent.appendChild(feedback);

    if (isCorrect) {
        pEl.textContent = "Correct!";
    }
    else {
        pEl.textContent = "Wrong!";
        if (secondsRemaining <= 15) {
            secondsRemaining = 0;
        }
        else {
            secondsRemaining -= 15;
        }
    }

    var removeFeedback = setTimeout(function () {
        mainContent.removeChild(feedback);
    }, 1000)
}

function startQuiz() {
    var index = 0;

    quizContent = document.createElement("div");
    quizContent.setAttribute("class", "quiz-content");


    var quizQuestion = document.createElement("h2");
    quizQuestion.setAttribute("class", "quiz-question");
    quizQuestion.textContent = questions[index].question;

    var quizAnswers = document.createElement("ul");
    quizAnswers.setAttribute("class", "quiz-answers");

    for (var i = 0; i < 4; i++) {
        var listEl = document.createElement("li");
        var buttonEl = document.createElement("button");
        buttonEl.setAttribute("class", "quiz-answer");
        buttonEl.setAttribute("data-id", i);
        buttonEl.textContent = (i + 1) + ". " + questions[index].choices[i];

        listEl.appendChild(buttonEl);
        quizAnswers.appendChild(listEl);
    }

    
    quizContent.appendChild(quizQuestion);
    quizContent.appendChild(quizAnswers);
    mainContent.replaceChild(quizContent, quizIntro);

    var buttonArray = quizAnswers.querySelectorAll("button");

    quizAnswers.addEventListener("click", function (event) {
        var element = event.target;
        if (element.matches("button")) {
            var buttonID = element.getAttribute("data-id");
            checkAnswer(index, buttonID);
            index++;
            if (index === questions.length) {
                stopTimer();
                allDone();
                return null;
            }
            quizQuestion.textContent = questions[index].question;
            for (var j = 0; j < 4; j++) {
                buttonArray[j].textContent = (j + 1) + ". " + questions[index].choices[j];
            }
        }
    })
}

function allDone() {
    quizDone = document.createElement("div");
    quizDone.setAttribute("class", "quiz-done");

    // var doneHeaderImage = document.createElement("img");
    // doneHeaderImage.setAttribute("class", "header-img");
    // doneHeaderImage.setAttribute("id", "quiz-done-img");
    // doneHeaderImage.setAttribute("src", "assets/images/exclamation-solid.svg");
    // doneHeaderImage.setAttribute("alt", "quiz done header image");

    var h1El = document.createElement("h1");
    h1El.textContent = "All done!";

    var pEl = document.createElement("p");
    pEl.textContent = "Your scored " + secondsRemaining + "!";

    var formEl = document.createElement("form");
    formEl.setAttribute("class", "quiz-answers");
    var labelEl = document.createElement("label");
    labelEl.textContent = "Enter your name: ";
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    var submitEl = document.createElement("input");
    submitEl.setAttribute("type", "submit");
    submitEl.setAttribute("id", "submit");
    labelEl.appendChild(inputEl);
    formEl.appendChild(labelEl);
    formEl.appendChild(submitEl);

    // quizDone.appendChild(doneHeaderImage);
    quizDone.appendChild(h1El);
    quizDone.appendChild(pEl);
    quizDone.appendChild(formEl);
    mainContent.replaceChild(quizDone, quizContent);

    submitEl.addEventListener("click", function (event) {
        event.preventDefault();

        if (inputEl.value === "") {
            alert("Please enter your initials!");
            return null;
        }

        saveScore(inputEl.value, secondsRemaining);
        window.location = "index.html";
    })
}

function startTimer() {
    timeSpan.textContent = secondsRemaining;

    timerInterval = setInterval(function () {
        if (secondsRemaining <= 0) {
            stopTimer();
            allDone();
            return null;
        }
        secondsRemaining--;
        timeSpan.textContent = secondsRemaining;
    }, 1000)
}

function stopTimer() {
    timeSpan.textContent = secondsRemaining;
    clearInterval(timerInterval);
}

document.querySelector("#start-quiz").addEventListener("click", function () {
    startTimer();
    startQuiz();
})