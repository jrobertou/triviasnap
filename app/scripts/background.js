'use strict';

var socket = io.connect("http://localhost:3000/");

var bg = {
	checkUsername: function(username){
		socket.emit("usergin", {username: request.form});
		// return true;
		socket.on("userExist", function(data){
			return data.result;
		});	
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