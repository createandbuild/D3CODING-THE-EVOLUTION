var express = require('express');
var morgan = require('morgan');
var port = process.env.PORT || 8888;
var app = express();
var path = require('path');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, function() {
  console.log(`Website listening on port ${port}!`)
});
