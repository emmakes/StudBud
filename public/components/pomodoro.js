
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