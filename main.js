// Filename: main.js
// Require.js allows us to configure shortcut alias



require.config({
    baseUrl: "js",    
    paths: {
        'angular': 'js/external/angular',
        'angular-route': 'js/external/angular-route',
        'angularAMD': 'js/external/angularAMD.min',
        'jquery' : 'js/external/jQuery',
        'underscore' : 'js/external/underscore-min',
    },
    shim: { 'angularAMD': ['angular'], 'angular-route': ['angular'] },
   
});

require(["jquery","underscore","app"], function($,_,App){
	alert("gvdfg")
		 	//App.init();
			
    });