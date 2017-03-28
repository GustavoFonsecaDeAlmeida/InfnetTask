(function(){
	"use strict";

angular.module('tarefaApp.services')
.factory('LoadSpinnerInterceptor', function ($q, $rootScope, $log) {
	$log.debug('LoadSpinnerInterceptor start');
    var numLoadings = 0;
    return {
        request: function (config) {
            numLoadings++;
            // Show loader
            $('body').removeClass('loaded');
            return config || $q.when(config)
        },
        response: function (response) {
            if ((--numLoadings) === 0) {
                // Hide loader
                $('body').addClass('loaded');
            }
            return response || $q.when(response);
        },
        responseError: function (response) {
            if (!(--numLoadings)) {
                // Hide loader
                $('body').addClass('loaded');
            }
            return $q.reject(response);
        }
    };
})


})();