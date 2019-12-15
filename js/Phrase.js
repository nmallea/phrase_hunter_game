// game class -- constructor
class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }
  // this adds letter placeholders to the display when the game starts. Each letter is presented by an empty box, one li element for each letter
  addPhraseToDisplay() {
    const ul = document.querySelector('ul');
    [...this.phrase].forEach((character) => {
      const liLetters = document.createElement('li');
      ul.append(liLetters);
      if (character === ' ') {
        liLetters.classList.add('space');
        liLetters.innerHTML = ' ';
      } else {
        liLetters.classList.add('hide', 'letter', `${character}`, 'animated', 'rubberBand'); // adds animation
        liLetters.innerHTML = character;
      }
    })
  }
  // checks to see if the letter selected by the player matches a letter in the phrase
  checkLetter(letter) {
    return this.phrase.indexOf(letter) > -1;
  }
  // reveals the letter(s) on the board that matches the player's selection.
  showMatchedLetter(letter) {
    let matchedLetters = [];
    matchedLetters = document.querySelectorAll(`.${letter}`);

    matchedLetters.forEach(letters => {
      letters.classList.add('show');
      letters.classList.remove('hide');
    })
  }
}
