function initialize() {
    ////////////////////STUFF
    UserInstructionMsg = document.getElementById("InstructionsOutput");
    UserInstructionMsg.innerHTML = "";
    ButtonMsg = document.getElementById("ButtonMsgOutput");
    ButtonMsg.innerHTML = "Click me for instructions!";
    InstructionNeeded = false;

    scoreOutput = document.getElementById("clicksOutput");
    scoreOutput.innerHTML = 0;

    winMsg = document.getElementById("win");
    ////////////////////THE ACUTAL GAME
    cardarray = []
    for (i = 1; i <= 16; i++) {
        cardarray.push(document.getElementById("card" + i));
    }
    flipbackimage = "cardimages/back-red-75-1.png"

    flipped = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    for (i = 0; i < 16; i++) {
        cardarray[i].src = flipbackimage;
    }
    array = []
    for (i = 13; i >= 6; i--) {
        str = ""
        str = "cardimages/" + i + "-0.png";
        array.push(str)
        array.push(str)
    }

    randomizedArray = []
    randomizeImages()

    index1 = -1;
    index2 = -1;
}

function win() {
    for (i = 0; i < 16; i++) {
        if (flipped[i] == false) {
            return false;
        }
    }
    return true;
}

//return random number between 0 - number_of_images
function randomIndex(number_of_images) {
    return Math.floor(Math.random() * number_of_images);
}

function randomizeImages() {
    while (array.length != 0) {
        randIdx = randomIndex(array.length);
        returnedImg = array.splice(randIdx, 1)[0];
        randomizedArray.push(returnedImg);
    }
}

function changeCard(cardNumber) {
    if (index1 != -1 && index2 != -1) {
        match()
        return
    }
    if (flipped[cardNumber - 1] == false) {
        cardarray[cardNumber - 1].src = randomizedArray[cardNumber - 1];
        flipped[cardNumber - 1] = true
        scoreOutput.innerHTML++;
        if (index1 == -1) {
            index1 = cardNumber - 1;
        }
        else {
            index2 = cardNumber - 1;
        }
    }
}

function match() {
    if (cardarray[index1].src == cardarray[index2].src) {
        flipped[index1] = true;
        flipped[index2] = true;
        index1 = -1;
        index2 = -1;
        if (win() == true) {
            console.log("You win!!")
        }
    }
    else {
        cardarray[index1].src = flipbackimage;
        cardarray[index2].src = flipbackimage;
        flipped[index1] = false
        flipped[index2] = false
        index1 = -1;
        index2 = -1;
    }
}


function win() {
    if (scoreOutput.innerHTML == 16) {
        winMsg.innerHTML = "Unbelievable! A PERFECT score!";
    }
    else if (scoreOutput.innerHTML <= 26) {
        winMsg.innerHTML = "Awesome! You did an incredible job!";
    }
    else if (scoreOutput.innerHTML <= 36) {
        winMsg.innerHTML = "Great, but I'm sure you can do better! Now try again!";
    }
    else if (scoreOutput.innerHTML <= 46) {
        winMsg.innerHTML = "Nice, you are really good at this. Try again reach higher score!";
    }
    else { winMsg.innerHTML = "Good Job! Now try again to achieve higher score!"; }
}

function Instruction() {
    if (InstructionNeeded == false) {
        UserInstructionMsg.innerHTML = "Matching game tests your memory in an entertaining way, click two images to find a match. Click again to confirm the matches. If the images match, it stays revealed. Find all the matches to win the game and try to minimize the number of clicks. Click the reset button to restart the game. Good Luck!.";
        ButtonMsg.innerHTML = "Click me to close the instructions!";
        InstructionNeeded = true;
    }
    else {
        UserInstructionMsg.innerHTML = "";
        ButtonMsg.innerHTML = "Click me for instructions!";
        InstructionNeeded = false;
    }
}