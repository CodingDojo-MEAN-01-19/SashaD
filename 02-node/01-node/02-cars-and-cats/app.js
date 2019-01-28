// get the http module:
var http = require('http');
// fs module allows us to read and write content for responses!!
var fs = require('fs');
// creating a server using http module:
var server = http.createServer(function (request, response){
    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:
    if(request.url === '/cars') {
        fs.readFile('./views/cars.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }
    // request didn't match anything:
    else if (request.url === "/cats") {
        fs.readFile('./views/cats.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(contents); 
            response.end();
        });
   }
   else if (request.url === "/cars/new") {
        fs.readFile('./views/newCar.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(contents); 
            response.end();
        });
    }
    else if(request.url === '/stylesheets/bootstrap.css'){
        fs.readFile('./stylesheets/bootstrap.css', 'utf8', function(errors, contents){
         response.writeHead(200, {'Content-type': 'text/css'});
         response.write(contents);
         response.end();
        })
      }
    else if(request.url === '/images/cat1.jpeg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/cat1.jpeg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpeg'});
            response.write(contents);
            response.end();
        })
    }
    else if(request.url === '/images/cat2.png'){
    // notice we won't include the utf8 encoding
        fs.readFile('./images/cat2.png', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/png'});
            response.write(contents);
            response.end();
        })
    }
    else if(request.url === '/images/cat3.jpg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/cat3.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
    }
    else if(request.url === '/images/cat4.jpg'){
    // notice we won't include the utf8 encoding
        fs.readFile('./images/cat4.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
    }
    else if(request.url === '/images/convertible_porsche.png'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/convertible_porsche.png', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/png'});
            response.write(contents);
            response.end();
        })
    }
    else if(request.url === '/images/ferrari.jpg'){
    // notice we won't include the utf8 encoding
        fs.readFile('./images/ferrari.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
    }
    else if(request.url === '/images/jaguar.png'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/jaguar.png', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/png'});
            response.write(contents);
            response.end();
        })
    }
    else if(request.url === '/images/mclaren.png'){
    // notice we won't include the utf8 encoding
        fs.readFile('./images/mclaren.png', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/png'});
            response.write(contents);
            response.end();
        })
    }
   // request didn't match anything:
   else {
       response.end('URL requested is not availabel!');
   }
}); 
//your server which port to run on
server.listen(7077);
// print to terminal window
console.log("Running in localhost at port 7077");
