angular.module('EDRLightbox').controller('signInController', ['$scope', '$state', '$location', '$rootScope', '$document', '$timeout', '$http', 'notifications', function ($scope, $state, $location, $rootScope, $document, $timeout, $http, notifications) {

  
    $scope.signInData = {};

    $scope.notify = notifications;
    $scope.closeAlert = function (item) {
        notifications.pop(item);
    }
    function setNotification(notifications, type, title, body) {
        notifications.add({
            type: type,
            title: title,
            body: body
        });
    }
   

    /* Place holder & model Components*/
    //$scope.email = "Account / Email Address";
    
    
   
    /* Method */
     $scope.btnRegiter = function () {
        console.log("Register Clicked!");
        window.location.href = ("#/signUp");
    };

     $scope.btnLogin = function (loginForm) {
         $scope.$broadcast('show-errors-check-validity');
         $scope.submitted = true;
         if ($scope.loginForm.$valid) {

             // Verifying credentials from  json 
             $http.get('scripts/json/Login_Sample.js').success(function (data) {
                 console.log("retrun data " + JSON.stringify(data))
                 console.log("Useremail " + $scope.useremail);
                 console.log("password " + $scope.password);
                 if ((data.user.username == $scope.useremail) && (data.user.password == $scope.password))
                 {
                     
                     console.log("Useremail " + $scope.useremail);
                     console.log("password " + $scope.password);
                     console.log("Category " + $scope.category);
                     console.log("Remember " + $scope.remember);
                     window.location.href = ("#/Dashboard");
                     //setNotification(notifications, 'success', 'Success Header', 'Success Body');
                 }else
                 {
                     console.log("User is invalid");
                     setNotification(notifications, 'danger', 'Account Missing', ' Please type valid an Account Number / User Name and try again');
                 }

             });

             
         }
         else {
             console.log("Invalid form");

             return;
         }
       
     }

     $scope.btnForgotpass = function () {

         window.location.href = ("#/forgotPassword");
     }
     
}]);