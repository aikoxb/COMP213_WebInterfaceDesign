//Creates Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//Loads Background image and bug images
const bgImage = new Image();
const unclickedBugImage = new Image();
const clickedBugImage = new Image();

//Starts the game once the background image is loaded
bgImage.onload = function () {
    startGame();
};

//Assigns image sources
bgImage.src = "images/canvas_bg.jpg";
unclickedBugImage.src = "images/bug1.png";
clickedBugImage.src = "images/bug2.png";

//Variable Declarations
let score = 0;
const initialHopInterval = 1000; //Initial interval in milliseconds
const decrement = 50; //Interval decrement in milliseconds
let speedDisplay = 1.0; //Speed for display purposes
let currentHopInterval = initialHopInterval; //Holds the current hop interval of the game
let intervalID; //Holds the ID of the setInterval

//Game object - bug
const bug = {
    width: 100,
    height: 120,
    x: 0,
    y: 0,
    image: unclickedBugImage //Current image of bug
};

//Generates a random position for bug within the canvas boundaries
function getRandomPosition() {
    //Calculates coordinates for bug
    bug.x = 32 + (Math.random() * (canvas.width - bug.width - 64));
    bug.y = 32 + (Math.random() * (canvas.height - bug.height - 64));
}

//Draws the background image
function drawBackground() {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
}

//Draws the bug image at a random position
function drawBug() {
    drawBackground(); //Always draw the background before drawing the bug
    getRandomPosition();
    ctx.drawImage(bug.image, bug.x, bug.y, bug.width, bug.height);
}

//Starts the game by setting an interval to draw the bug
function startGame() {
    clearInterval(intervalID); //Clears previous interval
    intervalID = setInterval(drawBug, currentHopInterval); //Sets interval based on currentHopInterval
    bug.image = unclickedBugImage; //Resets to original bug image
}

//Updates the score display
function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

//Updates the speed display
function updateSpeedDisplay(speedDisplay) {
    document.getElementById('speed').textContent = `Speed: ${speedDisplay.toFixed(2)}x`;
}

//Handles bug click events
function handleBugClick(event) {
    const clickX = event.offsetX;
    const clickY = event.offsetY;

    //Checks if click is within the bug's area
    if (clickX > bug.x && clickX < (bug.x + bug.width) && clickY > bug.y && clickY < (bug.y + bug.height)) {
        score += 55;
        updateScore();

        //Changes current unclicked bug image to clicked bug image
        bug.image = clickedBugImage;

        //Decreases current hop interval to increase speed
        currentHopInterval -= decrement;

        //Adds 0.15 to current speed display
        speedDisplay += 0.15;
        updateSpeedDisplay(speedDisplay);

        //Restarts game interval with new speed
        setTimeout(startGame,200);
    }
}

//Attaches event listener to canvas
canvas.addEventListener('click', handleBugClick);

//Resets speed function
function resetSpeed() {
    currentHopInterval = initialHopInterval; //Resets current interval to initial value
    speedDisplay = 1.0; //Resets speed display to initial value
    updateSpeedDisplay(speedDisplay);
    startGame();
    console.log('Speed reset');
}

//Resets score function
function resetScore() {
    score = 0;
    updateScore();
    console.log('Score reset');
}

//Attaches event listeners to buttons
document.getElementById('resetSpeed').addEventListener('click', resetSpeed);
document.getElementById('resetScore').addEventListener('click', resetScore);

//Initial call to start the game
startGame();