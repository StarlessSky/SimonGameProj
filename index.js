var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var start = false;

//2. User will response by click the box. After click, will check by checkAnswer().
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor)

    checkAnswer(userClickedPattern.length - 1);
})

// 1. This step will start first. After press the key will call nextSequence() to generate random color box.
$(document).keypress(function () {
    if (!start) {
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true
    }
});



function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

function playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {     // this step will check length of userClick and gamePattern are the samw or not.
            setTimeout(function () {                                // if not the code will wait user to click next button
                nextSequence();                                     // After user click, function checkAnswer() will activate again and will check length. Do like a loop
            }, 1000);
        }

    }
    else {
        console.log("failed");
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart");

        start = false;
        level = 0;
        gamePattern = [];
    }

}