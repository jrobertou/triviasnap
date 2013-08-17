'use strict';

var background = chrome.extension.getBackgroundPage();

var createuserlist = function(data) {
	return '<li>'+
		data.username+' VS You<br/>'+
		'0 + 0'+
		'<button data-id="data.id" class="askhim">Ask question to him</button>'+
		'</li>';
}
var callback = {
	usergin: function(response) {	
		if(!response.result) {	
			$('form[action="usergin"]').hide();
			$('#userList').show();
			$('#myusername').html(response.myusername).show();

			var users = response.users,
				htmlUsers = '';
			for (var currentUser in users) {
				htmlUsers +=  createuserlist(currentUser);
			};
			if(htmlUsers != '')
				$("#askQuestion ul").html(htmlUsers);
		}
	}
}
document.addEventListener('DOMContentLoaded', function () {

	// chrome.runtime.sendMessage({msg: 'getmyusername'}, );

	$('form').submit(function(e) {
		e.preventDefault();

		background.bg.checkUsername($(this).serialize());

		chrome.runtime.onMessage.addListener(
			function(request,sender,senderResponse){
				callback.usergin(request.result);
		});	
	
		return false;
	});

	chrome.runtime.onMessage.addListener(
			function(request,sender,senderResponse){
		var opt = {
		  message: "Primary message to display",
		}
		chrome.notifications.create("newQuestion", opt, function(notificationId){});
	});

});