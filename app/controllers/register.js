/**
 * self-executing function to organize otherwise inline constructor code
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {

	// use strict mode for this function scope
	'use strict';
	var scrollDelay = 122;
	
	//dette burde være et loop
	$.name.addEventListener('focus', function() {
		setTimeout(function(){
			$.holder.scrollTo(0, 140);
		}, scrollDelay);
       
    });
    $.email.addEventListener('focus', function() {
		setTimeout(function(){
			$.holder.scrollTo(0, 140);
		}, scrollDelay);
       
    });
    $.username.addEventListener('focus', function() {
		setTimeout(function(){
			$.holder.scrollToBottom();
		}, scrollDelay);
       
    });
    $.password.addEventListener('focus', function() {
		setTimeout(function(){
			$.holder.scrollToBottom();
		}, scrollDelay);
       
    });
    $.retypepassword.addEventListener('focus', function() {
		setTimeout(function(){
			$.holder.scrollToBottom();
		}, scrollDelay);
       
    });
    
	// execute constructor with optional arguments passed to controller
})(arguments[0] || {});



var userList = Ti.App.Properties.getList('userList', []);




function isFormComplete(){
	
}

function completeRegister(){
	var isValid = true;
	
	if(isNameTaken()){
		isValid = false;
		alert("Username is taken.");
		return;
	}

	if($.name.value == ''){
		isValid = false;
		alert("Name field is required.");
		return;
	}
	if($.email.value == ''){
		isValid = false;
		alert("Email field is required.");
		return;
	}
	if($.username.value == ''){
		isValid = false;
		alert("Username password field is required.");
		return;
	}
	if($.password.value == ''){
		isValid = false;
		alert("Password field is required.");
		return;
	}
	if($.retypepassword.value == ''){
		isValid = false;
		alert("Re-type password field is required.");
		return;
	}
	if($.password.value != $.retypepassword.value){
		isValid = false;
		alert("Passwords must be the same.");
		return;
	}
	
	if(isValid){
		// complete req
		saveNewUser();
		$.btns.hide();
		$.savingLbl.visible = true;
		$.retypepassword.blur();
		setTimeout(function(){
			Alloy.createController('register').getView().close();
			Alloy.createController('login').getView().open({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
		}, 800);
		
	}
	
}

function goToLogin(){
	//Alloy.createController('register').getView().close();
	Alloy.createController('login').getView().open({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
	
	
}

function saveNewUser(){
	
	var newUserObj = {};
	newUserObj.username = $.username.value;
	newUserObj.password = $.password.value; //skal krypteres!
	
	newUserObj.fullname = $.name.value;
	newUserObj.email = $.email.value;
	
	newUserObj.totalSqueezes = 0;
	
	userList.push(newUserObj);
	
	Ti.App.Properties.setList('userList', userList);
	
	

}

function isNameTaken(){
	var userList = Ti.App.Properties.getList('userList', []);
	
	for(var i = 0; i < userList.length; i++){
		var user = userList[i];
		
		if(user.username == $.username.value){ 
			return true;
		}
	}
	
	return false;
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