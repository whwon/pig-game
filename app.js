/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying;

init();

// Current random number the dice has selected. Two different ways to affect it
// Setter we set the value of the html
// document.querySelector(`#current-${activePlayer}`).textContent = dice;
// document.querySelector(`#current-${activePlayer}`).innerHTML = `<em> ${dice} </em>`;

// Getter - we get the value of the html
// let x = document.querySelector(`#score-${activePlayer}`).textContent;

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random Number needs to be generated
        // Two ways of randomly generating a number between 0 - 6:
        let dice = Math.floor(Math.random() * 6) + 1;
        // dice = Math.floor(Math.random() * Math.floor(7));


        // 2. Display the result
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = `dice-${dice}.png`;

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            // Add score
            roundScore += dice;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;

        } else {
            nextPlayer();
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if(gamePlaying) {
        // 1. Add the current score to the players global score
        scores[activePlayer] += roundScore;

        // 2. Update the UI
        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

        // 3. Check if player won the game
        if(scores[activePlayer] >= 100) {
            document.getElementById(`name-${activePlayer}`).textContent = 'WINNER!'
            document.querySelector('.dice').style.display = 'none';
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
    // document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active')
    // document.querySelector(`.player-${activePlayer}-panel`).classList.add('active')

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('.dice').style.display = 'none';

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