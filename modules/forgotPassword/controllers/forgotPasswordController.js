angular.module('EDRLightbox').controller('forgotPassController', ['$scope', '$state', '$location', '$rootScope', '$document', '$timeout', '$http', 'notifications', function ($scope, $state, $location, $rootScope, $document, $timeout, $http,notifications) {

  
    
    $scope.plcemail = "Signup Email Address";
    
    $scope.isForgotActive = true;
    $scope.isThanksActive = false;


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

    $scope.btnSubmit = function (forgotForm)
    {
        console.log("email " + $scope.useremail);
        console.log("phone " + $scope.userphone);
        if (($scope.useremail != undefined && $scope.useremail != "") || ($scope.userphone != "" && $scope.userphone != undefined))
        {
            console.log("email " + $scope.useremail);
            console.log("phone " + $scope.userphone);
            $scope.isForgotActive = false;
            $scope.isThanksActive = true;
        }
        else {
            console.log("Invalid")
            setNotification(notifications, 'danger', 'Error ', ' Please Enter Email Address / Contact Phone and try again');
        }
    }

    $scope.btnCancel = function()
    {
        window.location.href = ("/");
    }

    $scope.btnDone = function()
    {
        window.location.href = ("/");
    }
}]);