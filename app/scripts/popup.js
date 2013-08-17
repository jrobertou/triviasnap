'use strict';

var background = chrome.extension.getBackgroundPage();

var createuserlist = function(data) {
	return '<li><p>'+
		data.username+' VS You'+
		'<span class="score">1-3</span></p><button data-id="' + data.id + '" class="askhim">Ask</button></li>';
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
	},

	newQuestion: function(response) {		
			$('form[action="usergin"]').hide();
			$('#userList').hide();
			$('#askQuestion').hide();
			$('#myusername').html(response.myusername).show();

			$("#newQuestion").show();
			$("#newQuestion").find("p").text(response.data.question);
		
	}
}
document.addEventListener('DOMContentLoaded', function () {

	// chrome.runtime.sendMessage({msg: 'getmyusername'}, );

	// chrome.runtime.onMessage.addListener(
	// 		function(request,sender,senderResponse){

		
	// });

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

chrome.runtime.onMessage.addListener(
			function(request,sender,senderResponse){

	 switch(request.msg) {

      case 'newQuestion':
      	var opt = {
			  message: "New question!",
			}
			chrome.notifications.create("newQuestion", opt, function(notificationId){});
      	document.addEventListener('DOMContentLoaded', function () {
      		callback.newQuestion(request);
		});      
        break;

      default:
        break;
    }
  
	
});