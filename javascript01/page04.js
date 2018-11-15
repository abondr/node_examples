function A(p1, p2) {
    A.init(this, p1, p2);
}
A.init = function (new_a, p1, p2) {
    new_a.a1 = p1;
    new_a.a2 = p2;
}
A.prototype.toString = function () {
    return 'A{' +
        'a1 = ' + this.a1 +
        ',a2 = ' + this.a2 +
        '}';
}
function B(p1, p2, p3, p4) {
    B.init(this, p1, p2, p3, p4);
}
B.init = function (new_b, p1, p2, p3, p4) {
    A.init(new_b, p1, p2);
    new_b.b1 = p3;
    new_b.b2 = p4;
}
B.prototype.toString = function () {
    return 'B{' +
        A.prototype.toString.call(this) +
        ',b1 = ' + this.b1 +
        ',b2 = ' + this.b2 +
        '}';
}
function C(p1, p2, p3, p4, p5, p6) {
    C.init(this, p1, p2, p3, p4, p5, p6);
}
C.init = function (inst, p1, p2,
    p3, p4, p5, p6) {
    B.init(inst, p1, p2, p3, p4);
    inst.c1 = p5;
    inst.c2 = p6;
}
C.prototype.toString = function () {
    return 'C{' +
        B.prototype.toString.call(this) +
        ',c1=' + this.c1 +
        ',c2=' + this.c2 +
        '}';
}
c = new C(10, 20, 30, 40, 50, 60);
console.log(c);
console.log(c.toString());
