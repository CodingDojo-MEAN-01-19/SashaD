//DON'T USE VAR!
//let or const
//if const you cannot reassign
//You must tell it the type
var myString = 'this is a string';
var array = ['cat', 'dog'];
//tell it that it can take all types
array.push('string content');
array.push(23423);
array.push(true);
//type casting
// const first = <string>array[0];
var first = array[0];
//const first = array[0] as string;
//typeguard
// if (typeof first === 'string') {
//     first.
// }
if (isString(first)) {
    //first.
}
function isString(value) {
    return typeof first === 'string';
}
var user = {
    name: 'Bob'
};
user.age = 45;
// function User(name, age) {
//     this.name = name;
//     this.age = age;
// }
var User = /** @class */ (function () {
    function User(name, age) {
        this.name = name;
        this.age = age;
    }
    return User;
}());

//get the idea all of this was in the platform
