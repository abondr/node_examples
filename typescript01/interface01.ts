interface IPerson{
    firstName:string,
    lastName:string,
    age?:number
}
var user1:IPerson = {firstName:"abcd",lastName:"efgh"};
var user2:IPerson = {firstName:"abcd",lastName:"efgh",age:30};

function showUser(user:IPerson){
    if (user.age) {
        alert(user.firstName + " " + user.lastName + " " + user.age);
    } else {
        alert(user.firstName + " " + user.lastName);
    }
}
showUser(user1);
showUser(user2);