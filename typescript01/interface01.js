var user1 = { firstName: "abcd", lastName: "efgh" };
var user2 = { firstName: "abcd", lastName: "efgh", age: 30 };
function showUser(user) {
    if (user.age) {
        alert(user.firstName + " " + user.lastName + " " + user.age);
    }
    else {
        alert(user.firstName + " " + user.lastName);
    }
}
showUser(user1);
showUser(user2);
