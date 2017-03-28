(function() {
	"use strict";

	angular.module('tarefaApp.services').service('TarefaService', ['$rootScope','$http','utils', TarefaServiceConstructor]);

	function TarefaServiceConstructor($rootScope,$http,utils) {
		$rootScope.$log.debug('TarefaServiceConstructor start');
		$http.get("tarefas").then(function(response){
			console.log(response.data);
		}, function(reason){

		});
		var sv = carregarRecursos($http);

		var saveTarefa = function(updateUltimaTarefa){
			if(sv.useLocalStorage){
				localStorage.tarefas = JSON.stringify(sv.tarefas);
				if(updateUltimaTarefa){
					localStorage.ultimaTarefaInserida = sv.ultimaTarefa;
				}
			}
		};
		var remaining = function() {
			var count = 0;
			angular.forEach(sv.tarefas, function(tarefa) {
				count += tarefa.status ? 0 : 1;
			});
			return count;
		};
		var archive = function() {
			var temp = [];
			for(var i=0; i < sv.tarefas.length; i++) {
				if (!sv.tarefas[i].status) 
					temp.push(sv.tarefas[i]);
			}
			sv.tarefas = temp;
			saveTarefa(false);
			$rootScope.$broadcast("archive",sv.tarefas);
		};
		var updateTarefaStatus = function(tarefaId, status){

			var tarefa = utils.findById(sv.tarefas,tarefaId);
			console.log(tarefa === sv.tarefas[2]);
			tarefa.status = status;
			saveTarefa(false);
		};
		
		return {
			getCategorias: function(){
				return angular.copy(sv.categorias);
			},
			getTarefas: function(){
				return angular.copy(sv.tarefas);
			},
			addTarefa: function(tarefaNome, categoria) {
				if (categoria === "")
					throw 'Categoria não selecionada';
				for(var i=0; i < sv.tarefas.length; i++){
					var tarefa = sv.tarefas[i];
					if ( categoria === tarefa.categoria && tarefaNome === tarefa.nome)
						throw "Tarefa Repetida";
				}
				sv.tarefas.push({id:++sv.ultimaTarefa, nome:tarefaNome, status:false, categoria:categoria});
				saveTarefa(true);
			},
			addCategoria: function(categoria) {
				for(var i=0; i < sv.categorias.length; i++){
					var cat = sv.categorias[i];
					if (categoria === cat)
						throw 'Categoria já existe';
				}
				sv.categorias.push(categoria);
				if(sv.useLocalStorage)
					localStorage.categorias = JSON.stringify(sv.categorias);
			},
			removeTarefa: function(tarefaNome){
				angular.forEach(sv.tarefas, function(tarefa, index){
					if (tarefa.nome === tarefaNome){ 
						sv.tarefas.splice(index,1);
					}
				});
			},
			saveTarefa: saveTarefa,
			remaining: remaining,
			archive: archive,
			updateTarefaStatus: updateTarefaStatus
			
		};
	}

	function carregarRecursos() {

		var recursos = {};
		recursos.useLocalStorage = true;
		if ( typeof(Storage) === undefined )
			recursos.useLocalStorage = false;
		if(recursos.useLocalStorage && localStorage.tarefas && localStorage.categorias && localStorage.ultimaTarefaInserida) {
			recursos.tarefas = JSON.parse(localStorage.tarefas);
			recursos.categorias = JSON.parse(localStorage.categorias);
			recursos.ultimaTarefa = JSON.parse(localStorage.ultimaTarefaInserida);
		} else {
			recursos.tarefas = [];
			recursos.tarefas.push({id:1, nome:'Entregar Trabalho Finas', status:true, categoria:'Faculdade'});
			recursos.tarefas.push({id:2, nome:'Passar de semestre', status:false, categoria:'Faculdade'});
			recursos.categorias = [];
			recursos.categorias.push('Casa');
			recursos.categorias.push('Trabalho');
			recursos.ultimaTarefa = 2;
			localStorage.tarefas = JSON.stringify(recursos.tarefas);
			localStorage.categorias = JSON.stringify(recursos.categorias);
			localStorage.ultimaTarefaInserida = recursos.ultimaTarefa;
		}
		return recursos;
	}
})();