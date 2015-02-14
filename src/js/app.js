require('bootstrap/dist/css/bootstrap.css');
require('angular');
require('angular-resource');

var nodes = angular.module('dataset', []);

nodes.controller('DatasetController', ['$http', function($http) {
  var self = this;

  var cdbAPI = 'http://vertnet.cartodb.com/api/v2/sql?q=SELECT%20gbifdatasetid,title,lastindexed,url,count,ipt%20FROM%20resource';
  var gbifAPI ='http://api.gbif.org/v1/occurrence/count?datasetKey=';

  self.datasets = [];

  // Call the VN CartoDB API to get the list of VN datasets.
  var getDatasets = function() {

    $http.get(cdbAPI).success(function (data) {
      self.datasets = data.rows;



      // load each GBIF count
      angular.forEach(self.datasets, function(dataset) {
        console.log(dataset);
        $http.get(gbifAPI + dataset.gbifdatasetid).success(function (data) {
          dataset.gbifCount = data;
        });
      });
    });
  }

  // call the function to populate the node list
  getDatasets();
}]);
