let gamePattern = [];
let userClickedPattern = [];

const buttonColours = ["red", "blue", "green", "yellow"];

let level = 0;

let randomNumber = Math.floor(Math.random() * 4);

function animatePressClick(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function animatePress(pressSequence){
    $("#" + pressSequence).fadeOut("fast").fadeIn("fast");
}

function nextSequence(){
    randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColour = buttonColours[randomNumber];

    switch(randomChosenColour){
        case "red":
            animatePress(randomChosenColour);

            var audioRed = new Audio("sounds/red.mp3");
            audioRed.play();
        break;
        case "blue":
            animatePress(randomChosenColour);

            var audioBlue = new Audio("sounds/blue.mp3");
            audioBlue.play();
        break;
        case "green":
            animatePress(randomChosenColour);

            var audioGreen = new Audio("sounds/green.mp3");
            audioGreen.play();
        break;
        case "yellow":
            animatePress(randomChosenColour);

            var audioYellow = new Audio("sounds/yellow.mp3");
            audioYellow.play();
        break;
    }
    gamePattern.push(randomChosenColour);

    level++;

    $("#level-title").text("Level " + level);
}

function playSound(name){
    switch(name){
        case "red":
            animatePressClick(name);

            var audioRed = new Audio("sounds/red.mp3");
            audioRed.play();
        break;
        case "blue":
            animatePressClick(name);

            var audioBlue = new Audio("sounds/blue.mp3");
            audioBlue.play();
        break;
        case "green":
            animatePressClick(name);

            var audioGreen = new Audio("sounds/green.mp3");
            audioGreen.play();
        break;
        case "yellow":
            animatePressClick(name);

            var audioYellow = new Audio("sounds/yellow.mp3");
            audioYellow.play();
        break;
    }
}

function startOver(){
    $("#level-title").text("Game Over, Press Restart Button to Restart");
    var audioLose = new Audio("sounds/wrong.mp3");
    audioLose.play();

    $("body").addClass("game-over");

    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);

    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function checkAnswer(currentLevel){
    if(gamePattern[gamePattern.length - 1] !== userClickedPattern[userClickedPattern.length - 1] && gamePattern[userClickedPattern.length -1] !== currentLevel){
        startOver();
    }else if(gamePattern.length === userClickedPattern.length && gamePattern[gamePattern.length - 1] === currentLevel){
        setTimeout(() => {
            nextSequence();
        }, 1000);
        userClickedPattern = [];
    }else if(gamePattern.length && userClickedPattern.length < 1){
        $("#level-title").text("Press Start Before Starting the Game");

        level = 0;
        gamePattern = [];
        userClickedPattern = [];
    }
}

$(document).keypress(function(event){
    nextSequence(event.key);
});

$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    checkAnswer(userChosenColour);
});

$("#start").click(() => {
    nextSequence();
});

$("#restart").click(() => {
    $("#level-title").text("Press Start Before Starting the Game");

    level = 0;
    gamePattern = [];
    userClickedPattern = [];
});