angular.module("GestorDeViagens", ['ngRoute'])

  .directive('selectPais', ['$http',function($http) {
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
  }])


  .directive('chosen',function($timeout){
      var NG_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/;

      var linker = function(scope,element,attrs) {

          var trigger = function(e) {
            // Notify of change!
            element.trigger('liszt:updated');
            element.trigger("chosen:updated");
            //console.warn("change!", e);
          };
          $(element)[0].addEventListener("DOMSubtreeModified", trigger, false);
          $(element)[0].addEventListener("DOMAttrModified", trigger, false);

          if (attrs.ngModel) {
            scope.$watch(attrs.ngModel,trigger);
          }

          if (attrs.ngDisabled) {
            scope.$watch(attrs.ngDisabled, trigger);
          }

          element.chosen({
            inherit_select_classes:true,
            disable_search_threshold: 6,
            width: '100%'
          });
      };

      return {
          restrict:'AC',
          link: linker
      };
  })


  .factory('ViagemService',function() {
    return {
      intinerarios:[],
      gastos:[]
    };
  })

  .controller('HomeController', function($scope) {

  })

  .controller('DestinoController', function(ViagemService, $routeParams, $scope) {

    $scope.destinos = ViagemService.intinerarios;
    $scope.dados = {
      intinerario: {}
    };

    $scope.adicionarIntinerario = function(intinerario) {
      if(intinerario.isEdicao) {
        intinerario.isEdicao = false;
      } else {
        ViagemService.intinerarios.push(intinerario);
      }
      $scope.dados.intinerario = {};
    };

    $scope.editar = function(intinerario) {
      intinerario.isEdicao = true;
      $scope.dados.intinerario = intinerario;
    };

    $scope.deletar = function(intinerario) {
      Array.remove($scope.destinos, intinerario);
    };
  })

  .controller('GastosController', function(ViagemService, $routeParams, $scope) {

  });
