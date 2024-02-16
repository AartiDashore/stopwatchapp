let isRunning = false;
let isPaused = false;
let startTime;
let elapsedTime = 0;
let laps = [];
let timerInterval;
let darkMode = false;

function start() {
    if (!isRunning) {
        isRunning = true;
        isPaused = false;
        startTime = new Date().getTime() - elapsedTime;
        updateDisplay();

        // Update every 10 milliseconds
        timerInterval = setInterval(updateDisplay, 10);
    }
}

function stop() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
    }
}

function togglePlayPause() {
    if (isRunning) {
        if (isPaused) {
            const modeIcon1 = document.getElementById("modeIcon1");
            modeIcon1.className = isPaused ? "fas fa-pause" : "fas fa-play";
            resume();
        } else {
            const modeIcon1 = document.getElementById("modeIcon1");
            modeIcon1.className = isRunning ? "fas fa-play" : "fas fa-pause";
            pause();
        }
    } else {
        start();
    }
}

function resume() {
    isPaused = false;
    startTime = new Date().getTime() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
}

function pause() {
    if (isRunning) {
        isPaused = true;
        clearInterval(timerInterval);
    }
}

function lap() {
    if (isRunning) {
        laps.push(elapsedTime);
        updateLapList();
    }
}

function clearLaps() {
    laps = [];
    updateLapList();
}

function reset() {
    stop();
    isPaused = false;
    elapsedTime = 0;
    laps = [];
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    document.getElementById("milliseconds").innerText = "000";
}

function updateDisplay() {
    let currentTime = new Date().getTime();
    elapsedTime = currentTime - startTime;

    let formattedTime = formatTime(elapsedTime);
    document.getElementById("hours").innerText = formattedTime.hours;
    document.getElementById("minutes").innerText = formattedTime.minutes;
    document.getElementById("seconds").innerText = formattedTime.seconds;
    document.getElementById("milliseconds").innerText = formattedTime.milliseconds;
}

function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = time % 1000;

    return {
        hours: padZero(hours),
        minutes: padZero(minutes),
        seconds: padZero(seconds),
        milliseconds: padZeroMilliseconds(milliseconds)
    };
}

function padZero(number) {
    return number < 10 ? "0" + number : number;
}

function padZeroMilliseconds(milliseconds) {
    return milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
}

function updateLapList() {
    let lapList = document.getElementById("lapList");
    lapList.innerHTML = "";
    
    laps.forEach((lapTime, index) => {
        let lapItem = document.createElement("li");
        lapItem.innerText = `Lap ${index + 1}: ${formatTime(lapTime).hours}:${formatTime(lapTime).minutes}:${formatTime(lapTime).seconds}.${formatTime(lapTime).milliseconds}`;
        lapList.appendChild(lapItem);
    });
}

function toggleMode() {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-mode", darkMode);

    // Change icon based on mode
    const modeIcon = document.getElementById("modeIcon");
    modeIcon.className = darkMode ? "fas fa-sun" : "fas fa-moon";
}