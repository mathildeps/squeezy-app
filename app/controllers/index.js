/**
 * self-executing function to organize otherwise inline constructor code
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {

	// use strict mode for this function scope
	'use strict';
	
	if(!Ti.App.Properties.getBool('aUserIsLoggedIn')){
		Alloy.createController('login').getView().open();
	} else { 
		$.navWin.open();
	}
	
	Alloy.Globals.navWin = $.navWin;
	
	// execute constructor with optional arguments passed to controller
})(arguments[0] || {});
