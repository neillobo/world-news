Placemaker.config.appID = "0jB5lijV34F9pmGIxH1KxwYifXQa4wtlcNo2KtaCbtoQr9qSlwga.6PYas0_wehS"
    
  google.load("feeds", "1");

  function initialize() {
      //fetch feed
    var feed = new google.feeds.Feed("http://www.reddit.com/r/worldnews/.rss");
    feed.setNumEntries(4);

    var database = [];

  feed.load(function(result) {
    if (!result.error) {
     console.log(result.feed.entries)
     var container = document.getElementById("feed");
     for (var i = 0; i < result.feed.entries.length; i++) {
          var entry = {};
          entry.title = result.feed.entries[i].title;
          
          Placemaker.getPlaces(entry.title, function(o){ console.log(o); });
      }
    }
    console.log(database);
  });

  }
    google.setOnLoadCallback(initialize);