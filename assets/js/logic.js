var timer = document.getElementById("timer");
var time = document.getElementById("time");

var start = document.getElementById("start-screen");
var startBtn = document.getElementById("startBtn");

var questionsDiv = document.getElementById("questions");
var questionTitle = document.getElementById("question-title");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerContainer = document.getElementById("answer");

var endScreen = document.getElementById("end-screen");
var submitBtn = document.getElementById("submitBtn");
var initialInput = document.getElementById("initials");
var wrapper = document.getElementById("wrapper");

var highScores = document.getElementById("scores");
var finalScore = document.getElementById("final-score");


var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

var totalTime = 76 ;
function newQuiz() {
    questionIndex = 0;
    totalTime = 75;
    time.textContent = totalTime;
    initials.textContent = "";

    start.style.display = "none";
    questionsDiv.style.display = "block";
    time.style.display = "block";
  

    var startTimer = setInterval(function() {
        totalTime--;
        time.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);
    showQuiz();
};

function showQuiz() {
  nextQuestion();
}

function nextQuestion() {
  questionTitle.textContent = questions[questionIndex].question;
  choiceA.textContent = questions[questionIndex].choices[0];
  choiceB.textContent = questions[questionIndex].choices[1];
  choiceC.textContent = questions[questionIndex].choices[2];
  choiceD.textContent = questions[questionIndex].choices[3];
}

// after question is answered, show if correct or wrong
function checkAnswer(answer) {

  if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
      // correct answer, add 1 score to final score
      correctAns++;
      // console.log(correctAns);
      answerContainer.textContent = "Correct!";
  } else {
      // wrong answer, deduct 10 second from timer
      totalTime -= 10;
      time.textContent = totalTime;
      answerContainer.textContent = "Wrong!";
  }
  // move to next question
  questionIndex++;
  // repeat with the rest of questions 
  if (questionIndex < questions.length) {
      nextQuestion();
  } else {
      // if no more question, run game over function
      gameOver();
  }
};

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }

function gameOver() {
  // Debugging: Add a console.log to see if the function is being called
  console.log("Game Over!");

  // Debugging: Add console.log to check the value of finalScore
  console.log("Final Score:", correctAns);

  // Assuming finalScore is the correct variable referencing the HTML element
  finalScore.textContent = correctAns;

  // Debugging: Check if the element exists
  if (!finalScore) {
    console.error("Final Score element not found!");
  }

  // Debugging: Check if the function is being called
  if (finalScore.textContent === "") {
    console.error("Final Score not set!");
  }

  endScreen.style.display = "block";
  questionsDiv.style.display = "none";
  start.style.display = "none";
  time.style.display = "block,none";

}

// enter initial and store highscore in local storage
    function storeHighScores(event) {
      event.preventDefault();
  
      // stop function is initial is blank
      if (initialInput.value === "") {
          alert("Please enter your initials!");
          return;
      } 
    

    start.style.display = "none";
    timer.style.display = "none";
    time.style.display = "none";
    endScreen.style.display = "none";
    highScores.style.display = "block";  
    
    
    // store scores into local storage
    var savedHighScores = localStorage.getItem("highScores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
      initialInput: initials.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    // stringify array in order to store in local
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    // show current highscores
    showHighScores();
}


// var i = 0;
// function showHighScores() {

//     start.style.display = "none";
//     time.style.display = "none";
//     questionsDiv.style.display = "none";
//     endScreen.style.display = "none";
//     highScores.style.display = "block";
// }


    // store high score in local storage
startBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

highScores.addEventListener("click", function(event) { 
    showHighScores(event);
});
