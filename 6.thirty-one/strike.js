/*
	Description: DetermineLowestScore()
	1. Compare the scores and pull out the lowest number.
*/
//list.sort(function(a, b){return a-b}); works too. but this is something that I created.
function DetermineLowestScore(list)
{
	var lowestScore = list[0];
	
	for(i = 1; i<list.length; i++)//checks if there are multiple lowest score list
	{
		if(list[i] < lowestScore)
		{
			lowestScore = list[i];
		}
	}
	return lowestScore;
}
/*
	Description: RuleOf31
	1. If the player's hand reached 31, then everyone except the player who has 31 receives a strike.
	2. if the player who knocked before the person get 31, then it will receive 2 strikes
*/
function RuleOf31()
{
	for(k = 0; k < PlayerDecks.length; k++)
	{
		if(DetermineScore(PlayerDecks[k]) == 31)//Checks if the hand is 31
		{
			var tempdStrikeMsg = StrikeMsgList[k];//eventually has to place back in to the deck list
			StrikeMsgList.splice(k,1);
			for (j = 0; j < StrikeMsgList.length; j++)
			{
				StrikeMsgList[j].innerHTML++;
				if(KnockMsgList[j].innerHTML == "true") // if knocked, then receives 2 strikes.
				{
					StrikeMsgList[j].innerHTML++;
				}
			}
			StrikeMsgList.splice(k,0,tempdStrikeMsg);
		}
	}
}
/*
	Description: Strike
	1. Since we know the lowest score, then any player who has that score receives a strike.
	2. If the player knocked and has the lowestScore.
*/
function Strike()
{
	var ScoreList = [];
	for(k = 0; k < PlayerDecks.length; k++)
	{
		ScoreList.push(DetermineScore(PlayerDecks[k]));//store all score into a list
	}
	console.log(ScoreList);
	for (j = 0; j < PlayerDecks.length; j++)
	{
		if(ScoreList[j] == DetermineLowestScore(ScoreList)) //any player who has that score receives a strike
		{
			StrikeMsgList[j].innerHTML++;
			if(KnockMsgList.innerHTML == "true") // If the play knocked, then add one more strike.
			{
				StrikeMsgList[j].innerHTML++;
			}
		}
	}
}