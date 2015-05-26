angular.module('EDRLightbox', ['ngResource'])
.factory('stateCtrlService', function ($resource) {
    return $resource('JSON/states.json');
});