(function() {

	angular.module('tarefaApp')

	.controller('CategoriaController', ['TarefaService','$state', function(service, $state){

		console.log('CategoriaController start');
		this.categoria = "";
		this.addCategoria = function() {

			try {
				service.addCategoria(this.categoria);
			}

			catch(erro) {
				alert(erro);
			}

			finally {
				this.categoria = '';
				$state.go('newTarefa');
			}
		};
	}]);

})();