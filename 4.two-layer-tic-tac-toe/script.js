function initialize() {
    ImgLetterX = document.getElementById("X");
    ImgLetterO = document.getElementById("O");
    EmptyImage = document.getElementById("Emp")

    tiles = []
    imgTiles = []
    for (i = 1; i <= 9; i++) {
        tiles[i - 1] = document.getElementById(`square${i}LyrOutput`);
        tiles[i - 1].innerHTML = 0;
        imgTiles[i - 1] = document.getElementById(`squarepic${i}`);
        imgTiles[i - 1] = EmptyImage.src;
    }
    PreviousTile = '';

    BeginGameButtonMessage = document.getElementById("BeginGameBtnMsgOutput");
    inputContainer = document.getElementById("inputform");
    userInterfaceImage = document.getElementById("UserInterfacePic");
    AIInterfaceImage = document.getElementById("AIInterfacePic");

    RulesMessage = document.getElementById("RulesMessageOutput");
    RulesButtonMessage = document.getElementById("RulesBtnMsgOutput");
    RulesNeeded = false;

    GameOver = true;
    ResultMessage = document.getElementById("ResultMessageOutput");
    ResultMessage.innerHTML = "";
    winTile = "";
}

function PlaceImage(Interface, Image, Layer)//This function can be implemented by both AI and the user
{
    ImageChosen = false;
    if (PreviousTile !== Image && Layer.innerHTML < 2) {
        if (Layer.innerHTML == 0 || (Layer.innerHTML == 1 && (Interface == "O" && Image.src == ImgLetterO.src || (Interface == "X" && Image.src == ImgLetterX.src)))) // When the spot is not taken or When the spot is taken once and the interface matches the the image
        {
            Layer.innerHTML++;
        }
        Image.src = Interface == "O" ? ImgLetterO.src : ImgLetterX.src;
        ImageChosen = true;
        PreviousTile = Image;
        Win();
    }
}

function ShowRules() {
    if (RulesNeeded == false) {
        RulesMessage.innerHTML = "In 2 layer Tic-Tac-Toe, the rules sitll follow as a normal Tic-Tac-Toe game except there are 2 layers. Duh. The numbers below the images are the number of layers taken by the player or the AI. <p>1) A space can only be locked if the image was taken twice. For example, if you put your X on the center square, the other player can place his or her O on the center square later and take it away from you. If you place a second X on the center square before your opponent takes it away, the opponent can't take it away from you.</p> <p>2) A player may not move on the same space his or her opponent took on the previous turn. For example, if I take the center square, you cannot move onto the center square on your very next turn. You can only do it on a later turn.</p><p>3) Win the game by connecting 3 of your images in a row vertically, horizontally, or diagonally no matter how many layers were taken by the player.</p>";
        RulesButtonMessage.innerHTML = "Click me to close the rules!";
    }
    else {
        RulesMessage.innerHTML = "";
        RulesButtonMessage.innerHTML = "Click for rules!";
    }
    RulesNeeded = !RulesNeeded
}

function RecordInterface() {
    if (!GameOver)//when the game is ongoing
    {
        alert("You can't submit the interface during the game, click reset to change the interface.");
        return;
    }
    if (inputContainer.interface.value == "")//when the user had not select the interface
    {
        alert("select your interface and click Begin Game button")
    }
    if (GameOver && PreviousTile !== '')//when the game is over but the user didn't reset the game 
    {
        alert("Click reset to restart the game")
    }
    else {
        GameOver = false;
        userInterface = inputContainer.interface.value;
        if (inputContainer.interface.value == "O")//if user choose O, the AI goes first
        {
            userInterfaceImage.src = ImgLetterO.src;
            AIInterfaceImage.src = ImgLetterX.src;
            ImageChosen = false;
            AIInterface = "X"
            Win();
            AIresponse();
        }
        if (inputContainer.interface.value == "X")//if user choose X, the user goes first
        {
            userInterfaceImage.src = ImgLetterX.src;
            AIInterfaceImage.src = ImgLetterO.src;
            AIInterface = "O"
        }
    }
}

