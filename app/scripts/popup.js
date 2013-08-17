'use strict';
var callback = {
	usergin: function(response) {	
		if(response.success) {	
			$('form[action="usergin"]').hide();
			$('#userList').show();
			$('#myusername').html(response.myusername).show();
			// $("#askQuestion").show();
		}
	}
}
document.addEventListener('DOMContentLoaded', function () {

	chrome.runtime.sendMessage({msg: 'getmyusername'}, callback.usergin);

	$('form').submit(function(e) {
		e.preventDefault();
		chrome.runtime.sendMessage({msg: $(this).attr('action'), form:$(this).serialize()});
		return false;
	});

	chrome.runtime.onMessage.addListener(
	  function(request,sender,senderResponse){

	    switch(request.msg) {
	      case 'res_userExist':
	          callback.usergin(request);
	        break;

	      default:
	        break;
	    }
	  }
	);
});