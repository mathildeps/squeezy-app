/**
 * self-executing function to organize otherwise inline constructor code
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {

	// use strict mode for this function scope
	'use strict';
	var scrollDelay = 122;
	
	//dette burde være et loop
	$.username.addEventListener('focus', function() {
		setTimeout(function(){
			$.holder.scrollTo(0, 50);
		}, scrollDelay);
       
    });
    $.password.addEventListener('focus', function() {
		setTimeout(function(){
			$.holder.scrollTo(0, 50);
		}, scrollDelay);
       
    });
    
	// execute constructor with optional arguments passed to controller
})(arguments[0] || {});



var userList = Ti.App.Properties.getList('userList', []);





function doLogin(){
	if($.username.value == '' || $.password.value == ''){
		alert('Username or password missing.');
	} else {
		var foundUser = false;
		_.each(userList, function(user){
			if(user.username == $.username.value){ //findes brugeren?
				if(user.password == $.password.value){ //så tjekker vi pw (crypt in future)
					foundUser = true;
					$.formHolder.visible = false;
					
					$.savingLbl.visible = true;
					//$.holder.hide(); 
					$.password.blur();
					Ti.App.Properties.setBool('aUserIsLoggedIn', true);
					Ti.App.Properties.setString('userWhoIsLogged', user.username);
					Ti.App.Properties.setBool('initAnim', true);
					
					setTimeout(function(){
						Alloy.createController('index').getView().open();
					}, 800);
		
					
					
				}
			}
		});
		if(!foundUser){
			alert('Wrong username and password combination.');
		}
	}
	
}

function goToReq(){
	Alloy.createController('register').getView().open({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	
}

function selectNextField(e) { 
    var hint = e.source.getHintText(),
        nextOne = false,
        finished = false;

    // find currently focused field then declare that the next field is THE ONE
    _.each($.formHolder.getChildren(), function(view) {
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