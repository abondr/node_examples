function myModuleFunction() {
    console.log("Module 01 Function Called\n");
}

var myModule01String = "string from module01\n";

module.exports.myModule01String = myModule01String;
module.exports.myModuleFunction = myModuleFunction;