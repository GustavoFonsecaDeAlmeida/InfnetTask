(function() {
  "use strict";

  angular.module('tarefaApp')

  .run( ['$rootScope', '$state', '$stateParams',
  	function ($rootScope,   $state,   $stateParams) {
      $rootScope.$log.debug('tarefaApp.ui-route.run start');
  		$rootScope.$state = $state;
  		$rootScope.$stateParams = $stateParams;
  }])

  .config(['$stateProvider', '$urlRouterProvider',
  	function ($stateProvider,   $urlRouterProvider) {
      console.log('tarefaApp.config start');
   		$urlRouterProvider
  		.otherwise('/');

  		$stateProvider
  		.state("home", {
    		url: "/",
    		controller:'ListaTarefaController',
    		controllerAs:'listaTarefaController',
    		templateUrl:'templates/ListaDeTarefas.html'
      })
    	.state('new',{
    		abstract: true,
    		url: '/new/'
    	})
    	.state('newCategoria',{
    		url: '/new/categoria/',
      		controller:'CategoriaController',
      		controllerAs:'categoriaController',
    		templateUrl:'templates/CadastraCategoria.html'
    	})
    	.state('newTarefa',{
    		url: '/new/tarefa/',
      		controller:'TarefaController',
      		controllerAs:'formTarefaController',
    		templateUrl:'templates/CadastraTarefas.html'
    	})
  }]);

})();