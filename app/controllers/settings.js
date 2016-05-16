/**
 * self-executing function to organize otherwise inline constructor code
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {

	// use strict mode for this function scope
	'use strict';
	
	findUser();
	// execute constructor with optional arguments passed to controller
})(arguments[0] || {});

var dispatcher = require('dispatcher'); 

function findUser(){
	var current = Ti.App.Properties.getString('userWhoIsLogged');
	var userList = Ti.App.Properties.getList('userList', []);
	
	for(var i = 0; i < userList.length; i++){
		var user = userList[i];
		
		if(user.username == current){ 
			$.username.text = user.username;
			$.fullname.text =  user.fullname;
			$.email.text =  user.email;
		}
	}
}
    
function reset() { 
	var current = Ti.App.Properties.getString('userWhoIsLogged');
	var userList = Ti.App.Properties.getList('userList', []);
	
	for(var i = 0; i < userList.length; i++){
		var user = userList[i];
		
		if(user.username == current){ 
			user.totalSqueezes = 0;
			
			userList[i] = user;
			Ti.App.Properties.setList('userList', userList);
		}
	}
	dispatcher.trigger('resetFromSettings');
}

function logOut() {
	
	
	Ti.App.Properties.setBool('aUserIsLoggedIn', false);
	Ti.App.Properties.setString('userWhoIsLogged', null);

	Alloy.createController('index').getView().close();
	//Alloy.createController('login').getView().open({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	
}
