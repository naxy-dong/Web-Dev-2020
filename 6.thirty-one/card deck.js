const CLUB = 0, SPADE = 3;
/*
	generateStandardDeck
	
	Creates a standard deck of 52 card objects and puts them into an array.
	
	Each card object will consist of a rank, suit, an image file, and a string to represent the card.
	
	Returns
		The array of cards.
*/
function generateStandardDeck()
{
	var deck = [];
	
	/*
		The double for loop goes through each suit for each rank, creating the card objects one at a time and pushing them into the array.
	*/
	for (var r = ACE; r <= KING; r++)
		for (var s = CLUB; s <= SPADE; s++)
		{
			var card = {};
			card.rank = r;
			card.suit = s;
			card.imgFile = r + "-" + s + ".png";
			card.src = "cardimages/" + card.imgFile;
			deck.push(card);
		}
		
	return deck;
}

/*
	shuffleDeck
	
	Takes a deck of cards and mixes them up.
	
	Returns
		The shuffled array.
*/
function shuffleDeck(deck)
{
	/*
		Creates a temporary array and pulls cards in a random order from the original array.
	*/
	var tmp = [];
	while (deck.length > 0)
		tmp.push(deck.splice(getRandomInteger(0, deck.length - 1), 1)[0]);
	
	return tmp;
}

function getRandomInteger(lower, upper)
{
	//R = parseInt(rnd * (upper - (lower - 1)) + lower
	var multiplier = upper - (lower - 1);
	var rnd = parseInt(Math.random() * multiplier) + lower;
	
	return rnd;
}
/*
	Description: DealCard()
	1. Draws a card from deck 	
	2. Add that card to the player's container
	3. Transfer the card to the player's deck
	4. When finishing dealing out cards, there is a slight chance that the player could get a score of 31.
*/
function DealCard(Deck, Container)
{
	// if there is no card left in the deck or the player has 4 cards already. Then don't do anything
	if(deck.length == 0 || Container.children.length == 4)
		return;
		
	var newCard = deck.shift();//select a card from the deck
	Deck.push(newCard); // Push it to the player's deck
	
	var cardImage = document.createElement("img");//create a new img on the board and set its src
	cardImage.src = newCard.src;
	cardImage.onclick = function(){DiscardCard(this, newCard, Container)};
	
	//if it is an AI player, change its src to red-back, which means we can't see the card.
	if(Deck !== PlayerDecks[0]) 
	{
		cardImage.src = "cardimages/back-red-75-1.png";
	}
	
	Container.appendChild(cardImage);
	
	RuleOf31();
	RevealScore();
}

/*
	Description: DealDiscardedCard()
	1. Create a new img to the play's container
	2. Transfer the discardimage src to the new img src
	3. Add the discarded card to the player's deck.
*/

function DealDiscardedCard(Deck, Container)
{
	if (Container.children.length == 4)
		return;
		
	var cardImage = document.createElement("img"); //create a new image to the container
	cardImage.src = DiscardImage.src;
	Deck.push(DiscardedCard);
	cardImage.onclick = function(){DiscardCard(this, DiscardedCard, Container)};
	Container.appendChild(cardImage);// transfer the card to the player's deck
	
	DiscardImage.src = "" //set the discardedcard and src to empty.
	DiscardedCard = {};
}

/*
	Description: DiscardCard()
	1. Removes the card selected from the container
	3. Transfer the card to the discarded pile
	2. Set the discarded img src to the cardimage src
	4. When discard a card, there is a chance that the player could get a score of 31.
*/

function DiscardCard(cardimage, card, Container)
{
	if(Container.children.length == 3) // if the container has 3 cards left, the user can't take more.
		return;
	
	DiscardImage.src = cardimage.src;
	DiscardedCard = card;
	Container.removeChild(cardimage);
	
	RuleOf31();
}

/*
	Description: RevealCard()
	1. Reveal the src of every children in the container.
*/

function RevealCard()
{
	for (i = 0; i < PlayerDecks.length; i++) // go through each player's hands
	{
		for (j = 0; j < 3; j++) // go through each card in the player's hand
		{
			PlayerContainers[i].children[j].src = PlayerDecks[i][j].src;
		}
	}
}