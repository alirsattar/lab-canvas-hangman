
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
    

  if (userInput >= 65 || userInput <= 90) {
    
    return true;
    } else {
      
      return false;
    }
  }

  // Hangman.prototype._checkClickedLetters = function(key) {
  //   return this.letters.indexOf(key.toUpperCase()) == -1 ? true : false;
  // };

Hangman.prototype.checkClickedLetters = function (letter) {
  
// console.log('Function is getting to checkClickedLetters');

if (this.correctLetters.includes(letter) || this.wrongLetters.includes(letter)) {
    console.log('This letter has already been called.');
    this.addWrongLetter(letter);
    this.checkGameOver();
    return false;
  } else {
    return true;
  }
  
};

Hangman.prototype.addCorrectLetter = function (letter) {

  if (this.secretWord.includes(letter)) {

      for (i = 0; i < this.secretWord.length; i++) {
        if(letter === this.secretWord[i]){
          this.correctLetters.push(letter);
          // console.log(this.correctLetters);
      }
    }
    // console.log("Correct letters: ",this.correctLetters);
  };
}

Hangman.prototype.addWrongLetter = function (letter) {
  this.errorsLeft--;
  this.numberWrong++;
  this.wrongLetters.push(letter);
  // console.log(`Incorrect letters: ${this.wrongLetters}`);
};

Hangman.prototype.checkGameOver = function () {
  if (this.errorsLeft === 0) {
    alert(`Sorry, better luck killing an innocent Hangman next time!`);
    setTimeout(function(){ location.reload(); }, 2000);
    // console.log(this.secretWord);
  }
}

Hangman.prototype.checkWinner = function () {
  if (this.correctLetters.length === this.secretWord.length) {
    alert(`Amazing, you've killed an innocent Hangman!`);
    setTimeout(function(){ location.reload(); }, 2000);
    // console.log(this.secretWord);
  }
};

Hangman.prototype.guessLetter = function(letter) {
  if (this.secretWord.includes(letter)) {
    this.addCorrectLetter(letter);
    // PLACEHOLDER FOR ADDING LETTER TO WORD LINES
    // console.log(`Nice! ${letter} is part of the secret word!`);
  } else {
    this.addWrongLetter(letter);
    // PLACEHOLER FOR ADDING BODY + ADDING LETTER TO LIST OF WRONG LETTERS
    // console.log(`Sorry, ${letter} isn't part of the secret word!`)
  }
}

// DECLARING VARS TO MAKE GAME WORK

var checkButton = document.getElementById('check-button');

document.getElementById('start-game-button').onclick = function () {

  theGame = new Hangman(words);
  
  var theCanvas = new HangmanCanvas()

  console.log(theGame.secretWord);

  document.onkeydown = function(e) {
    // console.log('blah');
    // console.log(theGame.checkIfLetter(e.keyCode));
    // console.log('blah');
    // console.log(theGame.checkClickedLetters(e.key));
    
    var key = e.key.toUpperCase();
    
    if(theGame.checkIfLetter(e.keyCode) && theGame.checkClickedLetters(key)){

      theGame.guessLetter(key);
  
      theGame.checkWinner();

      theGame.checkGameOver();
    }

console.log(theGame);

  }};

