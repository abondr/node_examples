var rectangle01 = require('./rectangle01');

var solveRect = (l, b) => {
    console.log(`Solving for rectangle with ` +
        ` length = ${l} and breadth ${b}`);
    rectangle01(l, b, (error01, rectangleObj) => {
        console.log(`+++++++++++++++++start+++++${l}+++++${b}+++++++++++++++++`);
        if (error01) {
            console.log("---error start");
            console.log(

            );
            console.log("---error end");
        } else {
            console.log(`=====result=====start==`);
            console.log(`length = ${l} and breadth ${b}`);
            console.log(`Area is ` + rectangleObj.area());
            console.log(`Perimeter is ` + rectangleObj.perimeter());
            console.log(`=====result=====end==`);
        }
        console.log(`+++++++++++++++++end+++++++${l}+++++${b}++++++++++++++++++++++`);
    });
}

solveRect(2, 4);
solveRect(-3, 5);
solveRect(3, 5);