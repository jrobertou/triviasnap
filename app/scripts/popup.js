'use strict';

var triviasnap =  {
	formListener = function(){
		$('form').submit(function(event) {
			event.preventDefault();
			$.ajax({
				type: $(this).attr('method'),
				url: $(this).attr('action'),
				data: $(this).serialize(), 
				dataType: 'json',
				success: function(data) {
			    if(data.success) {
			    }
			    else {
			    }
				},
				error: function(data) {
				  alert('Une erreur est survenue.');
				} 
			});
			return false;
		});
	}
};