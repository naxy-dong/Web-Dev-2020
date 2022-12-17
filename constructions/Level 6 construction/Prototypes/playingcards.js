const JACK = 11, QUEEN = 12, KING = 13, ACE = 1;
const CLUB = 0, DIAMOND = 1, HEART = 2, SPADE = 3;
const TOP_DECK = 0;

function Card(r, s, i)
{
	this.rank = r;
	this.suit = s;
	this.imageFilename = i;
}

function CardDeck()
{
}

CardDeck.prototype = Array.prototype;

CardDeck.prototype.shuffleDeck = function()
{
	var tmpDeck = new CardDeck();
	while (this.length > 0)
	{
		var tmpCard = this.splice(getRandomInteger(0, this.length - 1), 1)[0];
		
		tmpDeck.push(tmpCard);
	}
	
	this.push.apply(this, tmpDeck);
}

function generateStandardDeck()
{
	var deck = new CardDeck();
	
	for (var r = ACE; r <= KING; r++)
	{
		for (var s = CLUB; s <= SPADE; s++)
		{
			deck.push(new Card (r, s, r + "-" + s + ".png"));
		}
	}
	
	return deck;
}