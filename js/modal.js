angular.module('GestorDeViagens').
  directive('modal', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        title: '@',
        bindTo: '=',
        onModalHidden: '&',
        class: '@',
        style: '@'
      },
      controller: function($scope, $element) {

        $scope.bindTo = {
        		open: function() {
        			$($element).find('.modal').modal({
        				keyboard: true,
        				show:true,
        				backdrop: true
        			});
        		},
        		close: function(callback) {
        			$($element).find('.modal').modal('hide');
              if(callback){
                callback();
              }
        		},
        		onHidden: function(callback){
        			$scope.$on('modal:close', callback);
        		}
        };

        $scope.isClosed = true;

        if ($scope.onModalHidden) {
            $scope.bindTo.onHidden($scope.onModalHidden);
        }
        $($element).find('.modal').on('hidden.bs.modal', function(){
            $("html").removeClass('modal-open');
            $scope.$emit('modal:close');
            $scope.isClosed = true;
        });

        $($element).find('.modal').on('shown.bs.modal', function(){
            $("html").addClass('modal-open');
            $scope.isClosed = false;
        });

      },
      templateUrl: 'templates/modal.html',
      replace: true
    };
  }).
  directive('modalContent', function() {
    return {
      restrict: 'E',
      transclude: true,
      template:
        '<div class="modal-body"><section ng-transclude></section></div>',
      replace: true
    };
  }).
  directive('modalFooter', function() {
    return {
      restrict: 'E',
      transclude: true,
      template:
        '<div class="modal-footer" ng-transclude></div>',
      replace: true
    };
  });
