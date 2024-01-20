var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearBtn"); 
var viewHighScore = document.getElementById("wrapper");
var listOfHighScores = document.getElementById("highscores");

var endScreen = document.getElementById("end-screen");
var submitBtn = document.getElementById("submitBtn");
var initials = document.getElementById("initials");
var wrapper = document.getElementById("wrapper");

var highScores = document.getElementById("scores");
var finalScore = document.getElementById("final-score");


function storeHighScores(event) {
    event.preventDefault();

    // stop function is initial is blank
    if (initials.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    start.style.display = "none";
    timer.style.display = "none";


    // store scores into local storage
    var savedHighScores = localStorage.getItem("highScores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initials.value,
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
var i = 0;
function showHighScores() {

    start.style.display = "none";
    time.style.display = "none";
    questionsDiv.style.display = "none";
    endScreen.style.display = "none";
    highScores.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    // check if there is any in local storage
    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}
submitBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

highScores.addEventListener("click", function(event) { 
    showHighScores(event);
});
viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    start.style.display = "block";
    highScores.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});

