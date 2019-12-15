// game phrases -- constructor
class Game {
  constructor() {
    this.missed = 0;
    this.phrases = [
      new Phrase('golang'),
      new Phrase('python'),
      new Phrase('kotlin'),
      new Phrase('scala'),
      new Phrase('javascript'),
      new Phrase('objective c'),
      new Phrase('cobol'),
      new Phrase('fortran'),
      new Phrase('typescript')
    ];
    this.activePhrase = null;
  }


  // class methods
  // hides the start screen overlay, calls the getRandomPhrase() method
  startGame() {
    document.querySelector('#overlay').style.display = 'none';
    document.querySelector('.title').style.display = 'block';
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
    button.classList.add('hide-key');

    // checks if letter is in phrase
    if (this.activePhrase.checkLetter(button.textContent)) {
      // if true, show letters.
      this.activePhrase.showMatchedLetter(button.textContent);
      // if all letters guessed, Game Over
      if (this.checkForWin()) {
        this.gameOver(true)
      }
      // if false, remove life
    } else {
      this.removeLife();
      return false;
      // this.checkForWin();
    }
  }

  // this method removes a life from the scoreboard, by replacing one of the liveHeart.png images with a lostHeart.png image
  removeLife() {
    let images = [];
    images = document.querySelectorAll('img');
    images[this.missed].src = 'images/lostHeart.png';
    this.missed += 1;
    if (this.missed === 5) {
      this.gameOver(false);
    }
  }

  // this method checks to see if the player has revealed all of the letters in the active phrase
  checkForWin() {
    const shownLetters = document.querySelectorAll('.show');
    const phraseLetters = document.querySelectorAll('.letter');
    if (shownLetters.length < phraseLetters.length) {
      return false;
    } else {
      return true;
    }
  }

  // this method displays the original start screen overlay, and depending on the outcome of the game, updates the overlay h1 element with a friendly win or loss message, and replaces the overlay’s start CSS class with either the win or lose CSS class
  gameOver() {
    const gameOverMessage = document.querySelector('#game-over-message');
    const overlay = document.querySelector('#overlay');
    document.querySelector('.title').style.display = 'none';
    overlay.style.display = 'block';
    if (this.checkForWin() === true) {
      gameOverMessage.textContent = 'Awesome, you win!';
      overlay.classList.remove('lose');
      overlay.classList.add('win');
    } else {
      gameOverMessage.innerHTML = 'Sorry! The phrase was:' +
        `<p>${this.activePhrase.phrase.toUpperCase()}</p>`;
      overlay.classList.remove('win');
      overlay.classList.add('lose');
    }
    this.resetGame();
  }

  // resets the gameboard between games
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