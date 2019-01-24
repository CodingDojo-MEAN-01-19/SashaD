function orderSupplies(item, callback) {
  let warehouse; //undefined
  const deliveryTime = Math.random() * 3000;

  setTimeout(function() {
    warehouse = {
      paint: {
        product: 'Neon Green Paint',
        directions: function() { return 'mix it!' }
      },
      brush: {
        product: 'Horsehair brush',
        directions: function() { return 'start painting!' }
      },
      tarp: {
        product: 'A large tarp',
        directions: function(){ return 'cover the floor!'}
      }
    };

    callback(warehouse[item]);
  }, deliveryTime);
}

function receivedItem(item) {
  console.log(`Received ${item.product} time to ${item.directions()}`);
}

//orderSupplies('paint', function(item{
//  receivedItem(item);
//  orderSupplies('brush', receivedItem);
//}));

/* let havePaint = false;

orderSupplies('paint', function(item){
  receivedItem(item);
  havePaint = true;
}); */
/*
orderSupplies('brush', function(item){
  if(havePaint){
    receivedItem(item);
  } else{
    while(!havePaint){} *infinite loop
    setInterval(function(){
      console.log('.....checking for paint.....')
      if(havePaint){
        receivedItem(item);
        clearInterval(timer);
      }
    }, 50)
    
  }
});
*/
/* orderSupplies('brush', handleBrush);

function handleBrush(item){
  console.log('....checking for paint.....');
  if(havePaint){
    return receivedItem(item);
  }
  setTimeout(handleBrush, 50, item);
  
} */
/* const items = ['tarp','paint', 'brush'];
function order(items){
  console.log(items);
  const results = [];

  for (let index=0; index<items.length; index++){
    const item = items[index];
    orderSupplies(item, function(product){
      //console.log('product', product);
      results[index] = product;

      console.log('results', results);

      if(results.filter(i => i).length === items.length){
        results.forEach(p => receivedItem(p));
      }
    });
  }
} */

order(items);

const paint = new Promise(function(resolve, reject){
  orderSupplies('paint', resolve);
});
const brush = new Promise(function(resolve, reject){
  orderSupplies('brush', resolve);
});

paint
  .then(function(item){
    receivedItem(item);

    return brush
    .then(function(item){
      receivedItem(item);
    });
  });
  .catch(function(error){
    console.log(error);
  });

