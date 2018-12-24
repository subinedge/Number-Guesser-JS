// document.getElementById('game').addEventListener('submit', function(e) {
//   console.log('che che che !!!');
// });

//variables

let min = 1,
  max = 10,
  winningNum = getWinningNum(min, max),
  guessesLeft = 3;

// console.log(winningNum);

//UI Elements

const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessInput = document.querySelector('#guess-input'),
  guessBtn = document.querySelector('#guess-btn'),
  message = document.querySelector('.message');

// assign UI min max value

minNum.textContent = min;
maxNum.textContent = max;

//play again functionality adding
game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

//listen for click
guessBtn.addEventListener('click', function(e) {
  // console.log('che che che !!');

  //check these out
  //  empty or not ... between min and max ...

  let guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  //check for guess === winningNumber

  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct. You won !!!  Play Again`);
  } else {
    //subtract 1 from guessessleft

    guessesLeft--;

    if (guessesLeft === 0) {
      //game over - lost

      gameOver(
        false,
        `You lost the match ! The correct number is ${winningNum}. Play Again`
      );
    } else {
      // answer went wrong ... still guess is left

      //border color
      guessInput.style.borderColor = 'red';

      //clear input
      guessInput.value = '';

      // notify user about the wrong choice
      setMessage(
        `${guess} Incorrect !! You have ${guessesLeft} guesses left. Try Again`,
        'red'
      );
    }
  }

  e.preventDefault();
});

// game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');

  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  guessBtn.value = 'Play again';
  guessBtn.className += 'play-again';
  // console.log(guessBtn);
  setMessage(msg, color);
}

//winning number
function getWinningNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Message set on these conditions... (guess === NaN || guess < min  || guess > max)

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
