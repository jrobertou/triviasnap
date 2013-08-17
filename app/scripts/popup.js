'use strict';


var background = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function () {
	$('form').submit(function(e) {
		e.preventDefault();
		// chrome.runtime.sendMessage({msg: $(this).attr('action'), form:$(this).serialize()},function(response){
		// 	if(response.success) {
		// 		if(response.result){
		// 			$('form[action="usergin"]').hide();
		// 			$('#userList').show();	
		// 		}
				
		// 		// $("#askQuestion").show();
		//   	}
		// });
		background.bg.checkUsername($(this).serialize());
		return false;
	});
});