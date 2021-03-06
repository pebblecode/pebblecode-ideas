'use strict';

var http = require('http');
var fs = require('fs');
var express = require('express');

var app = express();

var clients = [];

app.set('title', 'Pebblecode Ideas');
app.set('port', process.env.PORT || 8000);
app.set('host', '0.0.0.0');

// These replace express.bodyParser()
app.use(express.urlencoded());
app.use(express.json());

app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/../app/public'));


app.get('/', function(req, res, next) {
  fs.createReadStream(__dirname + '/../app/public/index.html').pipe(res);
});

app.get('/admin', function(req, res, next) {
  fs.createReadStream(__dirname + '/../app/public/admin.html').pipe(res);
});

var httpServer = http.createServer(app).listen(app.get('port'), app.get('host'), function() {
  require('./db')(function(db, collection) {
    require('./engine')(httpServer, db, collection, clients);
    app.post('/api/twilio', require('./routes/twilio')(db, collection, clients));
  });

});



