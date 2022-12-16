function initialize() {
    ////////////////////STUFF
    UserInstructionMsg = document.getElementById("InstructionsOutput");
    ButtonMsg = document.getElementById("ButtonMsgOutput");
    scoreOutput = document.getElementById("clicksOutput");
    winMsg = document.getElementById("win");
    InstructionNeeded = false;
    scoreOutput.innerHTML = 0;
    UserInstructionMsg.innerHTML = "";
    ButtonMsg.innerHTML = "Click me for instructions!";
    ////////////////////THE ACUTAL GAME
    cardarray = []
    flipped = []
    flipbackimage = "cardimages/back-red-75-1.png"
    for (i = 1; i <= 16; i++) {
        cardarray.push(document.getElementById("card" + i));
        flipped[i-1] = false
        cardarray[i-1].src = flipbackimage;
    }
    array = []
    for (i = 13; i >= 6; i--) {
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
    for (let i = 0; i < 16; i++) {
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
        if (win() == true) {
            result()
        }
    }
    else {
        cardarray[index1].src = flipbackimage;
        cardarray[index2].src = flipbackimage;
    }
    flipped[index1] = !flipped[index1]
    flipped[index2] = !flipped[index2]
    index1 = -1;
    index2 = -1;
}

function result() {
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
    }
    else {
        UserInstructionMsg.innerHTML = "";
        ButtonMsg.innerHTML = "Click me for instructions!";
    }
    InstructionNeeded = !InstructionNeeded;
}
