/////////////////////////////////////
///   [ Hip, Hip, ARRAYS!!! ]    ///
////////////////////////////////////

const phrase = [
    ['b', 'r', 'a', 'n', 'd', 'o', 'n'],
    ['j', 'a', 'c', 'k'],
    ['e', 'n', 'j', 'o', 'i'],
    ['i', 'n', 'v', 'o', 'k', 'e'],
    ['a', 'g', 'i', 'n']
];

//////////////////////////////////////////////
////////    Variables   /////////////////////
////////////////////////////////////////////

let missed = 0;
//user stored input
let userInt;
// Store current word
let currentLetters = getRandomPhraseAsArrayy(phrase);
let lostHeart = 5;
let correct = [];
let incorrect = [];
let correctAnswer = 0;
const playAgainButton = document.createElement('button');
const mainContainer = document.querySelector('.main-container');
const heading = document.createElement('h1');
const div = document.createElement('div');
const scoreBoard = document.querySelector('#scoreboard-list');
const scoreboardList = scoreBoard.children;
const overlay = document.getElementById('overlay');
const keyboardRows = document.getElementById('qwerty');

/////////////////////////////////////
///////// FUNCTIONS ////////////////
///////////////////////////////////

function getRandomPhraseAsArrayy( arr ) {
        let phrases = phrase [ Math.floor (Math.random() * phrase.length ) ];
        console.log(phrases + ' is the log');
        return phrases;
}

//append the getRandomPhraseAsArrayy(); letters generated to <li> element
function addPhraseToDisplay( phrases ){
    const newUl = document.getElementById('phrase');
    const UlLastOf = newUl.lastChild;
    const newLi = document.createElement('li');
    newLi.setAttribute('class', 'letter');
    newLi.innerHTML += phrases;
    UlLastOf.append(newLi);
}

// Create a new ul for the li children
function addNewUlToDisplay( Ul ) {
  const addPhrase = document.getElementById('phrase');
  const newUl = document.createElement('ul');
  newUl.setAttribute('style', 'width:100%;')
  addPhrase.append(newUl);
}

//Add word to screen on load. AKA Build
function loopThrewArray( letter ) {
  //add ul to screen
  addNewUlToDisplay();
  letter = currentLetters;
  for (var i = 0; i < letter.length; i++) {
    //for all the letters in the array add them in there own <li> elements
    addPhraseToDisplay(letter[i]);
  }

}

// function removes one heart each time missed++
function removeHeart(lostHeart) {
  scoreboardList[lostHeart].classList.remove('tries');
  scoreboardList[lostHeart].classList.add('lost-heart');
}

// Shows the letter if guess is in the current array
function revealUserLetter(num) {
  const showLetter = document.querySelectorAll('.letter');
  const showLetterChange = showLetter[num];
  showLetterChange.classList.add('show');
}

//Check to see if user selected letter matches any letters in the current word.
function checkLetter( arr ) {
  let letterSelect;
  for (var i = 0; i < arr.length; i++) {
    currentL = arr;

    if (userInt === currentL[i]) {
            revealUserLetter(i);
            correctAnswer ++;
            correct.push(currentL[i]);
            letterSelect = userInt;
            console.log(letterSelect);
          }
  }
  if (letterSelect) {
      console.log('Your Right!');
      return letterSelect;
  } else {
    return null;
  }
}

//Checks if the game is won, over, or still playing.
function checkScore(score){
  if (currentLetters.length === correct.length) {
    gameWonScreen();
    console.log('YOU WIN!!');
  } else if (missed === 5) {
    gameOverScreen();
    console.log('You LOSE!! LOL');
  }
}

// If the game is over show the game over screen
function gameOverScreen(screen) {
  overlay.style.display = 'flex';
  const oneWord = currentLetters.join('');
  const gameOverOverlay = overlay.children;
  const a = gameOverOverlay[1].innerHTML = 'Replay &#9735;';
  const h1 = gameOverOverlay[0].innerHTML = 'The Word Was '+ '<br>" ' + oneWord + ' "<br>' + ' Better Luck Next Time';
}

// If the game is won show the game over screen
function gameWonScreen(screen) {
  overlay.style.display = 'flex';
  const oneWord = currentLetters.join('');
  const gameOverOverlay = overlay.children;
  const a = gameOverOverlay[1].innerHTML = 'Continue &#9735;';
  const h1 = gameOverOverlay[0].innerHTML = 'The Word Was '+ '<br>" ' + oneWord + ' "<br>' + ' Good Job!!';
}


///////////////////////////////////////////////////
////////////// EVENTS ////////////////////////////
/////////////////////////////////////////////////

// Keybord event listener
keyboardRows.addEventListener('click', (btn) => {
      userInt = btn.target.textContent;
      if (btn.target.tagName === 'BUTTON') {
        const userInt = btn.target;
        userInt.classList.add('chosen');
        userInt.disabled = true;
        const letterFound = checkLetter(currentLetters);
        if (letterFound === null) {
          missed++;
          console.log('You missed ' + missed + ' out of 5 tries');
          lostHeart--;
          removeHeart(lostHeart);
        }
        checkScore();
      }
  });

// Hide overlay to play the game when the start button is invoked
overlay.addEventListener('click', (e) => {
  if (e.target.textContent === 'Start Game') {
    overlay.style.display = 'none';
    loopThrewArray(phrase);
  } else if (e.target.textContent !== 'Start Game') {
    //restart the game fresh.
    window.location.reload(true);
  }
  else {
    console.log('Something went wrong with the overlay event listener');
  }
});
