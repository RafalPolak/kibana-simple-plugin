import uiModules from 'ui/modules';


uiModules
    .get('app/elasticsearch_status')
    .controller('elasticsearchDetailController', function ($routeParams, $http) {
        this.index = $routeParams.name;

        $http.get(`../api/elasticsearch_status/index/${this.index}`).then((response) => {
            this.status = response.data;
        });
    });