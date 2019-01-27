class Card{
    constructor(suit,value){
        this.suit = suit;
        this.value = value;
    }
    showCard(){
        console.log(`${this.value} of ${this.suit}`)
    }
}
class deck{
    constructor(){
        this.deck = [];
        this.reset();
        //start with a fresh deck
    }
    reset(){
        this.deck = [];
        const suits = ['Hearts','Diamonds','Spades','Clubs'];
        const cardValue = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']
        for (const i of suits){
            for (const j of cardValue){
                const card = new Card(i, j)
                this.deck.push(card)
            }
        }
        return this;
    }
    shuffleDeck(deck){
        var m = this.deck.length, t, i;
        //While there remain elements to shuffle...
        while(m){
            //pick a remaining element...
            i = Math.floor(Math.random() * m--);
            //and swap it with the current element.
            t = this.deck[m];
            this.deck[m] = this.deck[i];
            this.deck[i] = t;
        }
        //console.log(this.deck); to check if it shuffles
        return this;
    }
    deal(){
        //this.shuffleDeck(); not necessary to shuffle before each deal
        return this.deck.pop();
    }
}

class Player{
    constructor(name){
        this.name = name;
        this.hand = [];
    }
    showHand(){
        const hand = (JSON.stringify(this.hand))
        //console.log(this.hand)
        console.log('My name is ' + this.name + ', and these are my cards: ' + hand)
        //could eventually get the hands to print a little prettier
    }
    draw(deck){
        this.hand.push(deck.deal());
        return this;
    }
    discard(){
        if(this.hand.length > 0){
            this.hand.pop();
        }
        return this;
    }
}

game1 = new deck();
//console.log(game1);
game1.shuffleDeck();
//console.log('#################See the difference?##############')
//console.log(game1);
var player1 = new Player("Sasha");
var player2 = new Player("Austin");
player1.draw(game1).draw(game1);
player1.showHand();
player2.draw(game1).draw(game1).draw(game1);
player2.showHand();
//console.log(player1);


