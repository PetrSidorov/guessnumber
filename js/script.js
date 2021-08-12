'use strict';
import { getLocalStorage } from "./localStorage.js";
let gameHistory = getLocalStorage();
console.log(gameHistory)
let scoreBox = document.querySelector('.score');
const checkBtn = document.querySelector('.guess');
let messageBox = document.querySelector('.message');
const numberBox = document.querySelector('.number');
const reset = document.querySelector('.again');
const highScoreBox = document.querySelector('.highscore');

let highScore = 0;
gameHistory.length === 0 ? highScore = 0 : highScore = gameHistory[0].highScore;
highScoreBox.textContent = highScore;
let score = 20;
let secretNumber = randomNumber();
scoreBox.textContent = score;

function randomNumber() {
    return Math.trunc(Math.random() * 20) + 1;
}

const displayMessage = (message) => {
    messageBox.textContent = message;
}

document.querySelector('.check').addEventListener('click', () => {
    const guess = Number(checkBtn.value);
    if (!guess) {
        message.textContent = '❌ No number!';
    } else if (guess === secretNumber) {
        if (score > 1) {
            displayMessage('🎉 Your guess is correct!');
            scoreBox.textContent = 0;
            numberBox.textContent = secretNumber;
            document.querySelector('body').style.backgroundColor = '#60b347';
            numberBox.style.width = '30rem';
            if (score > highScore) {
                highScore = score;
                highScoreBox.textContent = highScore;
                gameHistory.shift(1,1);
                gameHistory.push({
                    highScore: highScore,
                });
                localStorage.setItem('guessGame', JSON.stringify(gameHistory));
            }
        } else {
            displayMessage('You lost the game!');
        }

    } else if (guess !== secretNumber) {
        if (score > 1) {
            displayMessage(guess > secretNumber ? 'Your guess is too high!' : 'Your guess is too low!');
            score--;
            scoreBox.textContent = score;
        } else {
            message.textContent = 'You lost the game!';
        }
    }
});

reset.addEventListener('click', () => {
    score = 20;
    secretNumber = randomNumber();
    console.log(secretNumber)
    numberBox.textContent = '?';
    checkBtn.value = '';
    displayMessage('Start guessing...');
    document.querySelector('body').style.backgroundColor = '#222';
    numberBox.style.width = '15rem';
});