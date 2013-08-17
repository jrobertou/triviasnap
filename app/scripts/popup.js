'use strict';

var background = chrome.extension.getBackgroundPage();

var createuserlist = function(data) {
	return '<li><p>'+
		data.username+' VS You'+
		'<span class="score">1-3</span></p><button>Ask</button></li>';

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
				if(data && data.username)
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

		background.bg.sendForm($(this).attr('action'), $(this).serializeObject());

		chrome.runtime.onMessage.addListener(
			function(request,sender,senderResponse){
				callback.usergin(request.result);
		});

		
	
		return false;
	});
});