document.addEventListener('DOMContentLoaded', function() {
    const choiceBtns = document.querySelectorAll('.choice-btn');
    const playerScoreEl = document.getElementById('player-score');
    const computerScoreEl = document.getElementById('computer-score');
    const tiesEl = document.getElementById('ties');
    const resultEl = document.getElementById('result');
    const resetBtn = document.getElementById('reset-btn');
    
    let playerScore = 0;
    let computerScore = 0;
    let ties = 0;
    
    // Game logic
    function playGame(playerChoice) {
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        
        let result;
        
        if (playerChoice === computerChoice) {
            result = "It's a tie!";
            ties++;
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            result = `You win! ${playerChoice} beats ${computerChoice}`;
            playerScore++;
        } else {
            result = `You lose! ${computerChoice} beats ${playerChoice}`;
            computerScore++;
        }
        
        // Update UI
        playerScoreEl.textContent = playerScore;
        computerScoreEl.textContent = computerScore;
        tiesEl.textContent = ties;
        resultEl.textContent = result;
    }
    
    // Event listeners
    choiceBtns.forEach(button => {
        button.addEventListener('click', function() {
            playGame(this.dataset.choice);
        });
    });
    
    resetBtn.addEventListener('click', function() {
        playerScore = 0;
        computerScore = 0;
        ties = 0;
        
        playerScoreEl.textContent = '0';
        computerScoreEl.textContent = '0';
        tiesEl.textContent = '0';
        resultEl.textContent = '';
    });
});