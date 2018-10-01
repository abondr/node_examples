var express = require('express')  
  , hbs     = require('express-hbs')
  , app
  ;

// create Express 4 App
app = express();

// set the view engine
app.set('view engine', 'hbs');

// configure the view engine 
app.engine('hbs', hbs.express4({  
  defaultLayout: __dirname + '/views/layouts/default.handlebars',
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts'
}));

// configure views path
app.set('views', path.join(__dirname,'/views'));

server.get('/', function(req, res) {  
  var user = {
    first: 'Brian',
    last: 'Mancini',
    site: 'http://derpturkey.com',
    age: 32
  }
  res.render('index', user);

});

server.listen(3000);  