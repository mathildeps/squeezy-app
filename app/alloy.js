// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals = {
    ctr: 0,
    openWindow: function(e) {
        Alloy.Globals.navWin;
    }
};

Alloy.Globals.navWin;

//DUMMY STORAGE UNTIL API IMPL.
//Ti.App.Properties.setBool('aUserIsLoggedIn', false); //fjern igen når login virker

//Ti.App.Properties.setList('userList', []);