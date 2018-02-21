// Что выведет?

const promise = new Promise((resolve, reject) => {
  // try/catch -> reject
  throw new Error("WOPS");
});


promise.then( function(result) {
  console.log("Result", result);
}, function(err) {
  console.log("Caught", err);
});
