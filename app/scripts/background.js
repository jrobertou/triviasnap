'use strict';

var socket = io.connect("http://localhost:3000/");

chrome.runtime.onMessage.addListener(
	function(request,sender,senderResponse){

		if(request.msg === "usergin"){
			socket.emit("usergin", {username: request.form});

			socket.on("userExist", function(data){
				if(data.result){
					senderResponse({success: true, users: data.users});
				} else{
					senderResponse({success: false});
				}
				
			});

		} else if (request.msg === "question"){
			socket.emit("usergin", {question: request.form.question, answer: request.form.answer});

			socket.on("", function(data){
				senderResponse({success: true});
			});
		} else if (request.msg === "userList"){
			socket.emit("usergin", {question: request.form.question, answer: request.form.answer});

			socket.on("", function(data){
				senderResponse({success: true});
			});
		} 
	}
);