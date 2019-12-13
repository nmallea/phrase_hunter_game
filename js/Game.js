// game phrases -- constructor
class Game {
  constructor() {
    this.missed = 0;
    this.phrases = [
      new Phrase('Everything I know I learned from dogs.'),
      new Phrase('You cant teach an old dog new tricks'),
      new Phrase('Barking up the wrong tree'),
      new Phrase('All bark and no bite'),
      new Phrase('The better I get to know men the more I find myself loving dogs')
    ];
    this.activePhrase = null;
  }


  // class methods
  // hides the start screen overlay, calls the getRandomPhrase() method
  startGame() {
    document.querySelector('#overlay').style.display = 'none';
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  // this method randomly retrieves one of the phrases stored in the phrases array and returns it
  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  // this method controls most of the game logic. It checks to see if the button clicked by the player matches a letter in the phrase, and then directs the game based on a correct or incorrect guess
  handleInteraction(button) {
    button.disabled = true;
    // checks if letter is in phrase
    if (this.activePhrase.checkLetter(button.textContent)) {
      // if true, show letters.
      this.activePhrase.showMatchedLetter(button.textContent);
      // if all letters guessed, Game Over
      if (this.checkForWin()) {
        this.gameOver()
      }
      // if false, remove life
    } else {
      this.removeLife();
      this.checkForWin();
    }
  }

  // this method removes a life from the scoreboard, by replacing one of the liveHeart.png images with a lostHeart.png image
  removeLife() {
    let images = [];
    images = document.querySelectorAll('img');
    images[this.missed].src = 'images/lostHeart.png';
    this.missed += 1;
    if (this.missed === 5) {
      this.gameOver();
    }
  }

  // this method checks to see if the player has revealed all of the letters in the active phrase
  checkForWin() {
    if (document.querySelectorAll('.hide').length === 0) {
      return true;
    } else {
      return false;
    }
  }

  // this method displays the original start screen overlay, and depending on the outcome of the game, updates the overlay h1 element with a friendly win or loss message, and replaces the overlay’s start CSS class with either the win or lose CSS class
  gameOver() {
    const overlay = document.querySelector('#overlay');
    overlay.style.display = 'none';
    let gameOverMessage = document.querySelector('#game-over-message');
    if (this.checkForWin() === true) {
      gameOverMessage.textContent = 'Awesome! You win.';
      overlay.classList.remove('lose');
      overlay.classList.add('win');
    } else {
      gameOverMsg.innerHTML = 'Sorry! The phrase was:' +
        `<p>${this.activePhrase.phrase.charAt(0).toUpperCase() + this.activePhrase.phrase.slice(1)}</p>`;
      overlay.classList.remove('win');
      overlay.classList.add('lose');
    }
    this.resetGame();
  }

  // resetting the gameboard between games
  // remove li elements
  resetGame() {
    let li = [];
    li = document.querySelectorAll('.letter');
    let spaces = [];
    spaces = document.querySelectorAll('.space');
    li.forEach(l => l.parentNode.removeChild(l));
    spaces.forEach(space => space.parentNode.removeChild(space));

    // enable all keys
    let keys = [];
    keys = document.querySelectorAll('.key');
    keys.forEach(key => {
      key.removeAttribute("disabled");
      key.className = "key";
    });

    // reset all the heart images
    let image = [];
    image = document.querySelectorAll('img');
    image.forEach(img => {
      img.src = 'images/liveHeart.png';
    });

    // remove active phrase
    this.activePhrase = null;

  }
}
