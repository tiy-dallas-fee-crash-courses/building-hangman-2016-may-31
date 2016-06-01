var words = ['links', 'card', 'puppies', 'button', 'vision', 'patagonia', 'emergency', 'mephisto', 'egyptian', 'octothorpe'];
var lettersChosen = [];
var step = 0;
var randomWord;

chooseRandomWord();

console.log(randomWord);


var wordDisplayDiv = document.querySelector('#word-display')
var guessInput = document.querySelector('#guess-input');
var guessButton = document.querySelector('#guess');
var manImage = document.querySelector('#man-display');


wordDisplayDiv.textContent = mask(randomWord, lettersChosen);
guessButton.addEventListener('click', guessButtonClicked);

function mask(word, lettersChosen) {
  var returnValue = '';
  for (var letter of word) {

    if (lettersChosen.indexOf(letter) > -1) {
      //they have chosen it
      returnValue = returnValue + letter;
    }
    else {
      //they have not chosen it
      returnValue = returnValue + '_';
    }
  }
  return returnValue;
}

function guessButtonClicked() {
  var val = guessInput.value;
  lettersChosen.push(val);

  guessInput.value = '';
  guessInput.focus();

  if (randomWord.indexOf(val) === -1) {
    step = step + 1;
    if (step === 6) {
      alert('your lack of vocabulary guessing skills has killed an innocent man.');
      restartGame();
    }
    updateHangmanImage();
  }
  else {
    var newMaskedWord = mask(randomWord, lettersChosen);
    wordDisplayDiv.textContent = newMaskedWord;

    if (newMaskedWord.indexOf('_') === -1) {
      alert('you are the winner');
      restartGame();
    }
  }
}

function updateHangmanImage() {
  manImage.src = 'step-' + step + '.png';
}

function restartGame() {
  lettersChosen = [];
  step = 0;
  chooseRandomWord();
  wordDisplayDiv.textContent = mask(randomWord, lettersChosen);
  console.log('lettersChosen', lettersChosen, 'step', step, 'randomWord', randomWord);
}

function chooseRandomWord() {
  var randomNumber = Math.random() * words.length;
  randomNumber = Math.floor(randomNumber);
  randomWord = words[randomNumber];
}
