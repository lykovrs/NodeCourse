// ВОПРОС - есть ли разница между .then(ok, fail) VS .then(ok).catch(fail) ?

new Promise( function(resolve, reject) {
  // ...
  resolve(1);
}).then( function(result) {
  // ...
  console.log(result);
  // throw new Error('error');
}).catch( function(err) {
  // ...
});

// vs

new Promise( function(resolve, reject) {
  // ...
  return 1;
}).then(
   function(result) { /*...*/ throw new Error('error'); },
   function(err) { /* ... */  }
);
