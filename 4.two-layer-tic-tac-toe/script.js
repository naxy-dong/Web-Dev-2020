function initialize()
{
    ImgLetterX=document.getElementById("X");
    ImgLetterO=document.getElementById("O");
    EmptyImage=document.getElementById("Emp")
    
    TileLayer1=document.getElementById("square1LyrOutput");
    TileLayer2=document.getElementById("square2LyrOutput");
    TileLayer3=document.getElementById("square3LyrOutput");
    TileLayer4=document.getElementById("square4LyrOutput");
    TileLayer5=document.getElementById("square5LyrOutput");
    TileLayer6=document.getElementById("square6LyrOutput");
    TileLayer7=document.getElementById("square7LyrOutput");
    TileLayer8=document.getElementById("square8LyrOutput");
    TileLayer9=document.getElementById("square9LyrOutput");
    
    TileLayer1.innerHTML=0;
    TileLayer2.innerHTML=0;
    TileLayer3.innerHTML=0;
    TileLayer4.innerHTML=0;
    TileLayer5.innerHTML=0;
    TileLayer6.innerHTML=0;
    TileLayer7.innerHTML=0;
    TileLayer8.innerHTML=0;
    TileLayer9.innerHTML=0;
    
    ImgTile1=document.getElementById("squarepic1");
    ImgTile2=document.getElementById("squarepic2");
    ImgTile3=document.getElementById("squarepic3");
    ImgTile4=document.getElementById("squarepic4");
    ImgTile5=document.getElementById("squarepic5");
    ImgTile6=document.getElementById("squarepic6");
    ImgTile7=document.getElementById("squarepic7");
    ImgTile8=document.getElementById("squarepic8");
    ImgTile9=document.getElementById("squarepic9");
    
    ImgTile1.src=EmptyImage.src;
    ImgTile2.src=EmptyImage.src;
    ImgTile3.src=EmptyImage.src;
    ImgTile4.src=EmptyImage.src;
    ImgTile5.src=EmptyImage.src;
    ImgTile6.src=EmptyImage.src;
    ImgTile7.src=EmptyImage.src;
    ImgTile8.src=EmptyImage.src;
    ImgTile9.src=EmptyImage.src;
    PreviousTile='';
    
    BeginGameButtonMessage=document.getElementById("BeginGameBtnMsgOutput");
    inputContainer=document.getElementById("inputform");
    userInterfaceImage=document.getElementById("UserInterfacePic");
    AIInterfaceImage=document.getElementById("AIInterfacePic");
    
    RulesMessage=document.getElementById("RulesMessageOutput");
    RulesButtonMessage=document.getElementById("RulesBtnMsgOutput");
    RulesNeeded=false;
    
    GameOver=true;
    ResultMessage=document.getElementById("ResultMessageOutput");
    ResultMessage.innerHTML="";
}

function PlaceImage(Interface, Image, Layer)//This function can be implemented by both AI and the user
{
    ImageChosen=false;
    if(PreviousTile !== Image && Layer.innerHTML<2)
    {
        if(Layer.innerHTML==0 || (Layer.innerHTML==1 && (Interface=="O" && Image.src==ImgLetterO.src || (Interface=="X" && Image.src==ImgLetterX.src)))) // When the spot is not taken or When the spot is taken once and the interface matches the the image
        {
            Layer.innerHTML++;
        }
        if(Interface=="O")
        {
            Image.src=ImgLetterO.src;
        }
        else
        {
            Image.src=ImgLetterX.src;
        }
        ImageChosen=true;
        PreviousTile=Image;
        Win();
    }
}

function ShowRules()
{
    if(RulesNeeded==false)
    {
        RulesMessage.innerHTML="In 2 layer Tic-Tac-Toe, the rules sitll follow as a normal Tic-Tac-Toe game except there are 2 layers. Duh. The numbers below the images are the number of layers taken by the player or the AI. <p>1) A space can only be locked if the image was taken twice. For example, if you put your X on the center square, the other player can place his or her O on the center square later and take it away from you. If you place a second X on the center square before your opponent takes it away, the opponent can't take it away from you.</p> <p>2) A player may not move on the same space his or her opponent took on the previous turn. For example, if I take the center square, you cannot move onto the center square on your very next turn. You can only do it on a later turn.</p><p>3) Win the game by connecting 3 of your images in a row vertically, horizontally, or diagonally no matter how many layers were taken by the player.</p>";
        RulesButtonMessage.innerHTML="Click me to close the rules!";
        RulesNeeded=true;
    }
    else
    {
        RulesMessage.innerHTML="";
        RulesButtonMessage.innerHTML="Click for rules!";
        RulesNeeded=false;
    }
}

function RecordInterface()
{
    if(!GameOver)//when the game is ongoing
    {
        alert("You can't submit the interface during the game, click reset to change the interface.");
    }
    else
    {
        if(inputContainer.interface.value == "")//when the user had not select the interface
        {
            alert("select your interface and click Begin Game button")
        }
        if(GameOver && PreviousTile !== '')//when the game is over but the user didn't reset the game 
        {
            alert("Click reset to restart the game")
        }
        else
        {
            GameOver=false;
            if(inputContainer.interface.value=="O")//if user choose O, the AI goes first
            {
                userInterface=inputContainer.interface.value;
                userInterfaceImage.src=ImgLetterO.src;
                AIInterfaceImage.src=ImgLetterX.src;
                ImageChosen=false;
                AIInterface="X"
                Win();
                AIresponse();
            }
            if(inputContainer.interface.value=="X")//if user choose X, the user goes first
            {
                userInterface=inputContainer.interface.value;
                userInterfaceImage.src=ImgLetterX.src;
                AIInterfaceImage.src=ImgLetterO.src;
                AIInterface="O"
            }
        }
    }
}

