// Navigation and Sub Navigation

import Navigation from './components/navigation';

const links = document.querySelectorAll('.nav_links > li > a');
const pages = document.querySelectorAll('.page-container');

var nav = new Navigation(links, pages);
nav.getLinks();

nav.links.forEach(function(link) {
  link.addEventListener('click', function() {
    let pageID = nav.getHash(link);
    nav.setPage(pageID);
  })
}) 
// ^^ Each time the user clicks a page, it will get the correct # 
// and set the page to the correct link

const subLinks = document.querySelectorAll('.sub_nav > ul > li > a');
const subPages = document.querySelectorAll('.sub-page-container');

var subNav = new Navigation(subLinks, subPages);

subNav.links.forEach((link) => {
  link.addEventListener('click', function () {
    let pageID = subNav.getHash(link);
    subNav.setPage(pageID);
  })
})
// ^^ Each time the user clicks a page, it will get the correct # 
// and set the page to the correct link

// Pomodoro Timer Logic
// Reference: https://codepen.io/rajdgreat007/pen/ZpZWbw/
// Manipulated this code for the timer to succesfully countdown
// Changed and interated my code to 

var pomodoro = {
  minutes : 0,
  seconds : 0,
  init : function(){
    var time = this;
    this.minutesDom = document.querySelector('#minutes');
    this.secondsDom = document.querySelector('#seconds');
    this.interval = setInterval(function(){
      time.intervalCallback.apply(time);
    }, 1000);
    document.querySelector('#study').onclick = function(){
      time.startWork.apply(time);
    };
    document.querySelector('#shortBreak').onclick = function(){
      time.startShortBreak.apply(time);
    };
    document.querySelector('#longBreak').onclick = function(){
      time.startLongBreak.apply(time);
    };
    document.querySelector('#stop').onclick = function(){
      time.stopTimer.apply(time);
    };
  },
  resetVariables : function(mins, secs, started){
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
  },
  startWork: function() {
    this.resetVariables(25, 0, true);
  },
  startShortBreak : function(){
    this.resetVariables(5, 0, true);
  },
  startLongBreak : function(){
    this.resetVariables(15, 0, true);
  },
  stopTimer : function(){
    this.resetVariables(25, 0, false);
    this.updateDom();
  },
  toDoubleDigit : function(num){
    if(num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  },
  updateDom : function(){
    this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
    this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
  },
  intervalCallback : function(){
    if(!this.started) return false;
    if(this.seconds == 0) {
      if(this.minutes == 0) {
        this.timerComplete();
        return;
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.updateDom();
  },
  timerComplete : function(){
    this.started = false;
  }
};
window.onload = function(){
pomodoro.init();
};

// Stop Watch Logic

let [milliseconds,seconds,minutes] = [0,0,0];
let timerRef = document.querySelector('#stopwatchDisplay');
timerRef.innerHTML = '00 : 00 : 000';
let int = null;

document.getElementById('startTimer').addEventListener('click', ()=>{
    if(int!==null){
        clearInterval(int);
    }
    int = setInterval(displayTimer,10);
});

document.getElementById('stopTimer').addEventListener('click', ()=>{
    clearInterval(int);
});

document.getElementById('resetTimer').addEventListener('click', ()=>{
    clearInterval(int);
    [milliseconds,seconds,minutes] = [0,0,0];
    timerRef.innerHTML = '00 : 00 : 000';
});

function displayTimer(){
    milliseconds+=10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
        }
    }
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    timerRef.innerHTML = `${m} : ${s} : ${ms}`;
}

//Task Pop-up Window

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', ()=> {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if(modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if(modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}