function Ninja(name) {
    var speed = 3;
    var strength = 3;

    this.name = name;
    this.health = 100;

    this.sayName = function() {
        console.log("My ninja name is " + this.name + "!");
    }
    this.showStats = function() {
        console.log("Name: " + this.name + ", Health: " + this.health + ", Speed: " + speed + ", Strength: " + strength);
    }
    this.drinkSake = function() {
        this.health += 10;
        return this;
    }
    this.punch = function(ninja){
        if(ninja instanceof Ninja){
            ninja.health -= 5;
            console.log(ninja.name + " was punched by " + this.name + " and lost 5 Health!");
            return ninja;
        }
    }
    this.kick = function(ninja){
        if(ninja instanceof Ninja){
            ninja.health -= (strength * 15);
            console.log(ninja.name + " was kicked by " + this.name + " and lost " + (strength*15) + " Health!");
            console.log("In this case, " + ninja.name + " lost " + (strength*15) + " health because " + this.name + " has " + strength + " point of strength");
            return Ninja;
        }
    }
}
var ninja1 = new Ninja("Hyabusa");
var ninja2 = new Ninja("Hero");
var blueNinja = new Ninja("Goemon");
var redNinja = new Ninja("Bill Gates");
ninja1.sayName();

ninja1.drinkSake().showStats();
ninja1.punch(ninja2);
ninja2.showStats();
console.log("#######################");
blueNinja.kick(redNinja);
blueNinja.showStats();
redNinja.showStats();
