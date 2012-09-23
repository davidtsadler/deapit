var express = require('express')
	,routes = require('./routes')
	,http = require('http');

var app = express();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon('public/favicon.ico'));
	app.use(express.static(__dirname + '/public'));
	app.use(app.router);
});

app.get('/', routes.index);

http.createServer(app).listen(3000);

console.log('DEAPIT server listening on port 3000');
