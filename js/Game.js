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
    button.classList.add('chosen', 'animated', 'rotateIn');
    // add animation to correct key pressed
    if (this.checkForWin()) {
      // if all letters guessed, Game Over.
      this.gameOver()
    }
  } else {
    // if false, remove life.
    button.classList.add('wrong', 'animated', 'shake');
    // add animation to wrong key pressed
    this.removeLife();
    this.checkForWin();
  }
}