'use strict';

var socket = io.connect("http://localhost:3000/"),
  myusername = null;

// socket.on("userExist", function(data){
//   if(data.result){
//     myusername = data.myusername
//     chrome.runtime.sendMessage({msg: 'res_userExist', success: true, myusername: myusername, users: data.users});
//   } else{
//     chrome.runtime.sendMessage({msg: 'res_userExist', success: false, myusername: myusername, users: data.users});
//   }
  
// });
socket.on("userExist", function(data){
  chrome.runtime.sendMessage({result: data});
}); 

socket.on("newQuestion", function(data){
  chrome.runtime.sendMessage({msg: "newQuestion", data: data});
});


socket.on("result", function(data){
  if(data.response)
    chrome.runtime.sendMessage({msg: "goodanwser"});
  else
    chrome.runtime.sendMessage({msg: "wronganwser"});
});

var bg = {
  sendForm: function(action, data) {
    socket.emit(action, data);
  },

  sendQuestion: function(id) {
    io.sockets.socket(id).emit('newQuestion', {question: question});
  }
};
