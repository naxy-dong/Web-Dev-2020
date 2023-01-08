const TILE1VALUE = 1, TILE2VALUE = 2, TILE3VALUE = 3, TILE4VALUE = 4, TILE5VALUE = 5, TILE6VALUE = 6, TILE7VALUE = 7, TILE8VALUE = 8, TILE9VALUE = 9, TILE10VALUE = 10, TILE11VALUE = 11, TILE12VALUE = 12, TILE13VALUE = 13, TILE14VALUE = 14, TILE15VALUE = 15, TILE16VALUE = 16;

function initialize() {
    tiles = [];
    for (i = 1; i <= 16; i++) {
        tiles[i - 1] = document.getElementById("tile" + i);
    }

    EmptyTile = tiles[15];
    EmptyTileValue = 16;

    NumOfMovesOutput = document.getElementById("MovesOutput");
    UserInstructionMsg = document.getElementById("InstructionsOutput");
    ButtonMsg = document.getElementById("ButtonMsgOutput");
    WinMsg = document.getElementById("WinMsgOutput");
    gameBegin = false;
    InstructionNeeded = false;
}

function SwapTiles(tileValueSelected) {
    SelectedTile = tiles[tileValueSelected - 1];
    if (gameBegin) {
        if (isAdjacentToEmpty(tileValueSelected, EmptyTileValue))//Check if the tile is adjacent or not
        {
            //swap the tile with the empty tile
            EmptyTile.innerHTML = SelectedTile.innerHTML;
            SelectedTile.innerHTML = "";
            EmptyTile = SelectedTile;
            EmptyTileValue = tileValueSelected;

            NumOfMovesOutput.innerHTML++;
        }

        if (win()) {
            WinMsg.innerHTML = "Great Job! You successfully place the tiles back in order. Now try again by clicking the reset button to begin your new puzzle!";
        }
    }
}

function isAdjacentToEmpty(val1, val2) {
    return val1 - 1 == val2 && !isLeft(val1) ||
        val1 + 1 == val2 && !isRight(val1) ||
        val1 - 4 == val2 && !isTop(val1) ||
        val1 + 4 == val2 && !isBot(val1);
}

function win() {
    for (i = 1; i <= 15; i++) {
        if (tiles[i - 1].innerHTML != i) {
            return false
        }
    }
    return true;
}

function StartGame() {
    gameBegin = true;
    RandomizePuzzle();
    NumOfMovesOutput.innerHTML = "0";
    WinMsg.innerHTML = "";
}

function ResetGame() {
    gameBegin = false;
    for (i = 1; i <= 15; i++) {
        tiles[i - 1].innerHTML = i;
    }
    tiles[15].innerHTML = "";
}

function ShowInstruction() {
    if (InstructionNeeded == false) {
        UserInstructionMsg.innerHTML = "Sliding game is a game where the user puts numbers in order by moving 'tiles' around. Press the " + "<u>Start</u>" + " button to create and begin your new game and Press the " + "<u>Reset</u>" + " button to stop counting moves. The computer will count each move you make. Good Luck!";
        ButtonMsg.innerHTML = "Click me to close the instructions!";
    }
    else {
        UserInstructionMsg.innerHTML = "";
        ButtonMsg.innerHTML = "Click me for instructions!";
    }
    InstructionNeeded = !InstructionNeeded;
}

function RandomizePuzzle() {
    TOP = 1, BOTTOM = 2, LEFT = 3, RIGHT = 4;
    for (i = 0; i < 1000; i++)//Randomize the movement 1000 times
    {
        PossibleDirections = [];

        if (!isTop(EmptyTileValue))//Checks for if the tile is one of the top 4 tiles
        {
            PossibleDirections.push(TOP);//Can go bot
        }
        if (!isBot(EmptyTileValue))//Checks for if the tile is one of the bottom 4 tiles
        {
            PossibleDirections.push(BOTTOM);//
        }
        if (!isLeft(EmptyTileValue))//Checks for if the tile is one of the left 4 tiles
        {
            PossibleDirections.push(LEFT)
        }
        if (!isRight(EmptyTileValue))//Checks for if the tile is one of the right 4 tiles
        {
            PossibleDirections.push(RIGHT)
        }

        //Determine the random index
        RndIndex = parseInt(Math.random() * PossibleDirections.length);

        RandomDirections = PossibleDirections[RndIndex];
        if (RandomDirections == TOP) {
            EmptyTileValue -= 4;
        }
        if (RandomDirections == BOTTOM) {
            EmptyTileValue += 4;
        }
        if (RandomDirections == LEFT) {
            EmptyTileValue -= 1;
        }
        if (RandomDirections == RIGHT) {
            EmptyTileValue += 1;
        }
        //swapping
        EmptyTile.innerHTML = tiles[EmptyTileValue - 1].innerHTML;
        tiles[EmptyTileValue - 1].innerHTML = "";
        EmptyTile = tiles[EmptyTileValue - 1];
    }
}

function isTop(value) {
    return value - 4 < 1;
}

function isBot(value) {
    return value + 4 > 16;
}

function isLeft(value) {
    return value % 4 == 1;
}

function isRight(value) {
    return value % 4 == 0;
}