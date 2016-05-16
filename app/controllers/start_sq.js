/**
 * self-executing function to organize otherwise inline constructor code
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {

	// use strict mode for this function scope
	'use strict';
	
    overrideBtn();
	$.start_sq.addEventListener('touchstart', function() {
		doSqueeze();
    });
    $.start_sq.addEventListener('touchend', function() {
		squeezeStopped();
    });
    $.start_sq.addEventListener('touchcancel', function() {
		squeezeStopped();
    });
    
    setDefaultText();
    
    
	// execute constructor with optional arguments passed to controller
})(arguments[0] || {});

var dispatcher = require('dispatcher');

function closeWindow(){
    $.start_sq.close();
    
    if(score == 10)	dispatcher.trigger('squeezeSetComplete'); 
    
}

function setDefaultText() {
	var HEADER = "Press the screen..";
	var SUB    = "..while you're squeezing. \nAfter a few seconds the screen will be filled with color and 1 point is rewarded. \nThen you get some time to relax and you can do it again. Repeat the squeezing-exercise to earn all 10 points in the set.'";
	
	$.startHeader.text = HEADER;
	$.startSub.text = SUB;
	
}

function setRelaxText() {
	var HEADER = "Relax... Breathe..";
	var SUB    = "You can relax now for a few seconds before repeating the exercise.";
	
	$.startHeader.text = HEADER;
	$.startSub.text = SUB;
	
}

function setDoneText() {
	var HEADER = "Nice work, Mette!";
	var SUB    = "You completed a full set!\nTo go back and see your overall progress, press the close-button.";
	
	$.startHeader.text = HEADER;
	$.startSub.text = SUB;
	
}


function howBtnClicked(){
	var viewToOpen = Alloy.createController('sq_how').getView();	
    Alloy.Globals.navWin.openWindow(viewToOpen);
}

var count = 0; //flyt disse
var isPressing = false;
var score = 0;
var winner = false;
var isCoolingDown = false;

//var COUNT_AMOUNT = 3.55; //COUNT_AMOUNT % pr. WAIT_IN_MS
//var WAIT_IN_MS = 20;

//PROD
//var COUNT_AMOUNT = 0.50; //COUNT_AMOUNT % pr. WAIT_IN_MS
var WAIT_IN_MS = 10;

var COUNT_AMOUNT = 0.25; //COUNT_AMOUNT % pr. WAIT_IN_MS
//var WAIT_IN_MS = 10;


var MAX_SQUEEZES = 10;

var starttime = null;

$.start_sq.title = 0 + ' / ' + MAX_SQUEEZES;

function doSqueeze() {
	if(!isCoolingDown){
		starttime = new Date();
		isPressing = true;
		setTimeout(updPressing,WAIT_IN_MS);
	}
}
function squeezeStopped() {
	if(!isCoolingDown){
		setTimeout(updAfterPressing,WAIT_IN_MS);
		isPressing = false;
		isCoolingDown = true;
	}
	if(winner){
		setDoneText();
	}
}

var updPressing = function() {
	if(!winner){ //hvis vi ikke har vundet runden
		if(!isCoolingDown){ // og hvis vi ikke køler ned
			if(count >= 103){ //check om vi er over målet, så er det i hvert fald slut
				squeezeStopped();	
			} else {
				if(!isCoolingDown) timeDiff();
				count = count + COUNT_AMOUNT;
				$.circle.height = count + '%';
				if(isPressing){
					
					if(count >= 100){
						madeItToTheTop();
						setRelaxText();
						squeezeStopped();
					}
					
					
					setTimeout(updPressing,WAIT_IN_MS);
					
					
				}
			}
		}
	} else {
		setDoneText();
	}
	
};

function overrideBtn() {
	
	var btnBack = Ti.UI.createButton({
		 title: '',
		 color: "white",
		 	width: '26',
		height: '26',
		 backgroundImage: 'img/close_tr.png'
	 });
	 
	 btnBack.addEventListener('click', function(){
			closeBtnClicked();
	});
	
	$.start_sq.setLeftNavButton(btnBack);
	

}

function timeDiff() {
	var nu = new Date();
	
	var secs = (nu - starttime) / 1000;
	
	$.tmp.title = Math.ceil(secs) + 's';
}

function closeBtnClicked() {
	var dialog = Ti.UI.createAlertDialog({
		      cancel: 1,
		      buttonNames: ['Leave', 'Stay here'],
		      message: 'You will lose your progress.',
		      title: 'Leave before 10 points?'
		  });
		   
		  dialog.addEventListener('click', function(e){
		    if (e.index === e.source.cancel){
		      
		
		    } else if (e.index === 0) {
		      closeWindow();
		    }
		  });
		  
		  if(score > 0 && score < 10) {
		  	dialog.show();
		  } else {
		  	closeWindow();
		  }
}

var updAfterPressing = function() {
	
	if(count > 0){
		
		$.circle.backgroundColor = "#EEE4EF";
		count = count - COUNT_AMOUNT;
		//console.log(count);
		$.circle.height = count + '%';
		setTimeout(updAfterPressing,WAIT_IN_MS);
	} else {
		if(!winner) {
			setDefaultText();
		}
		
		$.tmp.title = ' ';
		isCoolingDown = false;
		$.circle.backgroundColor = "#EAD2ED";
	}
};
	
function madeItToTheTop() {
	score++;
	$.start_sq.title = score + ' / ' + MAX_SQUEEZES;
	
	checkIfComplete();
}

function checkIfComplete(){
	if(score == MAX_SQUEEZES){
		$.start_sq.title = "Set Complete!";
		
		
		winner = true;
		addTenByUserName();
	}
}

function addTenByUserName(){
	var current = Ti.App.Properties.getString('userWhoIsLogged');
	var userList = Ti.App.Properties.getList('userList', []);
	
	for(var i = 0; i < userList.length; i++){
		var user = userList[i];
		
		if(user.username == current){ 
			user.totalSqueezes = user.totalSqueezes + 10;
			
			userList[i] = user;
			Ti.App.Properties.setList('userList', userList);
		}
	}
}

function collectWin() {
	dispatcher.trigger('squeezeSetComplete');
}
