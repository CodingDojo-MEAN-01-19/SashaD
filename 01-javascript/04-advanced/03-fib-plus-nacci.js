function fib() {
  var count = 0;
  var next_count = 1;
  var temp;
  // Some variables here
  function nacci() {
    // do something to those variables here
    temp = next_count;
    next_count = next_count + count; //when it runs the first time count is equal to 0 and next_count is equal to 1
    count = temp; // here count becomes what next_count was equal to
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