var express = require('express');
var bodyParser = require('body-parser');
var app     = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));
require('./js/routes.js')(app);
app.listen(port);
console.log('Magic happens on port '+port);
exports = module.exports = app;
