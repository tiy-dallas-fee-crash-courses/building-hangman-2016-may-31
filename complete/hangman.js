//Data/State
var words = ['pleonastic', 'dinosaur', 'philanthropist', 'antarctica', 'meteorologist'];
var randomWordNumber;
var chosenWord;
var chosenLetters;
var step;

//DOM elements
var wordDisplayDiv = document.querySelector('#word-display');
var guessButton = document.querySelector('#guess');
var guessInput = document.querySelector('#guess-input');
var hangmanImage = document.querySelector('#man-display');

guessButton.addEventListener('click', guessClicked);



//Useful functions
function maskWord() {
  var maskedWord = '';
  for(var letter of chosenWord) {
    if (chosenLetters.indexOf(letter) > -1) {
      maskedWord += letter;
    }
    else {
      maskedWord += '_';
    }
  }
  return maskedWord;
}

function guessClicked() {
  var val = guessInput.value;

  if (chosenWord.indexOf(val) > -1) {
    chosenLetters.push(val);
    var maskedWord = maskWord();
    wordDisplayDiv.textContent = maskedWord;

    if (maskedWord.indexOf('_') === -1) {
      alert('you win!');
      startNewGame();
    }
  }
  else {
    step = step + 1;
    updateImage();

    if (step === 6) {
      setTimeout(function() {
        alert('You have failed! The correct answer is ' + chosenWord + '!');
        startNewGame();
      }, 10); //delayed to allow the browser to possibly download and render the new image before the alert.
    }
  }

  guessInput.value = '';
  guessInput.focus();
}

function updateImage() {
  hangmanImage.src = 'step-' + step + '.png';
}

function startNewGame() {
  randomWordNumber = Math.floor(Math.random() * words.length);
  chosenWord = words[this.randomWordNumber];
  chosenLetters = [];
  step = 0;
  hangmanImage.src = 'step-' + step + '.png';
  var maskedWord = maskWord();
  wordDisplayDiv.textContent = maskedWord;
}

startNewGame();
