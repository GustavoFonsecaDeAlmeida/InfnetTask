angular.module('tarefaApp')
.directive('headerTitle', function() {
	return {
		templateUrl: 'templates/header.html',
		replace: true,  	
		restrict: 'E',
		scope:{
			Tarefas: '@titulo'
		}
	};
	
})
.directive('footerTitle', function() {
	return {
		templateUrl: 'templates/footer.html',
		replace: true,  	
		restrict: 'E',
		scope:{
			Fim: '@titulo'
		}
	};
	
});

   
       

   
    

    
