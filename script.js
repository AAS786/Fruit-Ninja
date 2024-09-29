var playing = false;
var score;
var trialsleft;
var step;
var action;
var bombAction;
var fruits = ['1','2','3','4','5','6','7','8','9','10'];
var bombProbability = 0.2; // 20% chance to spawn a bomb

$(function(){
    $('#front').show();
    $("#startReset").click(function () {
        if(playing == true){
            location.reload(); // Reset the game
        }else{
            $('#front').hide();
            $('#score').show();
            playing = true;
            score = 0;
            $("#scoreValue").html(score);

            $('#trialsleft').show();
            trialsleft = 3;
            addhearts();

            $('#gameOver').hide();
            $('#startReset').html('Reset Game');

            // Start the game action
            startAction();
        }
    });

    // Slice a fruit
    $("#fruit1").on("mouseover touchstart", function() {
        score++;
        $("#scoreValue").html(score);

        $("#slicesound")[0].play();
        clearInterval(action);

        $('#fruit1').hide("explode", 500); // Slice effect

        setTimeout(startAction, 500); // Start new action after 500ms
    });

    // Slice a bomb
    $("#bomb").on("mouseover touchstart", function() {
        // Game over when bomb is sliced
        clearInterval(bombAction);
        clearInterval(action);
        stopAction();

        $('#bomb').hide("explode", 500); // Bomb explode effect
        $('#gameOver').show();
        $('#gameOver').html('<p>Game Over!</p><p>You hit a bomb!</p><p>Your score is ' + score + '</p>');
        $('#trialsleft').hide();
        $('#score').hide();
        playing = false;
        $('#startReset').html('Start Game');
    });

    // Functions

    // Add hearts (lives)
    function addhearts() {
        $('#trialsleft').empty();
        for(i = 0 ; i < trialsleft ; i++){
            $('#trialsleft').append('<img src="images/wrong.png" class="life">');
        }
    }

    // Start fruit and bomb action
    function startAction() {
        $('#fruit1').show();
        chooseRandomFruit();

        // Random fruit position
        $('#fruit1').css({
            'left': Math.round(550 * Math.random()),
            'top': -50
        });

        // Generate random step for the fruit
        step = 1 + Math.round(5 * Math.random());

        // Move the fruit down
        action = setInterval(function() {
            $('#fruit1').css('top', $('#fruit1').position().top + step);

            if($('#fruit1').position().top > $('#fruitcontainer').height() - 50) {
                if(trialsleft > 1) {
                    $('#fruit1').show();
                    chooseRandomFruit();

                    $('#fruit1').css({
                        'left': Math.round(550 * Math.random()),
                        'top': -50
                    });

                    step = 1 + Math.round(5 * Math.random());
                    trialsleft--;
                    addhearts();
                } else {
                    playing = false;
                    $("#score").hide();
                    $('#startreset').html('Start Game');
                    $('#gameOver').show();
                    $('#gameOver').html('<p>Game Over!</p><p>Your score is ' + score + '</p>');
                    $('#trialsleft').hide();
                    stopAction();
                }
            }
        }, 10);

        // Random chance to spawn a bomb
        if (Math.random() < bombProbability) {
            startBombAction();
        }
    }

    // Start bomb action
    function startBombAction() {
        $('#bomb').show();
        $('#bomb').css({
            'left': Math.round(550 * Math.random()),
            'top': -50
        });

        bombAction = setInterval(function() {
            $('#bomb').css('top', $('#bomb').position().top + step);

            if($('#bomb').position().top > $('#fruitcontainer').height() - 50) {
                $('#bomb').hide();
                clearInterval(bombAction);
            }
        }, 10);
    }
    // Slice a fruit
$("#fruit1").mouseover(function () {
  score++; // increase score
  $("#scoreValue").html(score);

  // play sound
  $("#slicesound")[0].play();

  // stop fruit
  clearInterval(action);

  // show splash
  showSplash($(this).position().left, $(this).position().top, 'fruit'); 

  // hide fruit
  $('#fruit1').hide("explode", 500); // slice fruit

  // send new fruit
  setTimeout(startAction, 500);
});


    // Choose a random fruit
    function chooseRandomFruit() {
        $('#fruit1').attr('src', 'images/' + fruits[Math.round(9 * Math.random())] + '.png');
    }

    // Stop the fruit/bomb action
    function stopAction() {
        clearInterval(action);
        $('#fruit1').hide();
        clearInterval(bombAction);
        $('#bomb').hide();
    }
});