function UserResponse()
{
    if(GameOver && ResultMessage.innerHTML !== "")//When the user finishes a game and the user didn't reset the game
    {
        alert("Click reset and select your interface.");
    }
    else
    {
        if(GameOver)//when the user didn't start a game
        {
            alert("select your interface and click Begin Game button.");
        }
        else
        {
            PlaceImage(userInterface,ImgTile,TileLayer);
            if(!GameOver && ImageChosen)
            {
                ImageChosen=false;
                AIresponse();
            }
        }
    }
}

function AIresponse()
{
    MoveFound=false;
    for(i=0; i<POSSIBLE_WIN_CONDITIONS.length; i++)
    {
        for(j=0; j<3; j++)
        {
            if(!MoveFound)
            {
                Win(); // the main purpose of the Win() is to reset the variables in POSSIBLE_WIN_CONDITIONS since the list inside it will be spliced.
                TempTileLayer=POSSIBLE_WIN_CONDITIONS[i][j+3];
                TempImgTile=POSSIBLE_WIN_CONDITIONS[i][j];
                POSSIBLE_WIN_CONDITIONS[i].splice(j,1);
                
                //check if AI has the finishing move, then the AI will finish the game
                if ((POSSIBLE_WIN_CONDITIONS[i][0].src==AIInterfaceImage.src && POSSIBLE_WIN_CONDITIONS[i][1].src==AIInterfaceImage.src) && (TempImgTile!==PreviousTile && TempTileLayer.innerHTML<2))
                {
                    PlaceImage(AIInterface,TempImgTile,TempTileLayer);
                    MoveFound=true;
                }
            }
        }
    }
    if(!MoveFound)
    {
        for(i=0; i<POSSIBLE_WIN_CONDITIONS.length; i++)
        {
            for(j=0; j<3; j++)
            {
                if(!MoveFound)
                {
                    Win(); // the main purpose of the Win() is to reset the variables in POSSIBLE_WIN_CONDITIONS since the list inside it will be spliced.
                    TempTileLayer=POSSIBLE_WIN_CONDITIONS[i][j+3];
                    TempImgTile=POSSIBLE_WIN_CONDITIONS[i][j];
                    POSSIBLE_WIN_CONDITIONS[i].splice(j,1);
                    
                    //check if user is one step from the finishing move, then the AI will block user from finishing the game
                    if ((POSSIBLE_WIN_CONDITIONS[i][0].src==userInterfaceImage.src && POSSIBLE_WIN_CONDITIONS[i][1].src==userInterfaceImage.src) && (TempImgTile!==PreviousTile && TempTileLayer.innerHTML<2))
                    {
                        PlaceImage(AIInterface,TempImgTile,TempTileLayer);
                        MoveFound=true;
                    }
                }
            }
        }
    }
    if(!MoveFound)// if the AI can't finish the game nor Block the user. Then it will randomize a move
    {
        TileLayerList=[TileLayer1,TileLayer2,TileLayer3,TileLayer4,TileLayer5,TileLayer6,TileLayer7,TileLayer8,TileLayer9];
        ImgTileList=[ImgTile1,ImgTile2,ImgTile3,ImgTile4,ImgTile5,ImgTile6,ImgTile7,ImgTile8,ImgTile9];
        while(ImageChosen==false)
        {
            RndIndex=Math.random();
            RndIndex*=9;
            RndIndex=parseInt(RndIndex);
            PlaceImage(AIInterface,ImgTileList[RndIndex],TileLayerList[RndIndex]);
        }
    }
}
function Win()
{
    ROW1=[ImgTile1,ImgTile2,ImgTile3,TileLayer1,TileLayer2,TileLayer3];
    ROW2=[ImgTile4,ImgTile5,ImgTile6,TileLayer4,TileLayer5,TileLayer6];
    ROW3=[ImgTile7,ImgTile8,ImgTile9,TileLayer7,TileLayer8,TileLayer9];
    COLUMN1=[ImgTile1,ImgTile4,ImgTile7,TileLayer1,TileLayer4,TileLayer7];
    COLUMN2=[ImgTile2,ImgTile5,ImgTile8,TileLayer2,TileLayer5,TileLayer8];
    COLUMN3=[ImgTile3,ImgTile6,ImgTile9,TileLayer3,TileLayer6,TileLayer9];
    DIAGONAL1=[ImgTile1,ImgTile5,ImgTile9,TileLayer1,TileLayer5,TileLayer9];
    DIAGONAL2=[ImgTile3,ImgTile5,ImgTile7,TileLayer2,TileLayer5,TileLayer7];
    POSSIBLE_WIN_CONDITIONS = [ROW1, ROW2, ROW3, COLUMN1, COLUMN2, COLUMN3, DIAGONAL1, DIAGONAL2];
    for(k=0; k<POSSIBLE_WIN_CONDITIONS.length; k++)
    {
        //if all 3 tiles have the same sources and the source is not empty.
        if((POSSIBLE_WIN_CONDITIONS[k][0].src==POSSIBLE_WIN_CONDITIONS[k][1].src && POSSIBLE_WIN_CONDITIONS[k][0].src==POSSIBLE_WIN_CONDITIONS[k][2].src)&& POSSIBLE_WIN_CONDITIONS[k][0].src!==EmptyImage.src)
        {
            GameOver=true;
            if(userInterfaceImage.src==POSSIBLE_WIN_CONDITIONS[k][0].src)//If the user wins
            {
                ResultMessage.innerHTML="Good job, you defeated the AI. Click the reset button to play again!";
            }
            else
            {
                ResultMessage.innerHTML="Boo hoo, you were defeated by AI. Click the reset button to play again!";
            }
        }
    }
}