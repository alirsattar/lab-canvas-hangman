
// HANGMAN CONSTRUCTOR FUNCTION

var words = [
  'JAVASCRIPT',
  'HTML',
  'CSS',
  'MONGODB',
  'NODEJS',
  'EXPRESS',
  'ANGULAR',
  'REACT',
  'VUE'
];



function Hangman(wordsArray) {
  
  this.words = wordsArray;

  this.secretWord = this.words[Math.floor((Math.random() * this.words.length))];
  
  this.wrongLetters = [];

  this.correctLetters = [];

  this.errorsLeft = 10;

  this.numberWrong = 0;

  this.numberCorrect = 0;

}

// HANGMAN GAME PROTOTYPE FUNCTIONS

// FUNCTION TO MAKE SURE INPUT IS A LETTER, AND THERE'S ONLY ONE CHARACTER OF INPUT

Hangman.prototype.checkIfLetter = function(userInput) {
    
console.log(userInput);

  if (userInput >= 65 || userInput <= 90) {
    console.log(`checkIfLetter true`);
    return true;
    } else {
      console.log(`checkIfLetter false`);
      return false;
    }
  }

  // Hangman.prototype._checkClickedLetters = function(key) {
  //   return this.letters.indexOf(key.toUpperCase()) == -1 ? true : false;
  // };

Hangman.prototype.checkClickedLetters = function (letter) {
  
  if (theGame.correctLetters.includes(letter) || theGame.wrongLetters.includes(letter)) {
    console.log('This letter has already been called.')
    return false;
  } else {
    return true;
  }
  
};

Hangman.prototype.addCorrectLetter = function (letter) {

  if (theGame.secretWord.includes(letter)) {

      for (i = 0; i < theGame.secretWord.length; i++) {
        if(letter === theGame.secretWord[i]){
          theGame.correctLetters.push(letter);
      }
    }
    console.log("====",theGame.correctLetters);
  };
}

Hangman.prototype.addWrongLetter = function (letter) {
  this.errorsLeft--;
  this.numberWrong++;
  this.wrongLetters.push(letter);
  console.log(`Correct letters: ${theGame.correctLetters}`);
};

Hangman.prototype.checkGameOver = function () {
  if (theGame.errorsLeft === 0) {
    alert(`Sorry, better luck killing an innocent Hangman next time!`);
    theGame = new Hangman(words);
    console.log(theGame.secretWord);
  }
}

Hangman.prototype.checkWinner = function () {
  if (theGame.correctLetters.length === theGame.secretWord.length) {
    alert(`Amazing, you've killed an innocent Hangman!`);
    theGame = new Hangman(words);
    console.log(theGame.secretWord);
  }
};

Hangman.prototype.guessLetter = function(letter) {
  if (this.secretWord.includes(letter)) {
    this.addCorrectLetter(letter);
    // PLACEHOLDER FOR ADDING LETTER TO WORD LINES
    console.log(`Nice! ${letter} is part of the secret word!`)
  } else {
    this.addWrongLetter(letter);
    // PLACEHOLER FOR ADDING BODY + ADDING LETTER TO LIST OF WRONG LETTERS
    console.log(`Sorry, ${letter} isn't part of the secret word!`)
  }
}

// DECLARING VARS TO MAKE GAME WORK

var checkButton = document.getElementById('check-button');

document.getElementById('start-game-button').onclick = function () {

  var theCanvas = new HangmanCanvas()

  document.onkeydown = function(e) {
    if(theGame.checkIfLetter(e.keyCode) && theGame.checkClickedLetters(e.key)){
      
      var key = e.key.toUpperCase();
      
      theGame.guessLetter(key);
  
      theGame.checkGameOver();
  
      theGame.checkWinner();

  }}};


var theGame = new Hangman(words);

console.log(theGame.secretWord);