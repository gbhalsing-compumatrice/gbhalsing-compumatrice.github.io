angular.module('EDRLightbox', ['ui.router.state', 'reCAPTCHA']);

angular.module('EDRLightbox').config([
  '$stateProvider', '$urlRouterProvider', '$httpProvider', 'reCAPTCHAProvider',
  function ($stateProvider, $urlRouterProvider, $httpProvider, reCAPTCHAProvider) {

      //required, please use your own key :)
      reCAPTCHAProvider.setPublicKey('6LctNwcTAAAAAFtLdcLi22iQFqRBtlFuNROul9NU');

      // optional
      reCAPTCHAProvider.setOptions({
          theme: 'clean'
      });

      $urlRouterProvider.otherwise('/');
      $stateProvider.state('/', {

          'url': '/',
          'controller': 'signInController',
          'templateUrl': 'modules/signin/views/signIn.html',

      })
      .state('signUp', {

          'url': '/signUp',
          'controller': 'signUpController',
          'templateUrl': 'modules/signup/views/SignUp.html',

      }).state('forgotPassword', {

          'url': '/forgotPassword',
          'controller': 'forgotPassController',
          'templateUrl': 'modules/forgotPassword/views/forgotPassword.html',

      })
      .state('Dashbaord', {

          'url': '/Dashboard',
          'controller': 'dashboardController',
          'templateUrl': 'modules/dashboard/views/dashboard.html',

      })

      
  }
]);
angular.module('EDRLightbox').directive('emailCtrl', function (shareDataService) {
    return {
        restrict: 'AE',
        replace: true,
        
        templateUrl: 'components/emailControl.html',
        link: function ($scope, elem, attrs) {

            elem.on('blur', function () {
                shareDataService.storeSharedData($scope.useremail);
                console.log("store value " + $scope.useremail)
            });
        }
    };
});

angular.module('EDRLightbox').directive('retypeEmailCtrl', function (shareDataService) {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: 'components/reemailControl.html',
        link: function (scope, elem, attrs) {

        }
    };
});

angular.module('EDRLightbox').directive('zipCtrl', function () {
    return {
        restrict: 'E',
       
        scope: {
            ngModel: '='

        },
        templateUrl: 'components/zipControl.html'
    };
});

angular.module('EDRLightbox').directive('phoneCtrl', function () {
    return {
        restrict: 'E',
        
        scope: {
            ngModel: '='

        },
        templateUrl: 'components/phoneControl.html'
    };
});

angular.module('EDRLightbox').directive('passwordCtrl', function (shareDataService) {
    return {
        restrict: 'AE',
        replace: true,
        
       templateUrl: 'components/passwordControl.html',
        link: function ($scope, elem, attrs) {

            elem.on('blur', function () {
                shareDataService.storeSharedData($scope.password);
                console.log("value " + $scope.password);
            });
        }
    };
});

angular.module('EDRLightbox').directive('retypePasswordCtrl', function (shareDataService) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'components/repasswordControl.html',
        link: function (scope, elem, attrs) {

        }
    };
});

angular.module('EDRLightbox').directive('stateCtrl', ['$http', '$rootScope', function ($http, $rootScope) {
    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
        },
        templateUrl: 'components/stateControl.html',
        link: function ($scope) {
            $http.get('/json/states.js').success(function (data) {
                $scope.States = data;
                console.log("sss " + data);
            });
        }
    };
}]);

angular.module('EDRLightbox').directive('industryCtrl', ['$http', '$rootScope', function ($http, $rootScope) {
    return {
        restrict: 'E',
        scope: {
            ngModel: '='
        },
        templateUrl: 'components/industry_ddControl.html',
        link: function ($scope) {
            $http.get('/json/industry.js').success(function (data) {
                $scope.Industry = data;
                console.log("sss " + data);
            });
        }
    };
}]);

