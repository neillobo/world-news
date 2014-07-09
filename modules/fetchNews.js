Placemaker.config.appID = "0jB5lijV34F9pmGIxH1KxwYifXQa4wtlcNo2KtaCbtoQr9qSlwga.6PYas0_wehS"
    
  google.load("feeds", "1");
  var database = [];

  function initialize() {
      //fetch feed
    var feed = new google.feeds.Feed("http://feeds.bbci.co.uk/news/world/rss.xml");
    feed.setNumEntries(5);

  feed.load(function(result) {
    if (!result.error) {

     var container = document.getElementById("feed");
     for (var i = 0; i < result.feed.entries.length; i++) {
          var entry = {};
          entry.title = result.feed.entries[i].title;
          
          var link = result.feed.entries[i].content;

          var el = $( '<div></div>' );
          el.html(link);
          
          var arr = $('a', el);
          entry.link = $(arr[1]).attr('href');
          database.push(entry);    
      }
    }
    //Get Images
    //My Credentials 
    //key & CX =  key=AIzaSyArrWI0iXEEFNfiR-ovma8ujydkIzStf0E&cx=006643242552187081319:3vebwxnxckw 
    // for(var i=0;i<database.length;i++){
      
    //   (function(ind){
    //     url = 'https://www.googleapis.com/customsearch/v1?&key=AIzaSyA-URPZ-IXcz8QGhTYah1wY6sUa05LA1jo&cx=014691551258473930882:43efuujatky&q='+database[ind].title+'&searchType=image'
    //     $.ajax({
    //       url: url,
    //       success : function(data){
    //         // console.log("Sucess",data.items);
    //         database[ind].img = data.items[0].link;
    //         // console.log(database[ind]);
    //       },
    //       error : function(data){console.log("Error",data);}
    //     });
    //   })(i);
    // }
    
    for(var j=0;j<database.length;j++){

      (function(index){
        // debugger;
        // console.log(database[index].title);
        // console.log(database[index].title);
        var str = database[index].title+database[index].link


        Placemaker.getPlaces(str, index, function(loc){ 
          if(Array.isArray(loc.match)){  
          database[index].location = loc.match[0].place.name;
          database[index].coordinate = loc.match[0].place.centroid; 
          } else if (loc.match){
            database[index].location = loc.match.place.name;
          database[index].coordinate = loc.match.place.centroid; 
          }
          // console.log(database[index]);
        });

      })(j);

    }
    
  });
  
  }
    google.setOnLoadCallback(initialize);