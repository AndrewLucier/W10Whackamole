// get an array of all elements with the class hole
var arrHoles = document.querySelectorAll(".hole");

// track where the hole last appeared
var lastHole;

// track if the time is up
var timeUp = false;

// add a pointer to the scoreboard
var spanScore = document.getElementById("spanScore");

// variable to keep track of the score
var score = 0;

// function to start the game
function startGame(){
    // reset the timeUp flag to false
    timeUp = false;
    // reset the score, if desired
    score = 0;

    // start the fun
    popUp();

    // after 10 seconds, change the value of timeup to true so that the game stops
    setTimeout(() => timeUp = true, 10000)
}

// function to make a hole "pop up"
function popUp(){
    // get a random time in between these numbers
    var time = randomTime(200, 1000);
    // get a random hole
    var hole = randomHole(arrHoles);

    // add the class to change the hole to red
    hole.classList.add("up");

    // set timeout will run code repeatedly every so often
    // there are 2 parameters - what code should reopen; and how often it should repeat
    setTimeout(() => {
        hole.classList.remove("up");
        // if the time is not up yet, call the popup function again
        if (!timeUp){
            popUp();
        }
    }, time);
}

// create a function to generate a random time between the numbers provided
function randomTime(min, max){
    // Math.random returns a "random"
    // do some math magic to make it a number in our range
    return Math.round(Math.random() * (max-min) + min);
}

// pick one of the holes randomly
function randomHole(holes){
    // get a random number
    var counter = Math.floor(Math.random() * holes.length);
    // get the particular hole from the array as determined by the random number generator
    var hole = holes[counter];
    
    // if the same hole was generated, get a different hole
    if (counter == lastHole){
        return randomHole(holes);
    }

    // track the new hole number
    lastHole = counter;
    
    // return the new hole, so we can add the up class to it
    return hole;
}

// create a function to handle the click / whack event on the hole
function whack(event){
    // check if the click is a trusted event; if not, leave the function
    if (!event.isTrusted) return;

    // if they clicked the red circle, they whacked a mole
    if (this.classList.contains("up")){
        // increase the score counter
        score++;

        // remove the red from the circle
        this.classList.remove("up");
        // update the scoreboard
        spanScore.innerHTML = score;
    }
}

// use the shortcut for syntax to add event listerners to each hole
arrHoles.forEach(hole => hole.addEventListener("click", whack));

// other event handlers

// change the timage that is shown when the mouse hovers over the image
function swapImage(){
    // pointer to the image in the HTML
    var theImage = document.getElementById("img1");

    // change the image
    theImage.src = "vegas.jpg";
}

// handle when the mouse is no longer hovering over the image
function annoyUser(){
    // pointer to the image in the HTML
    var theImage = document.getElementById("img1");

    // change the image
    theImage.src = "beach.jpg";

    // now annoy the user
    alert("hi!!!");
    alert("how are you?");
    alert("how can I help you?");
    alert("do you want me to help you find something?");
    alert("I hope you have a nice day");
}