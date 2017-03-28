(function(){
	angular.module('tarefaApp.services')

	.config(['$httpProvider', function ($httpProvider) {
		console.log('LoadSpinnerInterceptor.config start');
	    $httpProvider.interceptors.push('LoadSpinnerInterceptor');
	}]);

})();