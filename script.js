const secretWords = ['apple', 'banana', 'grape', 'peach', 'orange'];
let secretWord = secretWords[Math.floor(Math.random() * secretWords.length)];
let attemptsLeft = 5;
const messageDiv = document.getElementById('message');
const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const restartBtn = document.getElementById('restartBtn');
const firstLetterSpan = document.getElementById('firstLetter');

// Show first letter hint
firstLetterSpan.textContent = secretWord[0].toUpperCase();

console.log("Secret word (for testing):", secretWord); // For developer testing

function handleGuess() {
  let userGuess = guessInput.value.trim().toLowerCase();

  if (!userGuess) {
    attemptsLeft--;
    if (attemptsLeft > 0) {
      displayMessage(`Empty guess. You have ${attemptsLeft} attempts left. Try again!`);
    } else {
      displayMessage(`💀 Game over! The secret word was '${secretWord}'.`, 'lose');
      endGame(false);
    }
    guessInput.value = '';
    return;
  } else if (userGuess === secretWord) {
    displayMessage("🎉 Congratulations! You guessed the secret word!", 'win');
    endGame(true);
  } else {
    attemptsLeft--;
    if (attemptsLeft > 0) {
      displayMessage(`Incorrect guess. You have ${attemptsLeft} attempts left. Try again!`);
    } else {
      displayMessage(`💀 Game over! The secret word was '${secretWord}'.`, 'lose');
      endGame(false);
    }
  }

  guessInput.value = '';
}

function displayMessage(msg, status = '') {
  messageDiv.textContent = msg;
  document.body.className = status;
  
  if (status === 'win') {
    // Play win sound
    document.getElementById('winSound').play();
    
    // Confetti effect
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
    });
  } else if (status === 'lose') {
    // Play lose sound
    document.getElementById('loseSound').play();
  }
}

function endGame(won) {
  submitBtn.disabled = true;
  submitBtn.style.display = won ? 'none' : 'inline';
  guessInput.disabled = true;
  restartBtn.style.display = 'inline';
}

function restartGame() {
  secretWord = secretWords[Math.floor(Math.random() * secretWords.length)];
  attemptsLeft = 5;
  guessInput.value = '';
  guessInput.disabled = false;
  submitBtn.disabled = false;
  submitBtn.style.display = 'inline';
  messageDiv.textContent = '';
  document.body.className = '';
  restartBtn.style.display = 'none';
  firstLetterSpan.textContent = secretWord[0].toUpperCase();
  console.log("New secret word (for testing):", secretWord);
}

// Play button click sound
function playButtonSound() {
  const buttonSound = document.getElementById('buttonSound');
  buttonSound.currentTime = 0; // Reset sound to start
  buttonSound.play();
}

// Event Listeners
submitBtn.addEventListener('click', function() {
  playButtonSound();
  handleGuess();
});
restartBtn.addEventListener('click', function() {
  playButtonSound();
  restartGame();
});
guessInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    handleGuess();
  }
});