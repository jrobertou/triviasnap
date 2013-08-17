'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
	console.log('previousVersion', details.previousVersion);
});

chrome.runtime.onMessage.addListener(
	function(request,sender,senderResponse){
		if(request.msg==="form"){
			console.log("receive from socket server: "+JSON.stringify(form));
		}
	}
);