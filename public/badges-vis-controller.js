'use strict';

//import uiModules from 'ui/modules';
import {uiModules} from 'ui/modules';
import {AggResponseTabifyProvider} from 'ui/agg_response/tabify/tabify';

// get the kibana/badges-vis module, and make sure that it requires the "kibana" module if it didn't already
const module = uiModules.get('kibana/badges-vis', ['kibana']);

const numeral = require('numeral');

module.controller('BadgesVisController', function ($scope, $element, Private) {

  var percentNiceAggResponse = Private(require('./lib/agg_response'));

  var computeValue = function (results) {

    if (!results || results.length !== 2) {
      return;
    }

    var val1 = results[0].value;
    var val2 = results[1].value;

    if (val1 === 0) {
      return;
    }

    var value;
    if ($scope.vis.params.division) {
      value = val2 / val1;
    } else {
      if($scope.vis.params.numerator) {
        value = val1;
      } else {
        value = val2;
      }
    }

    var valueFormatted = results[0].formatNumber ? numeral(value).format(results[0].formatNumber) : value;
    $scope.vis.params.value = valueFormatted;
  };

  $scope.$watch('esResponse', function (resp) {
    if (resp) {
      var chartData = percentNiceAggResponse($scope.vis, resp);
      computeValue(chartData);
    }
  });
});

