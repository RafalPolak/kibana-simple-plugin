import uiRoutes from 'ui/routes';


import overviewTemplate from './templates/index.html';
import detailTemplate from './templates/detail.html';

import infoTemplate from './templates/info.html';
import warningTemplate from './templates/warning.html';

/*
To avoid situation when we have blank page after second click on menu panel
you need to add routing when '' and otherwise, because after second click kibana splice url with char /
and then ui router not working anymore
*/

uiRoutes.enable();
uiRoutes
    .when('/', {
        template: overviewTemplate,
        controller: 'elasticsearchStatusController',
        controllerAs: 'ctrl'
    })
    .when('/test/info', {
        template: infoTemplate
    })
    .when('/test/warning', {
        template: warningTemplate
    })
    .when('/index/:name', {
        template: detailTemplate,
        controller: 'elasticsearchDetailController',
        controllerAs: 'ctrl'
    })
    .when('', {
        template: overviewTemplate,
        controller: 'elasticsearchStatusController',
        controllerAs: 'ctrl'
    })
    .otherwise({redirectTo:'/'});

