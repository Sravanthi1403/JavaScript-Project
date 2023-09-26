// ALL BUTTONS
const selectionButtons = document.querySelectorAll('[data-selection]');
const rulesBtn = document.querySelectorAll(".rules-btn");
const nextBtn = document.getElementById("next-btn");
const playAgainBtn = document.querySelector("#play-again");
const closeModalBtn =document.getElementById("close-button");

const rulesModal = document.getElementById("rules-modal");
const wonGame = document.querySelector(".won-game");
const playBoard = document.getElementById("play-board");

// RESULT
const resultSelection = document.querySelector(".result-selection");
const userResult = document.querySelector(".user-result");
const pcResult = document.querySelector(".pc-result");
let resultText1 = document.getElementById("result-text-1");
let resultText2 = document.getElementById("result-text-2");
let picked = document.querySelectorAll(".picked");

// SCORE
const computerScore = document.getElementById("computer-score");
const userScore = document.getElementById("user-score");

let score = {
    user: 0,
    computer: 0,
  };

// LOCAL STORAGE
if (localStorage.getItem("score")) {
  score = JSON.parse(localStorage.getItem("score"));
  console.log(score);
}

userScore.innerText = score.user;
computerScore.innerText = score.computer;

// EVENT-LISTENERS
rulesBtn.forEach((element) => {
  element.addEventListener("click", () => {
    rulesModal.style.display = "block";
  });
});

closeModalBtn.addEventListener("click", () => {
  rulesModal.style.display = "none";
});

nextBtn.addEventListener("click", () => {
  playBoard.style.display = "none";
  resultSelection.style.display = "none";
  wonGame.style.display = "flex";
});

playAgainBtn.addEventListener("click", playAgain);

const SELECTIONS = [
  {
    name: 'rock',
    beats: 'scissor'
  },
  {
    name: 'paper',
    beats: 'rock'
  },
  {
    name: 'scissor',
    beats: 'paper'
  }
]

// FUNCTIONS

function playAgain() {
  playBoard.style.display = "grid";
  resultSelection.style.display = "none";
  wonGame.style.display = "none";
  nextBtn.style.display = "none";
}

function setImg(picked) {
  let img = `<img src="images/${picked}.png" alt=${picked} class="${picked}div" />`;
  return img;
}

function setStyles() {
  playBoard.style.display="none";
  resultSelection.style.display= "flex";

}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name
}

// function incrementScore(scoreValue) {
//   scoreValue.innerText = parseInt(scoreValue.innerText) + 1
//}

function randomSelection(){
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
  return SELECTIONS[randomIndex]
}

// GAME LOGIC

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
      const selectionName = selectionButton.dataset.selection
      const userSelection = SELECTIONS.find(selection => selection.name === selectionName)
      decideWinnerSelection(userSelection)
      setStyles();
    })
  })

function decideWinnerSelection(userSelection){
  const computerSelection = randomSelection()
  const yourWinner = isWinner(userSelection, computerSelection)

  // FINDING WINNER
  if (userSelection === computerSelection) {
    removeFocus();
    userResult.style.marginTop = "100px";
    pcResult.style.marginTop = "100px";
    resultText1.innerText = "TIE UP";
    resultText2.innerText = "";
    playAgainBtn.innerText = "REPLAY";

  } else if (yourWinner){
    focusOnUserWinner();
    userResult.style.marginTop = "0px";
    pcResult.style.marginTop = "0px";
    resultText1.innerText = "YOU WIN" ;
    resultText2.innerText = "AGAINST PC";
    playAgainBtn.innerText = "PLAY AGAIN";
    nextBtn.style.display = "block";
    score.user++;

  } else{
    focusOnPCWinner();
    userResult.style.marginTop = "0px";
    pcResult.style.marginTop = "0px";
    resultText1.innerText = "YOU LOST" ;
    resultText2.innerText = "AGAINST PC";
    playAgainBtn.innerText = "PLAY AGAIN";
    score.computer++;
  }
  
  // ADDING RESULTS
  userResult.innerHTML = setImg(userSelection.name);
  pcResult.innerHTML = setImg(computerSelection.name);

  // UPDATING SCORES
  userScore.innerHTML = score.user;
  computerScore.innerHTML = score.computer;
  
  // SAVING SCORE IN LOCAL STRORAGE
  localStorage.setItem("score", JSON.stringify(score));
};

// Winner Boxes Styles

let winUserBox1 = document.querySelector(".user-box-1");
let winUserBox2 = document.querySelector(".user-box-2");
let winUserBox3 = document.querySelector(".user-box-3");
let winPcBox1 = document.querySelector(".pc-box-1");
let winPcBox2 = document.querySelector(".pc-box-2");
let winPcBox3 = document.querySelector(".pc-box-3");

function focusOnUserWinner(){
  winPcBox1.classList.remove("box-1");
  winPcBox2.classList.remove("box-2");
  winPcBox3.classList.remove("box-3");

  winUserBox1.classList.add("box-1");
  winUserBox2.classList.add("box-2");
  winUserBox3.classList.add("box-3");
};
function focusOnPCWinner(){
  winUserBox1.classList.remove("box-1");
  winUserBox2.classList.remove("box-2");
  winUserBox3.classList.remove("box-3");

  winPcBox1.classList.add("box-1");
  winPcBox2.classList.add("box-2");
  winPcBox3.classList.add("box-3");
};

function removeFocus() {
  
  winUserBox1.classList.remove("box-1");
  winUserBox2.classList.remove("box-2");
  winUserBox3.classList.remove("box-3");

  winPcBox1.classList.remove("box-1");
  winPcBox2.classList.remove("box-2");
  winPcBox3.classList.remove("box-3");
};
