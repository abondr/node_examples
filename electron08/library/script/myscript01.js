let request = require("request");
console.log("wefwef");
let url1 = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getContentToPage() {
    request(url1, function(error, response, body) {
        let bodyJson = JSON.parse(body);
        let randomQuote = bodyJson[0]['content'];
        let author = bodyJson[0]['title'];
        $("#quote").html(randomQuote);
        $("#title").html(author);
    });
}
$("#reload").on("click", function() {
    getContentToPage();
});
setInterval(function() {
    getContentToPage();
}, 10000);