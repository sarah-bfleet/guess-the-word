// unordered list where player's guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
//button with the text "Guess"
const guessBtn = document.querySelector(".guess");
//text input where the plyaer will guess a letter
const letterInput = document.querySelector(".letter");
//empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//paragraph where the remaining guesses will appear
const remaining = document.querySelector(".remaining");
 //span inside the paragraph wehre the remaining guesses will display
const remainingSpan = document.querySelector(".remaining span");
//The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
//the hidden button that will appear prompting the player to play again
const playAgainBtn = document.querySelector(".play-again");
//starting word until we fetch words from a hosted file later 

const word = "magnolia";

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});