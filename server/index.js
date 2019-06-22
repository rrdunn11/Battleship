var express = require('express');
var bodyParser = require('body-parser');
var socket = require('socket.io');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');
var {playerBoard, opponentBoard} = require('./boardStates.js');
var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/board', function (req, res) {
  res.status(200).json({playerBoard, opponentBoard});
});

app.put('/board', function (req, res) {
  
});

var server = app.listen(3000, function() {
  console.log('listening on port 3000!');
});
var io = socket(server);

io.on('connection', function(socket) {
  console.log('Connected', socket.id);
})

