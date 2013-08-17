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
    if(data && data.username){
      var exist = users.indexOf(data.username) != -1 ? true : false;
      if(!exist){
        var user = {};
        user['id'] = socket.id;
        user['username'] = data.username;
        users.push(user);
        socket.broadcast.emit("newBoy", {id: socket.id, username: data.username});
        socket.emit("userExist", {result: exist, myusername: data.username, users: users});
      }
      else {
        socket.emit("userExist", {result: exist});
      }
    }
  });

  socket.on('question_send', function(data){
    var question = {};
    question.socketid = socket.id;
    question.idtarget = data.idtarget;
    question.question = data.question;
    question.answer = data.answer;
    questions.push(question);
    // questions[socket.id][data.idtarget] = {question: data.question, answer: data.answer};
    io.sockets.socket(data.idtarget).emit('newQuestion', {question: question.question, idAsker: socket.id});
  });

  socket.on('question_submit', function(data){

    goodAnswer(questions[data.idAsker][socket.id], data.response);
  });

  socket.on('answer', function(data){
    var awser_checked;
    for (var i = 0, imax = questions.length; i < imax; i++){
      if(questions[i].question.socketid == data.idAsker && questions[i].question.idtarget == socket.id){
        awser_checked = questions[i].question.answer;
      }  
    }
    awser_checked = goodAnswer(awser_checked, data.answer);
    socket.emit('result', function(data){response: awser_checked});
  });

  socket.on('disconnect', function(){
      io.sockets.emit('someoneLeave', {id: socket.id});
      users[socket.id] = null;
  });
});