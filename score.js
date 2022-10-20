const JACK = 11, QUEEN = 12, KING = 13, ACE = 1;

/*
	Description: convertRanktoValue (nums)
	1. It converts special rank to its actual value
		special ranks: JACK, QUEEN, KING, and ACE.
	2. Returns array
*/

function convertRanktoValue(nums) // takes in array
{
	for (i = 0; i < nums.length; i++)
	{
		if ((nums[i] == JACK || nums[i] == QUEEN) || nums[i] == KING)
		{
			nums[i] = 10;
		}
		if (nums[i] == ACE)
		{
			nums[i] = 11;
		}
	}
	return nums; // returns array
}

/*
	Description: DetermineHighestValue (a,b,c)
	1. convert the ranks to its actual value
	2. It will compare the values and determine the highest value
	Exceptions: JACK QUEEN KING all have the same value of 10, thus the program will just choose one of them. 
	3. return the highest value
*/

//valuelist.sort(function(a, b){return a-b}); works too. but this is something that I created.
function DetermineHighestValue(a,b,c)
{
	valuelist = convertRanktoValue([a,b,c]);
	
	a = valuelist[0];
	b = valuelist[1];
	c = valuelist[2];
	
	if(a > b && a > c)
	{
		return a;
	}
	if(b > a && b > c)
	{
		return b;
	}
	if(c > a && c > b)
	{
		return c;
	}
	if(c == a || c == b )
	{
		return b;
	}
	if(a == b)
	{
		return a;
	}
}

/*
	Description: AddValues (nums)
	1. convertranks to its actual value
	2. add the values together in the list
	3. return the value
*/

function AddValues(nums)//Takes in array
{
	convertRanktoValue(nums);
	var SameSuitValueSum = 0;
	for (i=0; i<nums.length; i++)
	{
		SameSuitValueSum += nums[i];
	}
	return SameSuitValueSum;
}

/*
	Description: SelectSameSuitValues (deck)
	1. from the specified deck, the program takes out values that have the same suit
	2. store the desired values in a list
	3. return the list
*/

function SelectSameSuitValues(deck)
{
	numlist = [];
	
	if(deck[0].suit == deck[1].suit && deck[0].suit == deck[2].suit)//if all cards have the same suit
	{
		numlist.push(deck[0].rank);
		numlist.push(deck[1].rank);
		numlist.push(deck[2].rank);
		return numlist;
	}
	
	if(deck[0].suit == deck[1].suit)//if card1 and card 2 have the same suit
	{
		numlist.push(deck[0].rank);
		numlist.push(deck[1].rank);
		return numlist;
	}
	
	if(deck[0].suit == deck[2].suit)//if card1 and card 3 have the same suit
	{
		numlist.push(deck[0].rank);
		numlist.push(deck[2].rank);
		return numlist;
	}
	
	if(deck[1].suit == deck[2].suit)//if card2 and card 3 have the same suit
	{
		numlist.push(deck[1].rank);
		numlist.push(deck[2].rank);
		return numlist;
	}
}

/*
	Description: DetermineScore ()
	1. Determine the score of every player's deck
		a. if the at least 2 of the cards same suit, 
		   then the score is equal to the value of cards that have the same suit combined
		b. if all cards have different suit, then the score is the highest value of the card
		c. //if a player has 3 matching cards, then the score is 30
*/
function DetermineScore(deck)
{
	if(deck.length !== 3)
		return;
	//if a player has 3 matching cards
	if(deck[0].rank == deck[1].rank && deck[0].rank == deck[2].rank)
	{
		var score = 30;
	}
	else
	{
		//if all cards have different suit
		if((deck[0].suit !== deck[1].suit && deck[0].suit !== deck[2].suit) && deck[1].suit !== deck[2].suit)
		{
			var score = DetermineHighestValue(deck[0].rank, deck[1].rank, deck[2].rank);
		}
		else
		{
			//if at least 2 cards have the same suit
			var score = AddValues(SelectSameSuitValues(deck));
		}
	}
	
	return score;
}

/*
	Description:RevealScore 
	1. It reveals the score of every player's hand
*/

function RevealScore()
{
	for(k=0; k<PlayerDecks.length; k++)
	{
		ScoreMsgList[k].innerHTML = DetermineScore(PlayerDecks[k]);
	}
}