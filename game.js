var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){ 
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length)
        {
            //Calling nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        $("#level-title").text("Game Over! Press New Game to Restart");
    }
}

function nextSequence()
{
    userClickedPattern = [];
    level = level+1;

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);

    $("#level-title").text("Level "+level);
}

$(".btn").click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


document.getElementsByTagName("button")[0].addEventListener('click', function() {
    level = 0;
    gamePattern = [];
    nextSequence();
});