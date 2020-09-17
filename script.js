// 1. Accessing DOM elements

const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
let timer = [0, 0, 0, 0];
let interval;
let timerRunning = false;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}
// Run a standard minute/second/hundredths timer:

function runTimer() {
  let currentTime;
  currentTime =
    leadingZero(timer[0]) +
    ":" +
    leadingZero(timer[1]) +
    ":" +
    leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor(timer[3] / 100 / 60);
  timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
  timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
}

// 4. Match the text entered with the provided text on the page:
function spellCheck() {
  let textEntered;
  textEntered = testArea.value;
  //console.log(textEntered);
  let originTextMatch = originText.substring(0, textEntered.length);

  if (textEntered == originText) {
    clearInterval(interval);
    testWrapper.style.borderColor = "green";
  } else {
    if (textEntered == originTextMatch) {
      testWrapper.style.borderColor = "blue";
    } else {
      testWrapper.style.borderColor = "#E95D0F";
    }
  }
}

// 3. Start the timer:
function start() {
  let textEnteredLength;
  textEnteredLength = testArea.value.length;
  //console.log(textEnteredLength);

  if (textEnteredLength === 0 && !timerRunning) {
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }
}

// Reset everything:
function reset() {
  //console.log("reset done!");
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timerRunning = false;
  testArea.value = "";
  theTimer.innerHTML = "00:00:00";
  testWrapper.style.borderColor = "grey";
}

// 2. Event listeners for keyboard input (to detect typing) and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
