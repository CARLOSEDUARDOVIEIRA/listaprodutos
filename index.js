

angular.module('MyApp', [])
    .controller("produtosController", ['$scope', 'myService', function ($scope, myService) {
        var vm = this;        

        function getProdutos(myService) {
            myService.getProdutos(myService.getToken()).then(function (data) {
                vm.produtos = data;
            }).catch(function () {
                $scope.error = 'unable to get posts';
            });
        }

        getProdutos(myService);
    
        $scope.filterFunction = function (element) {
            return element.name.match(/^Ma/) ? true : false;
        }
    }])
    .service('myService', ['$http', '$window', function ($http, $window) {
        var minhaToken;

        function setToken() {
            var email = new FormData();
            email.append("email", 'dullvieira@gmail.com');
            $http({
                method: 'POST',
                url: 'http://testedev.baixou.com.br/processo/auth',
                data: email,
                headers: { 'Content-Type': undefined }
            }).then(function (r) {
                if (r.data.token) {
                    minhaToken = $window.localStorage.setItem('token', r.data.token);
                }
            }, function (r) {
                console.log(r);
            });
        };

        function getProdutos(token) {
            return $http.get('http://testedev.baixou.com.br/processo/lista?token=' + token)
                .then(function (r) {
                    return r.data.ofertas;
                }, function (r) {
                    console.log(r);
                });            
        };

        function getToken() {
            return $window.localStorage.getItem('token');
        };

        return {
            setToken: setToken(),
            getToken: getToken,
            getProdutos: getProdutos
        };
    }]);