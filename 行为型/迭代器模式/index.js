// ES6提供了Symbol.iterator
// var arr = [1, 2, 3];
// var iter = arr[Symbol.iterator]();
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());

// 自己实现一个
var iteratorGenerator = function (list) {
  var idx = 0;
  var len = list.length;
  return {
    next: function () {
      var done = idx >= len;
      return {
        value: !done ? list[idx++] : undefined,
        done: done,
      };
    },
  };
};

var iter = iteratorGenerator([1, 2, 3]);
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
