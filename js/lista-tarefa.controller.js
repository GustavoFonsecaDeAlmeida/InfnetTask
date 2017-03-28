(function(){
	"use strict";

	angular.module('tarefaApp')

	.controller('ListaTarefaController', ['TarefaService', '$scope', function(service, $scope) {
		$scope.app = 'Tarefas';
		$scope.$parent.$log.debug('ListaTarefaController start');	
		var ctrl = this;
		this.tarefas = service.getTarefas();		
		this.remaining = service.remaining;
		this.archive = service.archive;
		this.updateTarefaStatus = function(tarefa){
			service.updateTarefaStatus(tarefa.id, tarefa.status);
		};

		$scope.$on('archive', function(event, tarefas){
			ctrl.tarefas = tarefas;
		});

	}]);

})();