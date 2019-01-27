function fib() {
    var count = 0;
    var next_count = 1;
    var temp;
    // Some variables here
    function nacci() {
      // do something to those variables here
      temp = next_count;
      next_count = next_count + count;
      count = temp;
      console.log(count);
    }
    return nacci
  }
  var fibCounter = fib();
  fibCounter() // should console.log "1"
  fibCounter() // should console.log "1"˜
  fibCounter() // should console.log "2"
  fibCounter() // should console.log "3"
  fibCounter() // should console.log "5"
  fibCounter() // should console.log "8"