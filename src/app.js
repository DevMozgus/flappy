import mubuUp from "./mubuUp.png";
import mubuDown from "./mubuDown.png";
import audioFile from "./bruh.mp3";

const context = c.getContext("2d");
const birdUp = new Image();
birdUp.src = mubuUp;
const birdDown = new Image();
birdDown.src = mubuDown;
const audio = new Audio(audioFile);
let bestScore = 0;
let score = 0;
let birdX = 0;
let birdDY = 0;

let birdY = 300;
let pipeGap = 200;
let birdSize = 72;
let interval, pipeWidth, topPipeBottomY;

interval = pipeWidth = topPipeBottomY = 24; // fps is 1000 / value (i.e. 1000/24 = 42 fps)
let canvasSize, pipeX;
canvasSize = pipeX = 600;
const startButton = document.querySelector("#startButton");
let gamePaused = true;

// Jump on click
c.onclick = () => (birdDY = 11);

const game = setInterval(() => {
  context.fillStyle = "skyblue";
  context.fillRect(0, 0, canvasSize, canvasSize); // Draws sky

  // bird img changes depending on y velocity
  if (birdDY > 0) {
    context.drawImage(birdUp, birdX, birdY, birdSize * (524 / 374), birdSize);
  } else {
    context.drawImage(birdDown, birdX, birdY, birdSize * (524 / 374), birdSize);
  }

  context.fillStyle = "green";
  context.fillRect(pipeX, 0, pipeWidth, topPipeBottomY); // draws top pipe

  context.fillRect(pipeX, topPipeBottomY + pipeGap, pipeWidth, canvasSize); // draws bottom pipe

  context.fillStyle = "black";
  context.fillText(`Current: ${score}`, 9, 25); // draws score
  context.fillText(`Best: ${bestScore}`, 9, 50);

  // if game is paused don't move
  if (!gamePaused) {
    birdY -= birdDY -= 0.5; // gravity
    pipeX -= 8;
    score++;
    bestScore = bestScore < score ? score : bestScore;
  }

  // resets game on death
  if (
    birdY > canvasSize ||
    ((birdY < topPipeBottomY || birdY > topPipeBottomY + pipeGap) &&
      pipeX < birdSize * (524 / 374))
  ) {
    audio.play();
    birdDY = 0;
    birdY = 300;
    pipeX = canvasSize;
    topPipeBottomY = 24;
    score = 0;
    gamePaused = true;
  }

  // generates new pipes
  if (pipeX < -pipeWidth) {
    pipeX = canvasSize;
    topPipeBottomY = pipeGap * Math.random();
  }
}, interval);

startButton.addEventListener("click", () => (gamePaused = false));
