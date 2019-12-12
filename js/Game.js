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