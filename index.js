var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Start game when "Start Game" button is clicked
$("#start-btn").on("click", function () {
  $("#intro-box h1").text("Simon Game"); // Reset heading in overlay
  $("#intro-overlay").fadeOut(500, function () {
    // Once overlay is hidden, start game after short delay
    setTimeout(() => {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }, 200);
  });
});

// User clicks a button
$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// Check if user's answer is correct
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over");

    startOver();
  }
}

// Generate the next color in the sequence
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("LEVEL " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Play sound for a color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Add and remove "pressed" class for visual click effect
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Reset the game and show the intro screen again
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;

  // Show intro overlay again after game over
  setTimeout(() => {
    $("#intro-overlay").fadeIn(500);
    $("#intro-box h1");
  }, 1000);
}
