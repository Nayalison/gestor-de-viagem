angular.module("GestorDeViagens", ['ngResource', 'ngRoute'])

  .config(['$httpProvider', function($httpProvider) {
          $httpProvider.defaults.useXDomain = true;
          $httpProvider.defaults.headers.common = 'Content-Type: application/json';
          delete $httpProvider.defaults.headers.common['X-Requested-With'];
      }
  ])

  .factory('Pais',['$resource', function($resource) {
    return $resource('http://services.groupkt.com/',
      {
      },
      {
        all: {
          method:'GET',
          url: 'http://services.groupkt.com/country/get/all'
        }
      }
    );
  }])

  .factory('Weather',['$resource', function($resource) {
    return $resource('http://api.openweathermap.org',
      {
        APPID: '11e753b575c1e12044717812948e2d01'
      },
      {
        getWeatherByCity: {
          method:'GET',
          url: 'http://api.openweathermap.org/data/2.5/weather?q=:q&&APPID=:APPID&&units=metric',
          params: {
            q: '@q',
            APPID: '11e753b575c1e12044717812948e2d01'
          }
        }
      }
    );
  }])

  .directive('selectPais', ['$http','Pais',function($http, Pais) {
    return {
      restrict: 'E',
      transclude: true,
      link: function(scope, element, attrs) {
        Pais.all().$promise.then(function(data){
          scope.$_paises = data.RestResponse.result;
        });
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

  .controller('DestinoController', ['ViagemService', 'Weather', '$routeParams', '$scope', function(ViagemService, Weather, $routeParams, $scope) {

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

      intinerario.tempo = Weather.getWeatherByCity({q: intinerario.cidade+','+intinerario.pais.alpha2_code}, function(data) {
        console.log(data);
      });

      $scope.dados.intinerario = {};
    };

    $scope.editar = function(intinerario) {
      intinerario.isEdicao = true;
      $scope.dados.intinerario = intinerario;
    };

    $scope.deletar = function(intinerario) {
      Array.remove($scope.destinos, intinerario);
    };

    $scope.showTempo = function(intinerario) {
      $scope.tempo = intinerario.tempo;
      $scope.modalTempo.open();
    };

    $scope.fecharModalTempo = function() {
      $scope.tempo = {};
      $scope.modalTempo.close();
    };
  }])

  .controller('GastosController', function(ViagemService, $routeParams, $scope) {

  });
