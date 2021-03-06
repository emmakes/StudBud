// Stop Watch Logic
// Reference: https://codepen.io/Coding-Artist/pen/eYBMgQm
// This code reference was useful in coding the counter and coding the event listeners that I needed to use

let [milliseconds,seconds,minutes] = [0,0,0];
let timerRef = document.querySelector('#stopwatchDisplay');
timerRef.innerHTML = '00 : 00 : 000';
let int = null;

document.getElementById('startTimer').addEventListener('click', function () {
    if(int!==null){
        clearInterval(int);
    }
    int = setInterval(displayTimer,10);
});

document.getElementById('stopTimer').addEventListener('click', function () {
    clearInterval(int);
});

document.getElementById('resetTimer').addEventListener('click', function () {
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
