'use strict'
function add(n) {
  let summ = n;

  function f(m) {
    summ += m;
    return f
  }
  f.valueOf = function() {
    return summ;
  };

  return f;
}

console.log(add(1)(2)(1).valueOf());
