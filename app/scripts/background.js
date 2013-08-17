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

var bg = {
  sendForm: function(action, data) {
    socket.emit(action, data);
  },

  sendQuestion: function(id) {
    io.sockets.socket(id).emit('newQuestion', {question: question});
  }
}
// chrome.runtime.onMessage.addListener(
// 	function(request,sender,senderResponse){
		
// 		if(request.msg === "usergin"){
			
// 			// return true;
// 		} else if (request.msg === "question"){
// 			socket.emit("usergin", {question: request.form.question, answer: request.form.answer});

// 			socket.on("", function(data){
// 				senderResponse({success: true});
// 			});
// 		} else if (request.msg === "userList"){
// 			socket.emit("usergin", {question: request.form.question, answer: request.form.answer});

// 			socket.on("", function(data){
// 				senderResponse({success: true});
// 			});
// 		}
// 	}
// );

// chrome.runtime.onMessage.addListener(
//   function(request,sender,senderResponse){

//     switch(request.msg) {
//       case 'getmyusername':
//           senderResponse({success: myusername, myusername: myusername});
//         break;

//       case 'usergin':
//         socket.emit("usergin", {username: request.form});
//         break;

//       case 'question':
//         socket.emit("usergin", {question: request.form.question, answer: request.form.answer});
//         socket.on("", function(data){
//           senderResponse({success: true});
//         });
//         break;

//       case 'userList':
//         socket.emit("usergin", {question: request.form.question, answer: request.form.answer});
//         socket.on("", function(data){
//           senderResponse({success: true});
//         });
//         break;

//       default:
//         break;
//     }
//   }
// );
