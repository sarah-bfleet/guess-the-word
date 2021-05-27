// unordered list where player's guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
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
let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};
getWord();

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

guessBtn.addEventListener("click", function (e) {
    e.preventDefault();
    //empty message paragraph
    message.innerText = "";
    //grab what was entered in the input
    const guess = letterInput.value;
   //make sure that it is a single letter 
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A-Z";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();

    //checking to see if the player already guessed the same letter
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Please try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        guessesRemaining(guess);
        updatePage();
        updateWord(guessedLetters);
    }
};


// function to update page with the letters the player guesses 
const updatePage = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
    } 
};

// function to update the word in progress that accepts the guessedLetters array as a parameter 

const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }  
    wordInProgress.innerText = revealWord.join("");
    wonGame();
};

const guessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        remainingSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingSpan.innerText = `${remainingGuesses} guesses`;
        }
};

const wonGame = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = "<p class='highlight'>You guessed the correct word! Congrats!</p>";
    }
};

