// GIVEN
// console.log(example);
// var example = "I'm the example!";
// AFTER HOISTING BY THE INTERPRETER
/*var example;
console.log(example);
let example = "I'm the example!"; 
*/
 
/* 1 hello is undefined */
/*GIVEN
console.log(hello);  
var hello = 'world';     // should be undefined because of how the interpreter hoists it
AFTER HOISTING BY THE INTERPRETER
*/

var hello;
console.log(hello);
let example = "world"; 

/*2 magnet is the output*/
/*GIVEN
var needle = 'haystack';
test();
function test(){
var needle = 'magnet';
console.log(needle);
}
AFTER HOISTING BY THE INTERPRETER
*/
var needle;
function test(){
    var needle;
    need = 'magnet';
    console.log(needle);
}
needle = 'haystack';
test();

/*3 super cool is the output*/
/*GIVEN
var brendan = 'super cool';
function print(){
    brendan = 'only okay'copy;
    console.log(brendan);
}
console.log(brendan);
AFTER HOISTING BY THE INTERPRETER
here the function is never called
*/
var brendan;
function print(){
    brendan = 'only okay';
    console.log(brendan);
}
brendan = 'supercool';
console.log(brendan);

/*4 chicken, half-chicken is the output*/
/*GIVEN
var food = 'chicken';
console.log(food);
eat();
function eat(){
    food = 'half-chicken';
	console.log(food);
	var food = 'gone';
}
AFTER HOISTING BY THE INTERPRETER
*/
 var food;
 function eat(){
    var food;
    food = 'half-chicken';
    console.log(food);
    food = 'gone'
 }
 food = 'chicken';
 console.log(food);
 eat()

 /*5  Error, mean is not a function*/
/* GIVEN
 mean();
 console.log(food);
 var mean = function() {
 	   food = "chicken";
	   console.log(food);
	   var food = "fish";
	   console.log(food);
 }
 console.log(food);
 AFTER HOISTING BY THE INTERPRETER
 here the function is never called
*/
var mean;
mean();
console.log(food);
mean = function (){
    var food;
    food = 'chicken';
    console.log(food);
    food = 'fish';
    console.log(food);
}
console.log(food);

/*6  first the console.log will give undefined, then it will run the function and log rock, r&b, and then finish the function and log disco */
/*GIVEN
console.log(genre);
var genre = 'disco';
rewind();
function rewind(){
    genre = 'rock';
    console.log(genre);
    var genre = 'r&b';
    console.log(genre);
}
console.log(genre)
AFTER HOISTING BY THE INTERPRETER
*/
var genre;
function rewind(){
    var genre;
    genre = 'rock';
    console.log(genre);
    genre = 'r&b';
    console.log(genre);
}
genre = 'disco';
console.log(genre);

/*7 returns 'san jose', 'seattle', 'burbank', 'san jose' */
/*GIVEN
dojo = 'san jose';
console.log(dojo);
learn();
function learn(){
    dojo = 'seattle';
    console.log(dojo);
    var dojo = 'burbank';
    console.log(dojo);
}
console.log(dojo);
AFTER HOISTING BY THE INTERPRETER
*/

var dojo;
function learn(){
    var dojo;
    dojo = 'seattle';
    console.log(dojo);
    dojo = 'burbank';
    console.log(dojo);
}
dojo = 'san jose';
console.log(dojo);
learn();
console.log(dojo);

/*8 Will succeed at the first log statement, but because dojo is constant it can not be set to 'closed for now' */
/*GIVEN
console.log(makeDojo('Chicago', 65));
console.log(makeDojo('Berkley', 0));
function makeDojo(name, students){
    const dojo = {};
    dojo.name = name;
    dojo.students = students;
    if(dojo.students > 50){
        dojo.hiring = true;
    }
    else if(dojo.students <= 0){
        dojo = "closed for now";
    }
    return dojo;
}
AFTER HOISTING BY THE INTERPRETER
*/

function makeDojo(name, students){
    const dojo = {}; 
    dojo.name = name;
    dojo.students = students;
    if(dojo.students > 50){
        dojo.hiring = true;
    }
    else if(dojo.students <= 0){
        dojo = 'closed for now';
    }
    return dojo;
}
console.log(makeDojo('Chicago', 65));
console.log(makeDojo('Berkley', 0));
