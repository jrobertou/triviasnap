'use strict';

var socket = io.connect("http://localhost:3000/");

chrome.runtime.onMessage.addListener(
	function(request,sender,senderResponse){

		if(request.msg === "usergin"){
			socket.emit("usergin", {username: request.form});

			socket.on("", function(data){

			});
			
			senderResponse({success: true});
		} else if (request.msg === "question"){
			socket.emit("usergin", {question: request.form.question, answer: request.form.answer});
			senderResponse({success: true});
		}
	}
);