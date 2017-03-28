(function() {
	"use strict";
	
	console.log('tarefaApp start');
	angular.module('tarefaApp',['ui.router','utils.service','tarefaApp.services','loader'])

	.run( ['$rootScope', '$log', function ($rootScope, $log) {
	    console.log('tarefaApp.run start');
		$rootScope.$log = $log;
		$rootScope.$log.debug('tarefaApp.run start');
	}]);

	angular.module('tarefaApp.services',[]);
	angular.module('loader',[]);

})();