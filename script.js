const secretWords = ['apple', 'banana', 'grape', 'peach', 'orange'];
let secretWord = secretWords[Math.floor(Math.random() * secretWords.length)];
let attemptsLeft = 5;
const messageDiv = document.getElementById('message');
const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const restartBtn = document.getElementById('restartBtn');

console.log("Secret word (for testing):", secretWord); // For developer testing

function handleGuess() {
  let userGuess = guessInput.value.trim().toLowerCase();

  if (!userGuess) {
    displayMessage("⚠️ Please enter a word before submitting!");
    return;
  } else if (userGuess === secretWord) {
    displayMessage("🎉 Congratulations! You guessed the secret word!", 'win');
    endGame(true);
  } else {
    attemptsLeft--;
    if (attemptsLeft > 0) {
      displayMessage(`❌ Incorrect guess. You have ${attemptsLeft} attempts left. Try again!`);
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
  console.log("New secret word (for testing):", secretWord);
}

// Event Listeners
submitBtn.addEventListener('click', handleGuess);
restartBtn.addEventListener('click', restartGame);
guessInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    handleGuess();
  }
});
