var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/app/popup.html');
});

var users = new Array(),
  questions = new Array();

var goodAnswer = function(right_answer, given_answer) {
  return right_answer === given_answer;
};

io.sockets.on('connection', function (socket) {

  socket.on('usergin', function(data){    
    var exist = users.indexOf(data.username) != -1 ? true : false;

    if(!exist){
      users[socket.id] = data.username;
      socket.broadcast.emit("newBoy", {id: socket.id, username: data.username});
      socket.emit("userExist", {result: exist, myusername: data.username, users: users});
    }
    else {
      socket.emit("userExist", {result: exist});
    }

    console.log(users[socket.id]);
  });

  socket.on('question_submit', function(data){
    questions[socket.id][data.idTarget] = {question: data.question, answer: data.answer};
  });

  socket.on('answer', function(data){
    awser_checked = goodAnswer(questions[data.idAsker][socket.id].answer, data.answer);
    socket.emit('result', function(data){response: awser_checked});
  });

  socket.on('disconnect', function(){
      io.sockets.emit('someoneLeave', {id: socket.id});
      users[socket.id] = null;
  });
});