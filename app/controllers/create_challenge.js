/**
 * self-executing function to organize otherwise inline constructor code
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {

	// use strict mode for this function scope
	'use strict';
	$.pickerDate.addEventListener('click', function(e) {
		$.pickerDate.blur();
	     
	});
	$.pickerDate.addEventListener('focus', function(e) {
		$.pickerDate.blur();
	    Alloy.createController('create_challenge_picker').getView().open({modal:true});
	     
	});
	
	var scrollDelay = 122;
	
	//dette burde være et loop
	$.challengeName.addEventListener('focus', function() {
		setTimeout(function(){
			$.holder.scrollTo(0, 20);
		}, scrollDelay);
       
    });
    $.numberOfDays.addEventListener('focus', function() {
		setTimeout(function(){
			$.holder.scrollTo(0, 40);
		}, scrollDelay);
       
    });
	
		
})(arguments[0] || {});

var moment = require('alloy/moment');
var dispatcher = require('dispatcher');


dispatcher.on('createChallengeDateSet', function onCreateChallengeDateSet(e) {
	
	var datePicked = Ti.App.Properties.getString('tmpPickedDate');
	$.pickerDate.value = datePicked;
	
	Ti.App.Properties.setString('tmpPickedDate', null);

});

function inviteBtn(){
	$.btns.hide();
	$.savingLbl.visible = true;
	$.numberOfDays.blur();
	setTimeout(function(){
		$.create_challenge.close();
	}, 800);
}
function personalBtn(){
	inviteBtn();
	
}


function selectNextField(e) { 
    var hint = e.source.getHintText(),
        nextOne = false,
        finished = false;

    // find currently focused field then declare that the next field is THE ONE
    _.each($.holder.getChildren(), function(view) {
        if(finished) {
            return;
        }

        if(view.getHintText && view.getHintText() === hint) {
            nextOne = true;
            return;
        }
        if(nextOne && view.getApiName() === 'Ti.UI.TextField') {
            finished = true;
            return view.focus();
        }
    });
}
