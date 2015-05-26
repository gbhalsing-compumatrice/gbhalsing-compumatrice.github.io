angular.module('EDRLightbox').controller('signUpController', ['$scope', '$state', 'reCAPTCHA','$http', function ($scope, $state, reCAPTCHA,$http) {

   
    /* Component Placeholders */
    $scope.obj = {};
    //$scope.pwdPattern = "/(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/";

    /* Component ng-models */

    $scope.zipcode = "";
    $scope.useremail = "";
    $scope.reusereemail = "";
    $scope.zipcode = "";
   
    $scope.isSignupActive = true;
    $scope.isThanksActive = false;
    $scope.isActive = false;
    // or you can also set key here
    reCAPTCHA.setPublicKey('6LctNwcTAAAAAFtLdcLi22iQFqRBtlFuNROul9NU');
   
   $scope.btnSignup = function (form) {

       
       if (form.$invalid) {

           $scope.submitted = true;

       } else {
           
           $http({
               url: 'https://www.google.com/recaptcha/api/verify',
               method: 'POST',
               params: { privatekey: "6LctNwcTAAAAAPFxnkxUaeppbDUImy0FNNY3Mx2c", challenge: $scope.captcha.challenge, remoteip: "127.0.0.0", response: $scope.captcha.response },
               headers: {
                   'Access-Control-Allow-Origin': 'http://localhost:3571/',
                   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                   'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
                   'X-Random-Shit': '123123123'
               },

           }).success(function (data) {

               var verify = data.match(/true/g);

               if (verify) {
                   console.log("xxxxxx" + verify);
                   $scope.isActive = false;
                   $scope.RegisteredData = {
                       companyname: $scope.companyname,
                       Industry: $scope.industryValue.name,
                       FirstName: $scope.firstname,
                       LastName: $scope.lastname,
                       Address: $scope.address,
                       Suite: $scope.suit,
                       ZipCode: $scope.zipcode,
                       City: $scope.city,
                       State: $scope.stateValue.name,
                       Email: $scope.useremail,
                       ReEmail: $scope.reusereemail,
                       Password: $scope.userpassword,
                       RePassword: $scope.userrepassword

                   };

                   localStorage.setItem('signUpdetails', JSON.stringify($scope.RegisteredData));
                   $scope.isSignupActive = false;
                   $scope.isThanksActive = true;

               } else {
                   console.log('Failed validation');
                   $scope.isActive = true;

               }

           });

       }

   }
    
    $scope.btnCancel = function () {

        window.location.href = ("/");
    };

    $scope.btnDone =function()
    {
        //$scope.isSignupActive = false;
       // $scope.isThanksActive = false;
        localStorage.setItem('signUpdetails', JSON.stringify($scope.RegisteredData = {}));
        window.location.href = ("/");
    }


}]);