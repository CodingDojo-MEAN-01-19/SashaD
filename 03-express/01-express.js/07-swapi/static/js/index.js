$(document).ready(function(){
        $('#peopleBtn').click(function(){
            // let's make the request to our OWN server!
            $.get('/people', function(data){
                // log the data to be sure we have it before we dive into manipulating the DOM
                console.log("got the data", data);
                $('#apicontent').empty();
                for(let i in data.results) {
                    $('#apicontent').append(data.results[i].name + '<br>');
                }
                $('#previous').attr("location", "/people/");
                if(data.previous != null) {
                    $('#previous').attr("page", data.previous);
                }
                else {
                    $('#previous').attr("page", "0");
                }
                $('#next').attr("location", "/people/");
                if(data.next != null) {
                    $('#next').attr("page", data.next);
                }
                else {
                    $('#next').attr("page", "0");
                }
                $('#all').text("Get all " + data.count + " People");
                $('#all').attr("location", "/people/");
            }, 'json');
        });
        $('#planetBtn').click(function(){
            // let's make the request to our OWN server!
            $.get('/planets', function(data){
                // log the data to be sure we have it before we dive into manipulating the DOM
                console.log("got the data", data);
                $('#apicontent').empty();
                    for(let i in data.results) {
                        $('#apicontent').append(data.results[i].name + '<br>');
                    }
                        $('#previous').attr("location", "/planets/");
                        if(data.previous != null) {
                            $('#previous').attr("page", data.previous);
                        }
                        else {
                            $('#previous').attr("page", "0");
                        }
                        $('#next').attr("location", "/planets/");
                        if(data.next != null) {
                            $('#next').attr("page", data.next);
                        }
                        else {
                            $('#next').attr("page", "0");
                        }
                        $('#all').text("Get all " + data.count + " Planets");
                        $('#all').attr("location", "/planets/");
            }, 'json');
        });
    });