function initialize() {
    num1Output = document.getElementById("num1out");
    num2Output = document.getElementById("num2out");
    num3Output = document.getElementById("num3out");
    wonMessage = document.getElementById("Win");
    lostMessage = document.getElementById("lose");
    countdown = document.getElementById("counter");
    situation = false;
    Totalpoints = document.getElementById("score");

    guessList = document.getElementById("guesses");
    guessList.innerHTML = "";

    surprise = document.getElementById("randomEvent");
    surprise.innerHTML = "";

    win = false;
    wonMessage.innerHTML = "";
    lose = false;
    lostMessage.innerHTML = "";

    clue = document.getElementById("hint");
    clue.innerHTML = "";

    var1 = Math.random();
    var1 *= 3;
    var1 = parseInt(var1);
    var1++;

    var2 = Math.random();
    var2 *= 3;
    var2 = parseInt(var2);
    var2++;

    var3 = Math.random();
    var3 *= 3;
    var3 = parseInt(var3);
    var3++;

    guess1 = 0;
    guess2 = 0;
    guess3 = 0;

    digitPlace = 1;
    digitNum = 1;
    turnsLeft = 7;

    secretNumber = var1 * 100 + var2 * 10 + var3;

    display();
}

function Place1() {
    if (digitNum <= 3) {
        if (digitPlace == 1) {
            guess1 = 1;
            digitNum++;
            digitPlace++;
        }
        else {
            if (digitPlace == 2) {
                guess2 = 1;
                digitNum++;
                digitPlace++;
            }
            else {
                guess3 = 1;
                digitNum++;
                submit();
            }
        }
        display();
    }
}

function Place2() {
    if (digitNum <= 3) {
        if (digitPlace == 1) {
            guess1 = 2;
            digitPlace++;
            digitNum++;
        }
        else {
            if (digitPlace == 2) {
                guess2 = 2;
                digitNum++;
                digitPlace++;
            }
            else {
                guess3 = 2;
                digitNum++;
                submit();
            }
        }
        display();
    }
}

function Place3() {
    if (digitNum <= 3) {
        if (digitPlace == 1) {
            guess1 = 3;
            digitNum++;
            digitPlace++;
        }
        else {
            if (digitPlace == 2) {
                guess2 = 3;
                digitNum++;
                digitPlace++;
            }
            else {
                guess3 = 3;
                digitNum++;
                submit();
            }
        }
        display();
    }
}

function submit() {
    finalguess = guess1 * 100 + guess2 * 10 + guess3;
    randomNum = Math.random();
    if (randomNum <= 0.05 && lose == false) {
        situation = true;
        turnsLeft += 2;
        surprise.innerHTML = "traffic jam, the police will show up 1 turn later.";
    }
    if (0.95 <= randomNum && lose == false) {
        situation = true;
        turnsLeft--;
        surprise.innerHTML = "in the area, the police will show up 1 turn sooner.";
    }
    situation = false;

    if (guess1 == var1 && guess2 == var2 && guess3 == var3 && lose == false) {
        wonMessage.innerHTML = "Congrats! You've cracked the code!";
        win = true;
        lose = true;
        Totalpoints.innerHTML++;
        clean();
    }
    else {
        if (turnsLeft > 0 && win == false) {
            turnsLeft--;
            if (secretNumber < finalguess) {
                clue.innerHTML = "Too high";
            }
            else {
                clue.innerHTML = "Too low";
            }
            guessList.innerHTML += finalguess + ", ";
            display();
        }
        if (turnsLeft == 0) {
            lose = true;
            lostMessage.innerHTML = "You're captured by the cops. Boo hoo";
            Totalpoints.innerHTML = 0;
            clean();
        }
    }
}

function clean() {
    surprise.innerHTML = "";
    clue.innerHTML = "";
    guess1 = "_";
    guess2 = "_";
    guess3 = "_";
    digitNum = 1;
    digitPlace = 1;
    display();
}

function display() {
    num1Output.innerHTML = guess1;
    num2Output.innerHTML = guess2;
    num3Output.innerHTML = guess3;
    countdown.innerHTML = turnsLeft;
}