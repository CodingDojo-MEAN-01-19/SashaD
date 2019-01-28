module.exports = function (){
    return {
        add: function(num1, num2) { 
            var sum;
            sum = num1 + num2;
            console.log(sum);
            return sum;
           // add code here 
        },
        multiply: function(num1, num2) {
            var product;
            product = num1 * num2;
            console.log(product);
            return product;
            // add code here 
        },
        square: function(num) {
            var squared;
            squared = num * num;
            console.log(squared);
            return squared;
            // add code here 
        },
        random: function(num1, num2) {
            var random_num;
            random_num = Math.floor((Math.random() * num2) + num1);
            console.log(random_num);
            return random_num;
            // add code here
        }
    }
};