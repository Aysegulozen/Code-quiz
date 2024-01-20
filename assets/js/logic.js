document.addEventListener("DOMContentLoaded", function () {
// Variables to store DOM elements
var timer = document.querySelector(".timer");
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
var submitBtn = document.getElementById("submit");
var initialInput = document.getElementById("initials");
var wrapper = document.getElementById("wrapper");

var highScores = document.getElementById("highscores");
var finalScore = document.getElementById("final-score");

// Quiz-related variables
var correctAns = 0;
var questionIndex = 0;
var totalTime = 76;

// Function to start a new quiz
function newQuiz() {
    questionIndex = 0;
    totalTime = 75;
    time.textContent = totalTime;
    initialInput.value = "";

    start.style.display = "none";
    questionsDiv.style.display = "block";
    time.style.display = "block";

    // Timer
    var startTimer = setInterval(function () {
        totalTime--;
        time.textContent = totalTime;
        if (totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length) {
                gameOver();
            }
        }
    }, 1000);

    showQuiz();
};
// Function to display quiz questions
function showQuiz() {
    nextQuestion();
}
// Function to move to the next question
function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}
// Function to check the selected answer
function checkAnswer(answer) {
    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        correctAns++;
        answerContainer.textContent = "Correct!";
    } else {
        totalTime -= 10;
        time.textContent = totalTime;
        answerContainer.textContent = "Wrong!";
    }

    questionIndex++;

    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
}
// Functions for each answer choice
function chooseA() { checkAnswer(0); }
function chooseB() { checkAnswer(1); }
function chooseC() { checkAnswer(2); }
function chooseD() { checkAnswer(3); }

// Function to handle the end of the quiz
function gameOver() {
    console.log("Game Over!");
    console.log("Final Score:", correctAns);
    finalScore.textContent = correctAns;

    endScreen.style.display = "block";
    questionsDiv.style.display = "none";
    start.style.display = "none";
    time.style.display = "none";
}

// Function to store high scores and redirect to highscores.html
function storeHighScores() {
  if (initialInput.value === "") {
      alert("Please enter your initials!");
      return;
  }

  // Retrieve scores from local storage or initialize an empty array
  var savedHighScores = localStorage.getItem("highScores");
  var scoresArray = savedHighScores ? JSON.parse(savedHighScores) : [];

  // Create user score object
  var userScore = {
      initials: initialInput.value,
      score: correctAns
  };

  // Add user score to scores array
  scoresArray.push(userScore);

  // Sort scores in descending order
  scoresArray.sort((a, b) => b.score - a.score);

  // Stringify and store the array in local storage
  localStorage.setItem("highScores", JSON.stringify(scoresArray));

  // Redirect to highscores.html
  window.location.href = "highscores.html";
}
// Event listeners for button clicks
startBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitBtn.addEventListener("click", storeHighScores);
});