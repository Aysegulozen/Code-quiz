
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve scores from local storage or initialize an empty array
    var savedHighScores = localStorage.getItem("highScores");
    var scoresArray = savedHighScores ? JSON.parse(savedHighScores) : [];

    // Display high scores on the high scores page
    var highScoresList = document.getElementById("highscores");
    scoresArray.sort((a, b) => b.score - a.score); // Sort scores in descending order
    scoresArray.forEach(function (score) {
        var li = document.createElement("li");
        li.textContent = score.initials + ": " + score.score;
        highScoresList.appendChild(li);
    });

    // Event listener for "Go Back" button
    document.getElementById("goBack").addEventListener("click", function () {
        window.location.href = "index.html"; // Redirect to index.html
    });

    // Event listener for "Clear Highscores" button
    document.getElementById("clear").addEventListener("click", function () {
        localStorage.removeItem("highScores"); // Clear high scores from local storage
        highScoresList.innerHTML = ""; // Clear the displayed scores on the page
    });
});