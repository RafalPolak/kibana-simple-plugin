import uiModules from 'ui/modules';

uiModules
  .get('app/elasticsearch_status')
  .factory('BuildAggregation', function () {

    return {
      prepareQuery: prepareQuery,
      createQuery : createQuery
    }

    function Terms(fieldName){
          this.terms = {
            field : fieldName
      }
    }

    function Aggs(){};

    function Wrapper(){};

    /* example of query

    "aggs" : {
        "aggs_books" : {
          "terms": {
            "field": "title.keyword"
          },
            "aggs" : {
              "aggs_number": {
                "terms": {
                  "field": "volume"
                }
              }
            }
        }
    }


{
  "aggs": {
    "aggs_title": {
      "terms": {
        "field": "title"
      },
      "aggs": {
        "aggs_volume": {
          "terms": {
            "field": "volume"
          }
        }
      }
    }
  }
}


     */


    function prepareQuery(title, volume){
        var termOne = new Terms(title);
        var termTwo = new Terms(volume);

        console.log('termOne: ',termOne);
        console.log('termTwo: ',termTwo);

        var aggOne = new Aggs();
        var aggTwo = new Aggs();

        aggOne['aggs_'+title] = termOne;
        aggTwo['aggs_'+volume] = termTwo;

        console.log('aggOne: ',aggOne);
        console.log('aggTwo: ',aggTwo);

        console.log('combination: ');
        aggOne['aggs_'+title]["aggs"] = aggTwo;

        var wrapper = new Wrapper();

        wrapper['aggs'] = aggOne;

        console.log('after magic: ',aggOne);
        console.log('wtih wrapper: ',wrapper);

    }

    function createQuery(){
        console.log('test2');
    }


  });


