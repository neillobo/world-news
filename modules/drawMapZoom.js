var zoom = d3.behavior.zoom()
    .scaleExtent([1, 9])
    .on("zoom", move);

  var tooltip, projection, path, svg, g;
  var width = document.getElementById('container').offsetWidth;
  var height = width/2;
  var active;

  //tooltip element  
  tooltip = d3.select('#container').append('div').attr('class','tooltip hidden');

  
  //initializing
  setupMap(width,height);
  function setupMap (width,height){
    projection = d3.geo.mercator()
      .translate([(width/2),(height/2)])
      .center([0,35])
      .scale(200)
      .rotate(-90,0);

      path = d3.geo.path().projection(projection);

      svg = d3.select('#container').append('svg')
        .attr('width',width)
        .attr('height',height)
        .call(zoom)
        .append('g');

      svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .on("click", reset);
        // .on("click",click);

      g = svg.append('g');
  }

  

    function click(d) {
      // console.log("clicked");
      if (active === d) return reset();
      g.selectAll(".active").classed("active", false);
      d3.select(this).classed("active", active = d);

      var b = path.bounds(d);
      g.transition().duration(750).attr("transform",
          "translate(" + projection.translate() + ")"
          + "scale(" + .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height) + ")"
          + "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")");
    }

    function reset() {
      // console.log("Reset");
      g.selectAll(".active").classed("active", active = false);
      g.transition().duration(750).attr("transform", "");
    }

  d3.json('data/world-topo-min.json', function(error, world) {

    var countries = topojson.feature(world, world.objects.countries).features

    topography = countries;
    draw(topography);

    

  });

  function draw(topography){

    var country = g.selectAll('.country').data(topography);

    country.enter().insert('path')
      .attr('class','country')
      .attr('d',path)
      .attr('id',function(d,i) {return d.id; })
      .attr('title', function(d,i) {return d.properties.name; })
      .on('click',click)
      .style('fill', function(d,i) {return "#AFBCC4" });


    var offsetL = document.getElementById('container').offsetLeft+20;
    var offsetT = document.getElementById('container').offsetTop+10;

    country
      .on('mousemove',function(d,i) {

        var mouse = d3.mouse(svg.node()).map( function (d){
          return parseInt(d); 
        });
        
        tooltip.classed("hidden", false)
          .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
          .html(d.properties.name);

        })
      
      .on('mouseout', function(d,i){
        tooltip.classed('hidden',true);
      });
  }

  function redraw(){
    width = document.getElementById('container').offsetWidth;
    height = width/2;
    d3.select('svg').remove();
    setupMap(width,height);
    draw(topography); 
  }

  function move() {
      var t = d3.event.translate;
    var s = d3.event.scale; 
    zscale = s;
    var h = height/4;


    t[0] = Math.min(
      (width/height)  * (s - 1), 
      Math.max( width * (1 - s), t[0] )
    );

    t[1] = Math.min(
      h * (s - 1) + h * s, 
      Math.max(height  * (1 - s) - h * s, t[1])
    );

    zoom.translate(t);
    g.attr("transform", "translate(" + t + ")scale(" + s + ")");
    //adjust the country hover stroke width based on zoom level
    d3.selectAll(".country").style("stroke-width", 1.5 / s);  
  }

  