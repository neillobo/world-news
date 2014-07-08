Placemaker = function(){
  var config = {
    appID:'INSERT-ID-HERE'
  }
  function analyzeURL(url){/*TODO*/}
  function analyzeFeed(url){/*TODO*/}
  function analyzeText(text,index,callback,locale){
    if(config.appID==='INSERT-ID-HERE'){
     alert('Invalid Application ID, please override the configuration');
    } else {
     var query ='select * from geo.placemaker where documentContent="'+
                encodeURIComponent(text)+'" and documentType="text/plain"';
     if(locale!==''){
       query += ' and inputLanguage="'+locale+'"';
     }

     var callbackKey = 'key' + index;
     Placemaker.callbacks = Placemaker.callbacks || {};
     Placemaker.callbacks[callbackKey] = function(o) {
       retrieve(o, callback)
     }
     seed(query, callbackKey);
    }
  }
  function seed(query, callbackKey){
    query += ' and appid="'+config.appID+'"';
    var url = 'http://query.yahooapis.com/v1/public/yql?q='+
              encodeURIComponent(query)+'&format=json'+
              '&env=http%3A%2F%2Fdatatables.org%2Falltables.env&'+
              'callback=Placemaker.callbacks.' + callbackKey;
    var s = document.createElement('script');
    s.setAttribute('src',url);
    document.getElementsByTagName('head')[0].appendChild(s);
  }
  function retrieve(o, callback){
    var data = o.query.results.matches || {'error':'no locations found'};
    callback(data);
  }
  return{
    config:config,
    getPlaces:analyzeText,
    retrieve:retrieve
  }
}();