angular.module('EDRLightbox').directive('panelCtrl', ['$http', '$rootScope', function ($http, $rootScope) {
    return {
        restrict: 'E',
        scope: {
            title: '@',
            descriptionF: '@',
            descriptionS: '@',
            descriptionT: '@'

        },
        templateUrl: 'components/panelControl.html',
        link: function ($scope) {
            $http.get('/json/panelData.js').success(function (data) {
                console.log("sss " +JSON.stringify (data));
                $scope.title =data.panel.Title;
                $scope.descriptionF = data.panel.DescriptionF;
                $scope.descriptionS = data.panel.DescriptionS;
                $scope.descriptionT = data.panel.DescriptionT;
            });
        }
    };
}]);

angular.module('EDRLightbox').directive('rcSubmit', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        require: ['rcSubmit', '?form'],
        controller: ['$scope', function ($scope) {
            this.attempted = false;

            var formController = null;

            this.setAttempted = function () {
                this.attempted = true;
            };

            this.setFormController = function (controller) {
                formController = controller;
            };

            this.needsAttention = function (fieldModelController) {
                if (!formController) return false;

                if (fieldModelController) {
                    return fieldModelController.$invalid && (fieldModelController.$dirty || this.attempted);
                } else {
                    return formController && formController.$invalid && (formController.$dirty || this.attempted);
                }
            };
        }],
        compile: function (cElement, cAttributes, transclude) {
            return {
                pre: function (scope, formElement, attributes, controllers) {

                    var submitController = controllers[0];
                    var formController = (controllers.length > 1) ? controllers[1] : null;

                    submitController.setFormController(formController);

                    scope.rc = scope.rc || {};
                    scope.rc[attributes.name] = submitController;
                },
                post: function (scope, formElement, attributes, controllers) {

                    var submitController = controllers[0];
                    var formController = (controllers.length > 1) ? controllers[1] : null;
                    var fn = $parse(attributes.rcSubmit);

                    formElement.bind('submit', function (event) {
                        submitController.setAttempted();
                        if (!scope.$$phase) scope.$apply();

                        if (!formController.$valid) return false;

                        scope.$apply(function () {
                            fn(scope, { $event: event });
                        });
                    });
                }
            };
        }
    };
}]);

angular.module('EDRLightbox').service('notifications', ['$rootScope', function ($rootScope) {
    var queue = [];
    return {
        queue: queue,
        add: function (item) {
            var index = -1;
            for (var i = 0; i < this.queue.length; i++) {
                if (queue[i].body == item.body) {
                    index = i;
                    break;
                }
            }
            if (index != -1)
                return;
            queue.push(item);
            setTimeout(function () {
                $('.alerts .alert').eq(0).remove();
                queue.shift();
            }, 3000);
        },
        pop: function (item) {
            var index = -1;
            for (var i = 0; i < this.queue.length; i++) {
                if (queue[i].body == item) {
                    index = i;
                    break;
                }
            }
            if (index != -1)
                queue.splice(index, 1);
            return this.queue;
        }
    };
}]);

angular.module('EDRLightbox').directive('validPassword', function (shareDataService) {
    return {
        require: 'ngModel',
        transclude: true,
        scope: {

            reference: '=validPassword'

        },
        link: function (scope, elm, attrs, ctrl) {
            
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var pass = shareDataService.getStoredData();
               
                scope.reference = pass.data;
                console.log('here' + pass);
                
                console.log("retrived password 111" + scope.reference);

                var noMatch = viewValue != scope.reference
                ctrl.$setValidity('noMatch', !noMatch)
            });

            scope.$watch("reference", function (value) {
                console.log("value hgg " + value);
                ctrl.$setValidity('noMatch', value === ctrl.$viewValue);

            });
        }
    }
});

angular.module('EDRLightbox').factory('shareDataService',[function () {
    var sharedData = {};

    var storedData = {};

    sharedData.storeSharedData = function (data) {

        storedData.data = data;
    };

    sharedData.getStoredData = function () {

        return storedData;
    };


    return sharedData;

}]);



