// 1 Setting types//
var myString: any;
//Because you set the type to be string then you cannot change it to a number.
//If you want it to be anything then set it to anything.
// I can assign myString like this:
myString = "Bee stinger";
// Why is there a problem with this? What can I do to fix this?
myString = 9;

//2 Setting the types for function parameters//

function sayHello(name: any){
   return `Hello, ${name}!`;
}
// This is working great:
console.log(sayHello("Kermit"));
// Why isn't this working? I want it to return "Hello, 9!"
//Same problem as above once name was set as a parameter that must be a string then it cannot be made into a number
//You can either change the type to any or you can also change the number into a string by adding quotations around it
console.log(sayHello(9));

//3 Optional parameters//

function fullName(firstName: string, lastName: string, middleName?: string){
   let fullName = `${firstName} if(middleName){${middleName}} ${lastName}`;
   return fullName;
}
// This works:
console.log(fullName("Mary", "Moore", "Tyler"));
// What do I do if someone doesn't have a middle name?
//add ? to the optional parameter and an if loop that includes the optional parameter
console.log(fullName("Jimbo", "Jones"));

//4 Interfaces and function parameters//

interface Student {
   firstName: string;
   lastName: string;
   belts: number;
}
function graduate(ninja: Student){
   return `Congratulations, ${ninja.firstName} ${ninja.lastName}, you earned ${ninja.belts} belts!`;
}
const christine = {
   firstName: "Christine",
   lastName: "Yang",
   belts: 2
}
const jay = {
   firstName: "Jay",
   lastName: "Patel",
   belts: 4
   //belts was misspelled
}
// This seems to work fine:
console.log(graduate(christine));
// This one has problems:
console.log(graduate(jay));
//5 Classes and function parameters//

class Ninja {
    fullName: string;
    constructor(
       public firstName: string,
       public lastName: string){
          this.fullName = `${firstName} ${lastName}`;
       }
    debug(){
       console.log("Console.log() is my friend.")
    }
 }
 // This is not making an instance of Ninja, for some reason:
 const shane = new Ninja('Shane', 'Dooley');
 //new was not included and no parameters were given and two are required
 // Since I'm having trouble making an instance of Ninja, I decided to do this:
 // const turing = {
 //    fullName: "Alan Turing",
 //    firstName: "Alan",
 //    lastName: "Turing"
 // }
 // This doesn't actually create a ninja
 const turing = new Ninja('Alan', 'Turing')
 //the above will work
 // Now I'll make a study function, which is a lot like our graduate function from above:
 function study(programmer: Ninja){
    return `Ready to whiteboard an algorithm, ${programmer.fullName}?`
 }
 // Now this has problems:
 console.log(study(turing));
//6 Arrow functions//

var increment = x => x + 1;
// This works great:
console.log(increment(3));
var square = x => x * x;
// This is not showing me what I want:
console.log(square(4));
// This is not working:
var multiply = (x,y) => x * y;
// Nor is this working:
var math = (x, y) => {
    var sum = x + y;
    let product = x * y;
    let difference = Math.abs(x - y);
    return [sum, product, difference];
}
//7 Arrow functions and 'this'//

class Elephant {
    constructor(public age: number){}
    birthday = function(){
      this.age++;
    }
    updateAge = () => this.age
  }
  const babar = new Elephant(8);
  console.log(`Babar's age is ${babar.updateAge()}.`)
  setTimeout(babar.birthday(), 1000)
  //You call the birthday function
  //Then you call another function to get the new age
  setTimeout(function(){
    console.log(`Babar's age is ${babar.updateAge()}.`)
  }, 2000)
  
  