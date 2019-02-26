const Rabbit = require('mongoose').model('Rabbit');
module.exports = {
    index: function(req, res){
        Rabbit.find({}, function(err, rabbits){
            //console.log(rabbits);
            if(err){
                console.log('something went wrong');
            } else {
                console.log('successfully got all the rabbits!');
                res.render('index', {rabbits: rabbits});
            }
        })
    },
    create: function(req, res){
        console.log("POST DATA ********", req.body);
        var rabbit = new Rabbit({name: req.body.name, age: req.body.age, favorite_food: req.body.favorite_food});
        //Save the new bunny
        rabbit.save(function(err){
            if(err){
                console.log("We have an error!", err);
                for(var key in err.errors){
                    req.flash('registration', err.errors[key].message);
                }
                res.redirect('/rabbits/new');
            }
            else {
                res.redirect('/');
            }
        })
    },
    form: function(req, res){
        res.render('new_rabbit');
    },
    read: function(req, res){
        var rabbit = req.params.id;
        console.log("Got the ID! " + rabbit);
        Rabbit.find({_id: rabbit}, function(err, rabbits){
            console.log(rabbits)
            if(err){
                console.log('something went wrong');
            } else {
                //console.log('successfully got the rabbit!');
                res.render('rabbit', {rabbits: rabbits});
            }
        })
    },
    updateform: function(req, res){
        var rabbitid = req.params.id;
        console.log("Got the ID! " + rabbitid);
        Rabbit.findById((rabbitid), function(err, rabbit){
            console.log(rabbitid)
            if(err){
                console.log('something went wrong');
            } else {
                console.log('successfully got the rabbit to make available to edit info!');
                res.render('edit_rabbit', {rabbit: rabbit});
            }
        })
    },
    update: function(req, res){
        var rabbitid = req.params.id;
        console.log("******Got the id: " + rabbitid + "*******");
        console.log("SO THE ROUTING WORKS!!!!")
        console.log("POST DATA To Edit ****** ", req.body);
        // This is where we would remove the user from req.body from the database.
        // Try to remove that user from the database 
        // ...delete 1 record by a certain key/value.
        Rabbit.findById((rabbitid), function(err, rabbit){
            // This code will run when the DB has attempted to remove one matching record to {_id: 'insert record unique id here'}
            if(err){
                console.log('something went wrong');
            } else {
                rabbit.name = req.body.name_change;
                rabbit.age = req.body.age_change;
                rabbit.favorite_food = req.body.new_favorite_food;
                rabbit.save(function(err){
                    if(err){
                        // if there is an error upon saving, use console.log to see what is in the err object 
                        console.log("We have an error!", err);
                        // adjust the code below as needed to create a flash message with the tag and content you would like
                        for(var key in err.errors){
                            //should be different error so that the error shows up above the edits not both the new user and the edits
                            req.flash('editerror', err.errors[key].message);
                        }
                        // redirect the user to an appropriate route
                        res.redirect('/rabbits/edit/' + rabbitid);
                    }
                    else {
                        console.log(rabbitid + " Change was a success!")
                        res.redirect('/');
                    }
                });
            }
        });
    },
    destroy: function(req, res){
        console.log(req.params.id);
        Rabbit.remove({_id: req.params.id}, function(err, result){
            if(err){
                console.log("something sent wrong");
            } else {
                console.log("successfully Removed the rabbit: " + req.params.id);
            }
        })
        res.redirect('/');
    }
}