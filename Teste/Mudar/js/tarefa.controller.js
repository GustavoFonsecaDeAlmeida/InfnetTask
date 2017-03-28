(function() {

	angular.module('tarefaApp')

	.controller('TarefaController', ['TarefaService','$state', function(service, $state) {

		console.log('TarefaController start');
		this.tarefa = {};
		this.tarefas = service.getTarefas();
		this.categorias = service.getCategorias();
		this.addTarefa = function() {

			try {
				service.addTarefa(this.tarefa.nome,this.tarefa.categoria);
			}

			catch(erro) {
				alert(erro);
			}

			finally {
				this.tarefa = {};
				$state.go('home');
			}

		};

	}]);

})();