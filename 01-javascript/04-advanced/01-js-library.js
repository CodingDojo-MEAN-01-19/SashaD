//Can we make this into a method of an object?
function each(arr, callback) {
    // loop through the array
    for(var i = 0; i < arr.length; i++) {
      callback(arr[i]); // invoking the callback many times... delegation!
    }
  }
var _ = {
    //Produces a new array of values by mapping each value in list through a transformation function (iteratee). 
    //The iteratee is passed three arguments: the value, then the index (or key) of the iteration, and finally a reference to the entire list.
    map: function(list, iteratee) {
        //Produces a new array of values by mapping each value in list through a transformation function (iteratee).
        //The iteratee is passed three arguments: the value, then the index (or key) of the iteration, and finally a reference to the entire list.
        const results = [];
        for(index in list){
            results.push(iteratee(list[index]));
        }
        return results;
    },
    reduce: function(list, iteratee, memo) {
        // Also known as inject and foldl, reduce boils down a list of values into a single value.
        // Memo is the initial state of the reduction, and each successive step of it should be returned by iteratee.
        // The iteratee is passed four arguments: the memo, then the value and index (or key) of the iteration, and finally a reference to the entire list.
        //Basically adds everythin in the array
        const results = [].concat(list);
        if (memo === undefined){
            memo = results.pop();
        }
        for(index in list){
            memo = iteratee(memo, list[index], index);
        }
        return memo;
    },
    find: function(list, predicate) { 
        //Looks through each value in the list, returning the first one that passes a truth test (predicate), or undefined if no value passes the test.
        //The function returns as soon as it finds an acceptable element, and doesn't traverse the entire list. 
        //predicate is transformed through iteratee to facilitate shorthand syntaxes.  
        const results = [];
        for(index in list){
            if(predicate(list[index])){
                results.push(list[index]);
                return results;
            }
        }
    },
    filter: function(list, iteratee) { 
        //Looks through each value in the list, returning an array of all the values that pass a truth test (predicate). 
        //predicate is transformed through iteratee to facilitate shorthand syntaxes.
        //WORKS
        const results = [];
        for(index in list){
            if(iteratee(list[index])){
                results.push(list[index]);
            }
        }
        return results;
    },
    reject: function(list, predicate) { 
        //Returns the values in list without the elements that the truth test (predicate) passes. 
        //The opposite of filter. predicate is transformed through iteratee to facilitate shorthand syntaxes.
        //WORKS!
        const results = [];
        for(index in list){
            if(!predicate(list[index])){
                results.push(list[index]);
            }
        }
        return results;
    }
  }
 // you just created a library with 5 methods!
var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
console.log(evens); // if things are working right, this will return [2,4,6].
var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
console.log(odds);
var first_even = _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
console.log(first_even);
var sum = _.reduce([1,2,3,4], function(memo, num){ return memo + num; }, 0);
console.log(sum);
var new_list = _.map([1, 2, 3, 4, 5, 6], function(num){ return num * 3; });
console.log(new_list);