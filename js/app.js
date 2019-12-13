// create a new instance of the Game class and add event listeners for the start button and onscreen keyboard buttons


// add a click event listener to the "Start Game" button which creates a new Game object and starts the game by calling the startGame() method

// click event listeners to each of the onscreen keyboard buttons, so that clicking a button calls the handleInteraction() method on the Game object

let game;

document.querySelector('#btn__reset').addEventListener('click', () => {
    game = new Game();
    game.startGame();
});

document.querySelector('#qwerty').addEventListener('click', e => {
    if(e.target.className === 'key') {
        game.handleInteraction(e.target);
    }
});

let keys = [];
keys = document.querySelectorAll('.key');
keys.forEach(key => key.setAttribute('tabindex', -1));


