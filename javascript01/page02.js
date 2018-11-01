function Singer() { }; // no properties
var patty = new Singer(),
    maxene = new Singer(),
    laverne = new Singer();
Singer.prototype.sing = function () {
    return "sa re ga ma";
};
patty.sing = function () {
    return '...boogie woogie bugle boy...';
}


console.log(patty.sing());
console.log(maxene.sing());
