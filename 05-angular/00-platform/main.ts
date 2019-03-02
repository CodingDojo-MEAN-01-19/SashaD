//DON'T USE VAR!
//let or const
//if const you cannot reassign
//You must tell it the type
let myString: string = 'this is a string';
//Cannot set something that is a string as something that is a number
//myString = 23434;
//how to convert?
//typescript compiler
type BoolStrNum = string | number | boolean; //union of types
const array: BoolStrNum[] = ['cat', 'dog'];
//tell it that it can take all types
array.push('string content');
array.push(23423);
array.push(true);

 //type casting
// const first = <string>array[0];
const first = array[0];
//const first = array[0] as string;
//typeguard
// if (typeof first === 'string') {
//     first.
// }
if (isString(first)){
    //first.
}

function isString(value: any): value is string {
    return typeof first === 'string'
}

interface IUser {
    name: string;
    age?: number;
    //? Makes the property optional
}

const user: IUser = {
    name: 'Bob'
}

user.age = 45;

// function User(name, age) {
//     this.name = name;
//     this.age = age;
// }

class User implements IUser {
    //Have to declare what User needs
    name: string;
    age: number;
    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }
}

//get the idea this was all in the platform