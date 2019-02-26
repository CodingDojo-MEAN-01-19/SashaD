const mongoose = require('mongoose'),
      Quote = mongoose.model('Quote')
module.exports = function(app){
    app.get('/', function(req, res) {
        res.render('index');
        // This is where we will retrieve the users from the database and include them in the view page we will be rendering.  
    })
       // all other routes
       // Go to the quotes page
    app.get('/view/quotes', function(req, res){
        Quote.find({}).sort('-date').exec(function(err, quotes){
            if(err){
                console.log('something went wrong');
            } else {
                console.log('successfully got all the quotes!');
                res.render('quotepage', {quotes: quotes});
            }
        })
    })
    app.post('/quotes', function(req, res){
        console.log("POST DATA ********", req.body);
        var quote = new Quote({name: req.body.name, quote: req.body.quote});
        //Save new quote to database
        quote.save(function(err){
            if(err){
                console.log("We have an error!", err);
                for(var key in err.errors){
                    req.flash('registration', err.errors[key].message);
                }
                res.redirect('/');
            }
            else {
                res.redirect('/view/quotes');
            }
        })
    })
}    