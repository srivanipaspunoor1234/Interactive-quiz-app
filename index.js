let questions = [
    {
        question: "What is the Capital of India?",
        options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
        correct: "Delhi"
    },
    {
        question: "Which is an input device?",
        options: ["Monitor", "Printer", "Keyboard", "Speaker"],
        correct: "Keyboard"
    },
    {
        question: "HTML is used for?",
        options: ["Styling", "Structure", "Logic", "Database"],
        correct: "Structure"
    },
    {
        question: "Java is a ____ language.",
        options: ["Low-level", "Machine", "High-level", "Assembly"],
        correct: "High-level"
    },
    {
        question: "9. 5 × 6 = ?",
        options: ["20", "25", "42", "30"],
        correct: "30"
    }
]

let quesContainer = document.getElementById("question-container")
let instContainer = document.getElementById("instructions-container")
let resContainer = document.getElementById("result-container")
let btn = document.getElementById("btn")
let ques = document.getElementById("ques")
let options = document.getElementsByClassName("opt")
let res = document.getElementById("res")
let timer = document.getElementById("timer")
let questionCount = 0;
let result = 0;
let timeLeft = 5 * 60;
let timerInterval;
let timerStarted = false;


function startTimer() {

    if (timerStarted) return;
    timerStarted = true;

    timerInterval = setInterval(() => {

        let min = Math.floor(timeLeft / 60);
        let sec = timeLeft % 60;

        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;

        timer.textContent = min + ":" + sec;

        if (timeLeft === 0) {
            clearInterval(timerInterval);

            quesContainer.style.display = "none";
            resContainer.style.display = "block";
            res.textContent = "Result: " + result + "/10";
            btn.style.display = "none";
        }

        timeLeft--;
    }, 1000);
}


instContainer.style.display = "block"
quesContainer.style.display = "none"
resContainer.style.display = "none"

btn.onclick = () => {

    if (btn.textContent.toLowerCase() === "restart") {

        questionCount = 0;
        result = 0;
        timeLeft = 5 * 60;
        timerStarted = false;
        clearInterval(timerInterval);

        timer.textContent = "05:00";
        btn.textContent = "Start";

        instContainer.style.display = "block";
        quesContainer.style.display = "none";
        resContainer.style.display = "none";

        for (let opt of options) {
            opt.disabled = false;
            opt.style.backgroundColor = "";
        }

        return;
    }

    if (questionCount == questions.length) {
        instContainer.style.display = "none"
        quesContainer.style.display = "none"
        resContainer.style.display = "block"
        btn.textContent = "restart"
        res.textContent = "Result: " + result + "/10"
        return
    }
    startTimer();

    instContainer.style.display = "none"
    quesContainer.style.display = "block"
    resContainer.style.display = "none"
    btn.textContent = "Next"


    ques.textContent = questions[questionCount].question
    for (let i = 0; i < 4; i++) {
        options[i].textContent = questions[questionCount].options[i]
        options[i].style.backgroundColor = ""
        options[i].disabled = false
    }
    questionCount++;

}

for (let i of options) {
    i.onclick = function () {
        if (i.textContent == questions[questionCount - 1].correct) {
            i.style.backgroundColor = "green"
            result = result + 2;
        } else {
            i.style.backgroundColor = "red"
            for (let j of options) {
                if (j.textContent == questions[questionCount - 1].correct) {
                    j.style.backgroundColor = "green";
                }
            }
        }
        for (let i of options) {
            i.disabled = true
        }
    }
}