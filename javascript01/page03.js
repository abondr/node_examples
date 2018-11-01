var x = { a: 1, b: 2, c: 3, d: 4, e: 5 }, y = { f: 6, g: 7, h: 8, i: 9, j: 10 };
var new_obj = {};
for (var prop in x) {
    new_obj[prop] = x[prop];
}
for (var prop in y) {
    new_obj[prop] = y[prop];
}

console.log(new_obj);