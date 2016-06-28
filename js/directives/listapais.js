angular.module('GestorDeViagens').directive('selectPais', ['$http',function($http) {
  return {
    restrict: 'E',
    transclude: true,
    link: function(scope, element, attrs) {
      $http({method: 'GET', url: 'http://services.groupkt.com/country/get/all' })
        .success(function (data) {
           scope.$_paises = data.RestResponse.result;
         }
      );
      scope.$_paises_label = attrs.noSelectionLabel || "Selecione um pais";
    },
    template:'<select ng-options="pais as pais.name for pais in $_paises track by pais.name">'+
        '<option value="">{{$_paises_label}}</option></select>',
    replace: true
  };
}]);