function UserResponse() {
    if (GameOver && ResultMessage.innerHTML !== "")//When the user finishes a game and the user didn't reset the game
    {
        alert("Click reset and select your interface.");
    }
    else {
        if (GameOver)//when the user didn't start a game
        {
            alert("select your interface and click Begin Game button.");
        }
        else {
            PlaceImage(userInterface, ImgTile, TileLayer);
            if (!GameOver && ImageChosen) {
                ImageChosen = false;
                AIresponse();
            }
        }
    }
}

function AIresponse() {
    MoveFound = false;
    
    for (i = 0; i < POSSIBLE_WIN_CONDITIONS.length; i++) {
        for (j = 0; j < 3; j++) {
            if (!MoveFound) {
                Win(); // the main purpose of the Win() is to reset the variables in POSSIBLE_WIN_CONDITIONS since the list inside it will be spliced.
                TempTileLayer = POSSIBLE_WIN_CONDITIONS[i][j + 3];
                TempImgTile = POSSIBLE_WIN_CONDITIONS[i][j];
                POSSIBLE_WIN_CONDITIONS[i].splice(j, 1);

                //check if AI has the finishing move, then the AI will finish the game
                if ((POSSIBLE_WIN_CONDITIONS[i][0].src == AIInterfaceImage.src && POSSIBLE_WIN_CONDITIONS[i][1].src == AIInterfaceImage.src) && (TempImgTile !== PreviousTile && TempTileLayer.innerHTML < 2)) {
                    PlaceImage(AIInterface, TempImgTile, TempTileLayer);
                    MoveFound = true;
                }
            }
        }
    }
    if (!MoveFound) {
        for (i = 0; i < POSSIBLE_WIN_CONDITIONS.length; i++) {
            for (j = 0; j < 3; j++) {
                if (!MoveFound) {
                    Win(); // the main purpose of the Win() is to reset the variables in POSSIBLE_WIN_CONDITIONS since the list inside it will be spliced.
                    TempTileLayer = POSSIBLE_WIN_CONDITIONS[i][j + 3];
                    TempImgTile = POSSIBLE_WIN_CONDITIONS[i][j];
                    POSSIBLE_WIN_CONDITIONS[i].splice(j, 1);

                    //check if user is one step from the finishing move, then the AI will block user from finishing the game
                    if ((POSSIBLE_WIN_CONDITIONS[i][0].src == userInterfaceImage.src && POSSIBLE_WIN_CONDITIONS[i][1].src == userInterfaceImage.src) && (TempImgTile !== PreviousTile && TempTileLayer.innerHTML < 2)) {
                        PlaceImage(AIInterface, TempImgTile, TempTileLayer);
                        MoveFound = true;
                    }
                }
            }
        }
    }
    if (!MoveFound)// if the AI can't finish the game nor Block the user. Then it will randomize a move
    {
        while (ImageChosen == false) {
            RndIndex = parseInt(Math.random() * 9);
            PlaceImage(AIInterface, imgTiles[RndIndex], tiles[RndIndex]);
        }
    }
}

function Win() {
    if (isWin()) {
        GameOver = true;
        ResultMessage.innerHTML = userInterfaceImage.src == winTile.src ?
            "Good job, you defeated the AI. Click the reset button to play again!" :
            "Boo hoo, you were defeated by AI. Click the reset button to play again!";
    }
}

function isWin() {
    for (i = 0; i < 3; i++) {
        //check the rows
        if (tiles[i * 3].src != EmptyImage.src && tiles[i * 3].src == tiles[i * 3 + 1].src && tiles[i * 3 + 1].src == tiles[i * 3 + 2].src) {
            winTile = tiles[i * 3].src;
            return true;
        }
        //check the columns
        if (tiles[i].src != EmptyImage.src && tiles[i].src == tiles[3 + i].src && tiles[3 + i].src == tiles[6 + i].src) {
            winTile = tiles[i].src;
            return true;
        }
    }
    winTile = tiles[4].src;
    //check both diagonals
    if (tiles[0].src != EmptyImage.src && tiles[0].src == tiles[4].src && tiles[4].src == tiles[8].src) {
        return true;
    }
    if (tiles[2].src != EmptyImage.src && tiles[2].src == tiles[4].src && tiles[4].src == tiles[6].src) {
        return true;
    }
    return false;
}