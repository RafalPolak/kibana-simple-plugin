import uiModules from 'ui/modules';

import 'ui/autoload/styles';
import './less/main.less';

import 'lodash';
import 'd3';

import './app/app.routes';
import './service/buildAggregation.service';
import './controller/statusController';
import './controller/detailController';


uiModules
  .get('app/elasticsearch_status')
