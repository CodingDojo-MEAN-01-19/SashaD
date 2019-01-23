class Card{
    constructor(suit, stvalue, numvalue){
        this.suit = suit;
        this.stvalue = stvalue;
        this.numvalue = numvalue;
    }
    showCard(){
        console.log(`Suit: ${this.suit}, Value: ${this.stvalue}, Numerical Value: ${this.numvalue}.`);
    }
}
class Deck