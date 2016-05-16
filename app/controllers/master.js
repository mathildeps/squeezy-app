/**
 * self-executing function to organize otherwise inline constructor code
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {

	// use strict mode for this function scope
	'use strict';
	
	$.greeting.text = 'Hey, ';
	$.name.text = Ti.App.Properties.getString('userWhoIsLogged', 'Tester');
	
	initCircle(calcCircPercent());
	dailyBarInit(getActiveSq());
	
	
	// execute constructor with optional arguments passed to controller
})(arguments[0] || {});

var dispatcher = require('dispatcher');

dispatcher.on('resetFromSettings', function onResetFromSettings(e) { 
	dailyReset();
});

function openProfileWindow(e) {
    var viewToOpen = Alloy.createController('settings').getView();
   Alloy.Globals.navWin.openWindow(viewToOpen);
}

function openCreateChalWindow(e) {
    var viewToOpen = Alloy.createController('create_challenge').getView();
    Alloy.Globals.navWin.openWindow(viewToOpen);
}

function openStartSqWindow(e) {
    var viewToOpen = Alloy.createController('start_sq').getView();	
    Alloy.Globals.navWin.openWindow(viewToOpen);
}

function calcCircPercent(){
	var MAX = 70;
	var currentSq = getActiveSq();
	var calc = currentSq / MAX * 100;
	return Math.floor(calc);
}

function calcOLDCircPercent(){
	var MAX = 70;
	var currentSq = getActiveSq() - 10;
	var calc = currentSq / MAX * 100;
	return Math.floor(calc);
}

function getActiveSq() {
	var current = Ti.App.Properties.getString('userWhoIsLogged');
	var userList = Ti.App.Properties.getList('userList', []); 
	
	for(var i = 0; i < userList.length; i++){
		var user = userList[i];
		
		if(user.username == current){ 
			return user.totalSqueezes;
		} 
	}
}

function dailyBar(time, num) {
	if (num>30) num = 30;
	var NUM_COMPLETE = num; //fra api
	var time = time;
	if(num == 0){
		var numDivided = 0; // 1,2,3
	} else {
		var numDivided = NUM_COMPLETE/10; // 1,2,3
	}
	
	
	if(numDivided >= 1){
		setTimeout(function(){
			
		$.todaysFirst.backgroundColor = "#B96CC3";
		$.dailyCompleted.text = 10;
		}, time);
	}
	if(numDivided >= 2){
		setTimeout(function(){
				
			$.todaysSecond.backgroundColor = "#B96CC3";
			$.dailyCompleted.text = 20;
		}, time*2);
	}
	if(numDivided >= 3){
		setTimeout(function(){
				
			$.todaysThird.backgroundColor = "#B96CC3";
			$.dailyCompleted.text = NUM_COMPLETE;
		}, time*3);
	} else {
		
	}
	
}
function dailyReset(){
	$.todaysFirst.backgroundColor = "#E5B1E5";
	$.todaysSecond.backgroundColor = "#E5B1E5";
	$.todaysThird.backgroundColor = "#E5B1E5";
	$.dailyCompleted.text = 0;
}
function dailyBarInit(num) {
	if (num>30) num = 30;
	var NUM_COMPLETE = num; //fra api
	if(num == 0){
		var numDivided = 0; // 1,2,3
	} else {
		var numDivided = NUM_COMPLETE/10; // 1,2,3
	}
	
	
	if(numDivided >= 1){
		$.todaysFirst.backgroundColor = "#B96CC3";
		$.dailyCompleted.text = 10;
	}
	if(numDivided >= 2){
		$.todaysSecond.backgroundColor = "#B96CC3";
		$.dailyCompleted.text = 20;
		
	}
	if(numDivided >= 3){
		$.todaysThird.backgroundColor = "#B96CC3";
		$.dailyCompleted.text = NUM_COMPLETE;
		
	} else {
		
	}
	
}
function getAnim() {
	return false;
}
//max = nuværende %
function initCircle(max) {
	
	var UPDATE_TIME = 20;
	
	var WAIT_AFTER_LOGIN = 500;
	
	var tmpMax = max/100;
	var max = parseFloat(tmpMax.toFixed(2));
	var circularProgressBar = require("circularProgressBar");
	var done = 0.00;
	var circleProgress = circularProgressBar({
	    percent:done,
	    size:130,
	    margin:1,
	    backgroundColor:'#f9f2fa',
	    progressColor:'#cc66cc',
	    topper: {
	        color:'#fff',
	        size: 100
	    },
	    top: 10,
	    bottom: 10,
	    font: {
	        visible: true,
	        color: '#B96CC3',
	        size: 24,
	        shadowColor: '#aaa',
	        shadowRadius: 0,
	        shadowOffset: {
	            x: 0,
	            y: 0
	        }
	    }
	});
	
	var upd = function() {
	    done += 0.01;
	    done = parseFloat(done.toFixed(2)); 
	    if (done > max) return;
	    circleProgress.update(done);
	    setTimeout(upd,UPDATE_TIME);
	};
	//console.log(Ti.App.Properties.getBool('initAnim'));
	if(Ti.App.Properties.getBool('initAnim')){ 
		setTimeout(function(){
			setTimeout(upd,UPDATE_TIME); 
		}, WAIT_AFTER_LOGIN);
		
			Ti.App.Properties.setBool('initAnim', false); 
	} else {
		circleProgress.update(max);
	}
	
	
	var dispatcher = require('dispatcher');
	 
	dispatcher.on('squeezeSetComplete', function onSqueezeSetComplete(e) { 
		var OLD_VALUE = calcOLDCircPercent()/100; //FRA STORAGE
		var NEW_VALUE = calcCircPercent()/100; //FRA STORAGE
		
		circleProgress.update(OLD_VALUE);
		
		setTimeout(function(){
			done = parseFloat(OLD_VALUE.toFixed(2));
			max = parseFloat(NEW_VALUE.toFixed(2));
			setTimeout(upd,UPDATE_TIME*3);
		}, 300);
		
		dailyBarInit(getActiveSq());
		
	});
	dispatcher.on('resetFromSettings', function onResetFromSettings(e) { 
		dailyReset();
		
		var OLD_VALUE = calcOLDCircPercent()/100; //FRA STORAGE
		var NEW_VALUE = calcCircPercent()/100; //FRA STORAGE
		
		circleProgress.update(OLD_VALUE);
		
		setTimeout(function(){
			done = parseFloat(OLD_VALUE.toFixed(2));
			max = parseFloat(NEW_VALUE.toFixed(2));
			setTimeout(upd,UPDATE_TIME*3);
		}, 300);
		
		dailyBarInit(getActiveSq());
	});
	
	circleProgress.addEventListener("click",function(e){
	    
	});
	
	$.t.add(circleProgress);
}

