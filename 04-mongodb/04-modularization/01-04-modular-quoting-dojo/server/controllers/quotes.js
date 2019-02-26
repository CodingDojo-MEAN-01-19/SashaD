const Quote = require('mongoose').model('Quote');
module.exports = {
    index: function(req, res){
        res.render('index');
    },
    create: function(req, res){
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
    },
    read: function(req, res){
        Quote.find({}).sort('-date').exec(function(err, quotes){
            if(err){
                console.log('something went wrong');
            } else {
                console.log('successfully got all the quotes!');
                res.render('quotepage', {quotes: quotes});
            }
        })
    } 
}