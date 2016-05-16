/**
 * self-executing function to organize otherwise inline constructor code
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {

	// use strict mode for this function scope
	'use strict';
	
		
			
	$.picker.addEventListener('change', function(e) {
		pickerChanged(e.value);
	});
	
	$.picker.minDate = new Date();
	$.picker.maxDate = new Date(2100, 11, 31);
	
	$.picker.value = new Date();
	
	// execute constructor with optional arguments passed to controller
})(arguments[0] || {});



var picked = null;

var dispatcher = require('dispatcher');



function closeModal(){
	
	if(!picked) {
		picked = new Date();
		var todayString = "Today";
		Ti.App.Properties.setString('tmpPickedDate', todayString);
	} else {
		var pickerdate = picked;
	    var day = (pickerdate.getDate() < 10 ? '0' + pickerdate.getDate() : pickerdate.getDate());
	    var m = pickerdate.getMonth()+1;
	    var month = (m < 10 ? '0' + m : m);
	    var year = pickerdate.getFullYear();
	    var newdate = day + "-" + month + "-" + year;
	    
		Ti.App.Properties.setString('tmpPickedDate', newdate);
		
	}
	
	
	picked = null;
	dispatcher.trigger('createChallengeDateSet');
	
	$.picNav.close();
}

function pickerChanged(date) {
	picked = date;
	
}
