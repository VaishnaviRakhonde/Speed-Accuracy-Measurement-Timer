// Ensure the nav link exists in your HTML before querying it
const navLink = document.querySelector('.nav-link');

// Add click event listener to the link if it exists
if (navLink) {
    navLink.addEventListener('click', () => {
        // Toggle 'active' class for the link
        navLink.classList.toggle('active');
    });
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

let timer;
let totalTime = 0;
let isRunning = false;

const clockElement = document.getElementById('clock');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');

startButton.addEventListener('click', () => {
    if (isRunning) return;

    const minutes = parseInt(minutesInput.value) || 0;  // Default to 0 if invalid input
    const seconds = parseInt(secondsInput.value) || 0;  // Default to 0 if invalid input
    totalTime = minutes * 60 + seconds;

    if (totalTime > 0) {
        isRunning = true;
        timer = setInterval(() => {
            if (totalTime <= 0) {
                clearInterval(timer);
                isRunning = false;
                return;
            }
            totalTime--;
            const minutesLeft = Math.floor(totalTime / 60);
            const secondsLeft = totalTime % 60;
            clockElement.textContent = `${formatTime(minutesLeft)}:${formatTime(secondsLeft)}`;
        }, 1000);
    }
});

stopButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    totalTime = 0;
    clockElement.textContent = '00:00';
    minutesInput.value = '';
    secondsInput.value = '';
});
