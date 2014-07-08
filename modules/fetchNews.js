Placemaker.config.appID = "0jB5lijV34F9pmGIxH1KxwYifXQa4wtlcNo2KtaCbtoQr9qSlwga.6PYas0_wehS"
    
  google.load("feeds", "1");
  var database = [];

  function initialize() {
      //fetch feed
    var feed = new google.feeds.Feed("http://www.reddit.com/r/worldnews/.rss");
    feed.setNumEntries(10);

    

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

    for(var j=0;j<database.length;j++){

      (function(index){
        // debugger;
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