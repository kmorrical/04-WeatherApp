(function() {
    'use strict';

    angular
        .module('app')
        .controller('WeatherCtrl', WeatherCtrl);

    WeatherCtrl.$inject = ['$http'];



    function WeatherCtrl($http) {
        var vm = this;

        vm.callWeatherApi = callWeatherApi;
        vm.searches = [];

        /*vm.isHireableOrNot = function() {
         if(vm.user.hireable == null) {
           vm.user.hireable = 'Not looking for work';
           vm.hireableColor= 'text-danger';
         }
         else {
           vm.user.hireable = 'Looking for work!';
           vm.hireableColor= 'text-success';
         }
        }*/



        vm.tempInF = function() {

            vm.user.main.temp = ((vm.user.main.temp - 273.15) * 9 / 5) + 32;
            vm.user.main.temp_max = ((vm.user.main.temp_max - 273.15) * 9 / 5) + 32;
            vm.user.main.temp_min = ((vm.user.main.temp_min - 273.15) * 9 / 5) + 32;



        }


        vm.addToSearchHistory = function() {
            vm.searches.push({
                city: vm.user.name,
                date: vm.date,
                time: vm.time
            });
        }

        vm.convertTimeFormat = function() {
            vm.date = new Date(new Date().getTime()).toLocaleDateString();
            vm.time = new Date(new Date().getTime()).toLocaleTimeString();
        }


        //vm.cityList = function(){



        function callWeatherApi(city) {

            $http

                .get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=8feccd62da10f01f7b2bd5581ccf6aba')
                .then(function(response) {
                    vm.user = response.data;
                    vm.tempInF();
                    vm.convertTimeFormat();
                    vm.addToSearchHistory();
                    console.log(vm.tempInF);
                    console.log(vm.user);

                })

            .catch(function(error) {
                alert('An error occured downloading INFO from Make It Rain!');
            });
        }
    }

})();
