/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying = true;

init();

// ROLL DICE
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random Number needs to be generated
        // Two ways of randomly generating a number between 0 - 6:
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;
        // dice = Math.floor(Math.random() * Math.floor(7));
        let previousRole1 = [];
        let previousRole2 = [];

        // 2. Display the result
        let dice1DOM = document.getElementById('dice1');
        dice1DOM.style.display = 'block';
        dice1DOM.src = `dice-${dice1}.png`;

        let dice2DOM = document.getElementById('dice2');
        dice2DOM.style.display = 'block';
        dice2DOM.src = `dice-${dice2}.png`;

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += (dice1 + dice2);
            previousRole1 = previousRole1.push(dice1);
            previousRole2 = previousRole2.push(dice2);
            document.getElementById(`current-${activePlayer}`).textContent = roundScore;
        } else if((dice1 === 6 && (previousRole1.pop() === 6)) || (dice2 === 6 && (previousRole2.pop() === 6))) {
            scores[activePlayer] = 0;
            document.getElementById(`current-${activePlayer}`).textContent = 0;
            document.getElementById(`score-${activePlayer}`).textContent = 0;
            nextPlayer();
        } else {
            nextPlayer();
        }
    }

});

// HOLD DICE
document.querySelector('.btn-hold').addEventListener('click', function () {

    if(gamePlaying) {
        // 1. Add the current score to the players global score
        scores[activePlayer] += roundScore;

        // 2. Update the UI
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

        let winningScore = 100;
        let inputtedScore = document.querySelector('.input-win-score').value;

        if(inputtedScore) {
            winningScore = inputtedScore;
        }

        // 3. Check if player won the game
        if(scores[activePlayer] >= winningScore) {
            document.getElementById(`name-${activePlayer}`).textContent = 'WINNER!'
            document.getElementById('dice1').style.display = 'none';
            document.getElementById('dice2').style.display = 'none';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner')
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active')
            // Disable the roll and hold button
            gamePlaying = false;
        } else {
            // 4. Change the active player
            nextPlayer();
        }
    }

})

function nextPlayer() {
    // Next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById(`current-0`).textContent = '0';
    document.getElementById(`current-1`).textContent = '0';

    document.querySelector(`.player-0-panel`).classList.toggle('active')
    document.querySelector(`.player-1-panel`).classList.toggle('active')

    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';
}

// Click on New Game
document.querySelector('.btn-new').addEventListener('click', init);

// Initialize and set everything to default
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';

    // This is faster than querySelector when looking for id attributes
    // Furthermore you do not need to put # because it knows it is an id
    document.getElementById(`score-0`).textContent = '0';
    document.getElementById(`score-1`).textContent = '0';
    document.getElementById(`current-0`).textContent = '0';
    document.getElementById(`current-1`).textContent = '0';
    document.getElementById(`name-0`).textContent = 'Player 1'
    document.getElementById(`name-1`).textContent = 'Player 2'
    document.querySelector(`.player-0-panel`).classList.remove('winner')
    document.querySelector(`.player-1-panel`).classList.remove('winner')
    document.querySelector(`.player-0-panel`).classList.remove('active')
    document.querySelector(`.player-1-panel`).classList.remove('active')
    document.querySelector(`.player-0-panel`).classList.add('active')
}