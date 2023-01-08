function initialize() {
    num1Output = document.getElementById("num1out");
    num2Output = document.getElementById("num2out");
    num3Output = document.getElementById("num3out");
    countdown = document.getElementById("counter");
    score = document.getElementById("score");
    guessList = document.getElementById("guesses");
    guessList.innerHTML = "";
    gameOver = false;
    eventmsg = document.getElementById("event");

    var1 = chooseBetween1And3();
    var2 = chooseBetween1And3();
    var3 = chooseBetween1And3();
    guesses = [0, 0, 0];

    digitPlace = 0;
    turnsLeft = 7;
    secretNumber = var1 * 100 + var2 * 10 + var3;
    display();
}

function chooseBetween1And3() {
    return parseInt(Math.random() * 3) + 1;
}

function place(number) {
    guesses[digitPlace] = number;
    digitPlace++;
    if (digitPlace == 3) {
        submit();
    }
    display();
}

function submit() {
    if (!gameOver) {
        finalGuess = guesses[0] * 100 + guesses[1] * 10 + guesses[2];
        if (finalGuess == secretNumber) {
            eventmsg.innerHTML += "Congrats! You've cracked the code!";
            gameOver = true;
            score.innerHTML++;
            clean();
            return;
        }

        randomEvent();
        if (turnsLeft > 0) {
            turnsLeft--;

            eventmsg.innerHTML += secretNumber < finalGuess ? "Too high" : "Too low";
            guessList.innerHTML += finalGuess + ", ";
            display();
        }
        if (turnsLeft == 0) {
            gameOver = true;
            eventmsg.innerHTML += "You're captured by the cops. Boo hoo. The actual code is " + secretNumber;
            score.innerHTML = 0;
            clean();
        }
    }
}

function randomEvent(){
    randomNum = Math.random();
    if (randomNum <= 0.05) {
        turnsLeft += 2;
        eventmsg.innerHTML += "traffic jam, the police will show up 1 turn later.";
    }
    else if (randomNum <= 0.1) {
        turnsLeft--;
        eventmsg.innerHTML += "in the area, the police will show up 1 turn sooner.";
    }
}

function clean() {
    eventmsg.innerHTML = "";
    guesses[0] = "_";
    guesses[1] = "_";
    guesses[2] = "_";
    digitPlace = 0;
    display();
}

function display() {
    num1Output.innerHTML = guesses[0];
    num2Output.innerHTML = guesses[1];
    num3Output.innerHTML = guesses[2];
    countdown.innerHTML = turnsLeft;
}