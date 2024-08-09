let startTime;
let updatedTime;
let difference = 0; 
let timerInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startTimer() {
    startTime = new Date().getTime() - difference;
    timerInterval = setInterval(function() {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;
        display.innerHTML = timeFormatter(difference);
    }, 1000 / 60);
    running = true;
    lapBtn.disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    running = false;
    lapBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    difference = 0; // Reset difference to 0
    display.innerHTML = "00:00:00";
    laps.innerHTML = '';
    running = false;
    lapBtn.disabled = true;
    lapCounter = 0;
}

function recordLap() {
    lapCounter++;
    const li = document.createElement('li');
    li.innerHTML = `Lap ${lapCounter}: ${display.innerHTML}`;
    laps.appendChild(li);
}

function timeFormatter(time) {
    let date = new Date(time);
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
    let milliseconds = Math.floor(date.getUTCMilliseconds() / 10);

    return `${pad(minutes, 2)}:${pad(seconds, 2)}:${pad(milliseconds, 2)}`;
}

function pad(number, digits) {
    return number.toString().padStart(digits, '0');
}

startPauseBtn.addEventListener('click', function() {
    if (running) {
        pauseTimer();
        startPauseBtn.innerHTML = 'Start';
    } else {
        startTimer();
        startPauseBtn.innerHTML = 'Pause';
    }
});

resetBtn.addEventListener('click', function() {
    resetTimer();
    startPauseBtn.innerHTML = 'Start';
});

lapBtn.addEventListener('click', recordLap);
