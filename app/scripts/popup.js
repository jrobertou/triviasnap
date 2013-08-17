'use strict';

document.addEventListener('DOMContentLoaded', function () {
	$('form').submit(function(e) {
		e.preventDefault();
		chrome.runtime.sendMessage({msg: $(this).attr('action'), form:$(this).serialize()},function(response){
			if(response.success) {
				$('form[action="usergin"]').hide();
				$("#askQuestion").show();
		  	}
		});
		return false;
	});
});