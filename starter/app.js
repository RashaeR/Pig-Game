var scores, roundScore, activePlayer, gamePlaying, gameGoal;

init();
var previousScore;

/*
BUTTON ROLL
*/
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1; //-Extra- 2

    //Display the result
    var diceDOM = document.querySelector("#dice-1");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    //-Extra- 2
    var diceDOM2 = document.querySelector("#dice-2");
    diceDOM2.style.display = "block";
    diceDOM2.src = "dice-" + dice2 + ".png";

    //Update the round score IF the rolled number was NOT a 1
    /*
    if (dice !== 1) {
      //Add score
      roundScore += dice;
      console.log(previousScore, dice);
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    }
    else {
      //Next Player
      nextPlayer();
    }
    */
    /*
    //-Extra-
    if (previousScore === 6 && roundScore === 6) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice !== 1) {
      //Add score
      roundScore += dice;
      
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Next Player
      nextPlayer();
    }
    previousScore = 6;
    */

    //-Extra- 2
    if (dice !== 1 && dice2 !== 1) {
      //Add score
      roundScore += dice + dice2;

      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Next Player
      nextPlayer();
    }
  }
});

/*
BUTTON HOLD
*/
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //Check if player won the game
    if (scores[activePlayer] >= gameGoal) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector("#dice-1").style.display = "none";
      document.querySelector("#dice-2").style.display = "none"; //-Extra-2
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //Next Player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //Next player
  //If activePlayer = 0 then activePLayer = 1 else activePlayer = 0
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  /* The same as this..
    if(activePlayer === 0)
    {
      activePLayer = 1;
    }
    else 
    {
      activePlayer = 0;
    }
    */
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //document.querySelector(".player-0-panel").classList.remove("active");
  //document.querySelector(".player-1-panel").classList.add("active");
  document.querySelector("#dice-1").style.display = "none";
  document.querySelector("#dice-2").style.display = "none"; //-Extra- 2
}

/*
BUTTON NEW
*/
document.querySelector(".btn-new").addEventListener("click", init);

/*
BUTTON SUBMIT
*/
document.querySelector(".btn-submit").addEventListener("click", function() {
  if (gamePlaying) {
    gameGoal = document.getElementById("goal-input").value;
    document.getElementById("goal-text").textContent = gameGoal;
  }
});

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gameGoal = 100;
  gamePlaying = true;
  //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
  //var x = document.querySelector("#score-0").textContent;

  document.querySelector("#dice-1").style.display = "none";
  document.querySelector("#dice-2").style.display = "none"; //-Extra- 2
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.getElementById("goal-input").value = "";
  document.getElementById("goal-text").textContent = gameGoal;
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
