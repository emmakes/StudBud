// Reference: https://www.freecodecamp.org/news/how-i-built-my-pomodoro-clock-app-and-the-lessons-i-learned-along-the-way-51288983f5ee/
// I used this code to successfully 

let countdown = 0;
let seconds = 0;
let remaining = 0;
let isBreak = true;
let isPaused = true;
const status = document.querySelector("#status");
const timerDisplay = document.querySelector(".timerDisplay");
const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const workMin = document.querySelector("#work-min");
const breakMin = document.querySelector("#break-min");
const alarm = document.createElement('audio');
alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

// Event Listeners for start and reset buttons
startBtn.addEventListener('click', function () {
  clearInterval(countdown);
  if (isPaused) {
    startCountdown();
    startBtn.textContent = "Pause";
    isPaused = false;
  } else {
    remaining = seconds;
    startBtn.textContent = "Continue";
    isPaused = true;
  }
})

resetBtn.addEventListener('click', function() {
  clearInterval(countdown);
  seconds = workMin.textContent * 60;
  countdown = 0;
  remaining = 0;
  isPaused = true;
  isBreak = true;
  status.textContent = "Keep Working";
  startBtn.textContent = "Start";
  displayTimeLeft(seconds);
})

// functions for the timer, starting the countdown and updating the display
function timer() {
  seconds --;
  if (seconds < 0) {
    clearInterval(countdown);
    alarm.currentTime = 0;
    alarm.play();

    if (isBreak) {
      seconds = breakMin.textContent * 60;
      status.textContent = "Take a Break!";
      isBreak = false;
    } else {
      seconds = workMin.textContent * 60;
      status.textContent = "Keep Working";
      isBreak = true;
    }
    countdown = setInterval(timer, 1000);
    return;
  }
  displayTimeLeft(seconds); // Keep updating display
}

function startCountdown() {
  if (remaining != 0) {
    seconds = remaining;
  } else {
    seconds = workMin.textContent * 60;
    status.textContent = "Keep Working";
  }
  countdown = setInterval(timer, 1000);
}

// Time remaining
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

// Update work and break times, so that user can choose how much time to spend on working and how much break time
const workPlus = document.querySelector("#work-plus");
const workMinus = document.querySelector("#work-minus");
const breakPlus = document.querySelector("#break-plus");
const breakMinus = document.querySelector("#break-minus");

workPlus.addEventListener('click', function () {
  let x = parseInt(workMin.textContent);          
  if (x < 60) {
    workMin.textContent = x+5;
  }                       
})

workMinus.addEventListener('click', function () {
  let x = parseInt(workMin.textContent);          
  if (x > 5) {
    workMin.textContent = x-5;
  }                       
})

breakPlus.addEventListener('click', function () {
  let x = parseInt(breakMin.textContent);          
  if (x < 60) {
    breakMin.textContent = x+5;
  }                       
})

breakMinus.addEventListener('click', function () {
  let x = parseInt(breakMin.textContent);          
  if (x > 5) {
    breakMin.textContent = x-5;
  }                       
}) 