define(function (require) {
  return function percentNiceProvider(Private, Notifier) {
    var _ = require('lodash');

    var nodes = [];

    return function (vis, resp) {

      // some validations
      if (!vis.aggs.bySchemaGroup.metrics) return null;

      if (!vis.aggs.bySchemaGroup.buckets) return null;

      nodes = [];

      var pos = 0;

      var labels = null;

      try {
        labels = JSON.parse(vis.params.jsonLabels);
      } catch (e) {
        labels = '';
      }

      _.each(vis.aggs, function (d, i) {

        var type = d.__type.title;

        var value = 0;

        if (!d.__type.hasNoDsl) {
          value = resp.aggregations[d.id].buckets[d._opts.params.filters[0].input.query.query_string.query].doc_count;
        } else {
          value = resp.hits.total;
        }

        if (labels.length > pos) {

          nodes.push(
            {
              type: type,
              value: value,
              formatNumber: labels[pos].numeralFormat ? labels[pos].numeralFormat : null
            });

        } else {
          nodes.push(
            {
              type: type,
              value: value,
            });
        }

        pos++;
      });

      return nodes;
    };
  };
});
