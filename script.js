const questions = [
    {
        question: " What does === operator do in JavaScript?",
        answer:[
            {text:"Assigns a value" , correct : false},
            {text:"Compares only values" , correct : false},
            {text:"Compares values and types" , correct : true},
            {text:"Compares references only" , correct : false},

        ]
    },
     {
        question: " Which built-in method returns the character at the specified index?",
        answer:[
            {text:"characterAt()" , correct : false},
            {text:"getCharAt()" , correct : false},
            {text:"charAt()" , correct : true},
            {text:"None of the above." , correct : false},

        ]
    },
     {
        question: "What will typeof null return?",
        answer:[
            {text:"object" , correct : true},
            {text:"null" , correct : false},
            {text:"undefined" , correct : false},
            {text:"number" , correct : false},

        ]
    },
     {
        question: "Which method adds a new element to the end of an array??",
        answer:[
            {text:"shift()" , correct : false},
            {text:"pop()" , correct : false},
            {text:"push()" , correct : true},
            {text:"unshift()" , correct : false},

        ]
    },
     {
        question: "What does NaN mean in JavaScript?",
        answer:[
            {text:"New Array Name" , correct : false},
            {text:"Not a Number" , correct : true},
            {text:"Named and Null" , correct : false},
            {text:" No assigned Name" , correct : false},

        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click" , selectAnswer);
    });
}


function resetState(){
    nextBtn.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect  = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score ++;

    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length} !`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click" , ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
