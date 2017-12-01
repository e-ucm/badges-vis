import 'plugins/badges-vis/badges-vis.less';
import 'plugins/badges-vis/badges-vis-controller';
import {VisSchemasProvider} from 'ui/vis/schemas';
import badgesVisTemplate from 'plugins/badges-vis/badges-vis.html';
import badgesVisParamsTemplate from 'plugins/badges-vis/badges-vis-params.html';
import {VisVisTypeProvider} from 'ui/vis/vis_type';
import {TemplateVisTypeProvider} from 'ui/template_vis_type/template_vis_type';
import {VisTypesRegistryProvider} from 'ui/registry/vis_types';
// register the provider with the visTypes registry
VisTypesRegistryProvider.register(badgesVisProvider);

function badgesVisProvider(Private) {
  const TemplateVisType = Private(TemplateVisTypeProvider);
  const Schemas = Private(VisSchemasProvider);
  const VisType = Private(VisVisTypeProvider);

  return new TemplateVisType({
    name: 'badges-vis',
    title: 'Badges and achievements widget',
    icon: 'fa-table',
    description: 'This is Kibana 5 plugin which uses the JavaScript to display badges and achievements.',
    category: VisType.CATEGORY.OTHER,
    template: badgesVisTemplate,
    params: {
      defaults: {
        imageUrl: 'https://github.com/e-ucm/badges-vis/raw/master/images/badges/trophy_acchievement.png',
        text: 'Badge text',
        value: '0',
        division: true,
        numeralFormat: '[{ "numeralFormat" : "%00,0" }]',
        useNumerator: false
      },
      editor: badgesVisParamsTemplate
    },
    schemas: new Schemas([
      {
        group: 'metrics',
        name: 'metric',
        title: 'Count of',
        min: 1,
        max: 5,
        defaults: [{type: 'count', schema: 'metric'}]
      },
      {
        group: 'buckets',
        name: 'buckets',
        title: 'Divided by',
        min: 1,
        max: 1,
        aggFilter: ['!geohash_grid']
      }
    ])
  });
}
