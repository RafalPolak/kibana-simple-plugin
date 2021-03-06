export default function (server) {

  // We can use this method, since we have set the require in the index.js to
  // elasticsearch. So we can access the elasticsearch plugins safely here.
  const { callWithRequest } = server.plugins.elasticsearch.getCluster('data');

  // Register a GET API at /api/elasticsearch_status/indices that returns
  // an array of all indices in the elasticsearch. The server is actually an
  // HAPI server and the complete documentation of the "route" method can be
  // found in the official documentation: http://hapijs.com/api#serverrouteoptions
  server.route({
    path: '/api/elasticsearch_status/indices',
    method: 'GET',
    // The handler method will be called with the request that was made to this
    // API and a reply method as 2nd parameter, that must be called with the
    // content, that should be returned to the client.
    handler(req, reply) {

      // The callWithRequest method that we just got from elasticsearch has the following
      // syntax: the first parameter should be the request that actually came
      // from the client. The callWithRequest method will take care about
      // passing authentication data from kibana to elasticsearch or return
      // authorization requests, etc.
      // Second parameter to the function is the name of the javascript method
      // you would like to callWithRequest, as you can find it here in the documentation:
      // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/
      // The third parameter will be passed as a parameter to the javascript method
      // (it should contain the data you would have also passed to the client directly).
      // The method returns a promise, which will be resolved with the data returned
      // from Elasticsearch.
      callWithRequest(req, 'cluster.state').then(function (response) {
        // Return just the names of all indices to the client.
        reply(
          Object.keys(response.metadata.indices)
        );
      });
    }
  });

  // Add a route to retrieve the status of an index by its name
  server.route({
    // We can use path variables in here, that can be accessed on the request
    // object in the handler.
    path: '/api/elasticsearch_status/index/{name}',
    method: 'GET',
    handler(req, reply) {
      callWithRequest(req, 'cluster.state', {
        metric: 'metadata',
        index: req.params.name
      }).then(function (response) {
        reply(response.metadata.indices[req.params.name]);
      });
    }
  });

  server.route({
    path: '/api/elasticsearch/library/{ids}',
    method: 'GET',
    handler(req, reply){

      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:',req.params.ids);

      var par1 = ["b9280ee9-cfac-4847-affa-e5e8c5b28a7a","c2156289-bd10-4b1d-8eff-e34a1a586b2a"];
      var unpacked = JSON.parse(req.params.ids); 
      console.log('unpcaked');

      callWithRequest(req, 'search', {
        index: 'library',
        body: {
          _source: "title",
          query: {
            bool: {
              filter: {terms: {
                "id.keyword": unpacked
              }}}
          }
        }
      }).then(function(response){
        reply(response);
      });
    }
  });

};