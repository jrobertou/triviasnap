'use strict';

var background = chrome.extension.getBackgroundPage();

var createuserlist = function(data) {
	return '<li>'+
		data.username+' VS You<br/>'+
		'0 + 0'+
		'<button data-id="' + data.id + '" class="askhim">Ask question to him</button>'+
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
			for (var i = 0, imax = users.length; i < imax; i++) {

				if(users[i] && users[i].username)
					htmlUsers +=  createuserlist(users[i]);
			};
			if(htmlUsers != '')
				$("#userList ul").html(htmlUsers);
		}
	}
}
document.addEventListener('DOMContentLoaded', function () {

	// chrome.runtime.sendMessage({msg: 'getmyusername'}, );

	$('form').submit(function(e) {
		e.preventDefault();

		background.bg.sendForm($(this).attr('action'), $(this).serializeObject());

		chrome.runtime.onMessage.addListener(
			function(request,sender,senderResponse){
				callback.usergin(request.result);
		});	
	
		return false;
	});

	// chrome.runtime.onMessage.addListener(
	// 		function(request,sender,senderResponse){
	// 	var opt = {
	// 	  message: "Primary message to display",
	// 	}
	// 	chrome.notifications.create("newQuestion", opt, function(notificationId){});
	// });

});