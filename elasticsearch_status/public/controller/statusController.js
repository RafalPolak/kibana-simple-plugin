import uiModules from 'ui/modules';

require('lodash');

uiModules
    .get('app/elasticsearch_status')
    .controller('elasticsearchStatusController', function ($http, BuildAggregation) {

        var preparedQuery = BuildAggregation.prepareQuery;
        var createdQuery = BuildAggregation.createQuery;

        preparedQuery('title','volume');
        createdQuery();

        $http.get('../api/elasticsearch_status/indices').then((response) => {
            this.indices = response.data;
        });

        var par1 = ["b9280ee9-cfac-4847-affa-e5e8c5b28a7a","c2156289-bd10-4b1d-8eff-e34a1a586b2a"];
        var par2 = 'b9280ee9-cfac-4847-affa-e5e8c5b28a7a';

        var compact = JSON.stringify(par1);

        $http.get('../api/elasticsearch/library/'+compact).then((response) =>{
            console.log('test: ',response);
        })


        console.log('siedze w indexie i testuje lodasha');

        var test = _.chunk(['a', 'b', 'c', 'd'], 2);

        console.log('i jak ???',test);

        var test2 = _.intersection([2, 1], [2, 3]);

        console.log('moja tablica [2,1], [2,3] ich czesc wspolna:', test2);

        console.log('a teraz będzie test d3.js"a');

        //aby miec d3 musimy go wziąć
        var d3 = require('d3');

        var data = [4, 8, 15, 16, 23, 42];

        var x = d3.scale.linear()
            .domain([0, d3.max(data)])
            .range([0, 420]);

        d3.select(".chart")
            .selectAll("div")
            .data(data)
            .enter().append("div")
            .style("width", function(d) { return x(d) + "px"; })
            .text(function(d) { return d; });

    })
