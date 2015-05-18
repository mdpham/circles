

//Session Variables//
//Number of circles generated
Session.setDefault("circleCount", 33);
//Hue of circles generated
Session.setDefault("circleHue", "random");
//Luminosity of circles generated
Session.setDefault("circleLuminosity", "random");


Template.circlesCtrl.helpers({
  circleCount: function() {
    return Session.get("circleCount");
  },
  circleHueList: function() {
    return ["red","orange","yellow","green","blue","purple","pink","monochrome","random"];
  },
  circleHue: function(){
    return Session.get("circleHue");
  },
  circleLumList: function() {
    return ["bright","light","dark","random"];
  },
  circleLuminosity: function() {
    return Session.get("circleLuminosity");
  }
});//helpers

Template.circlesCtrl.events({
  //Incrementing circleCount
  'click #circleAdd': function(e) {
    Session.set("circleCount", Session.get("circleCount")+4);
  },
  'click #circleRemove': function(e) {
    Session.set("circleCount", Math.max(1, Session.get("circleCount")-4));
  },
  //Changing circleHue
  'click .hueOptions': function(e){
    //Get hue from data-hue attribute
    Session.set("circleHue", e.target.dataset.hue);
  },
  //Changing circleLuminosity
  'click .lumOptions': function(e){
    //Get luminosity from data-lum attribute
    Session.set("circleLuminosity", e.target.dataset.lum);
  },
  //Generate circles
  'click #generateCircles': function(e){
    var w = 1000, h = 400;
    var rData = randomData(w, h);
    console.log(rData);
    //Init svg element
    var svg = d3.select("#circleContainer")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    //Add circles
    var circles = svg.selectAll("circle")
      .data(rData)
      .enter()
      .append("circle");
    //Style circles
    circles
      .attr("r", function(d, i){
        console.log(d);
        return d.radius;
      })
      .attr("cx", function(d, i){
        return d.xlng;
      })
      .attr("cy", function(d, i){
        return d.ylat;
      })
      .style({
        "fill": function(d, i){
          return d.fill
        },
        "stroke": function(d, i){
          return d.stroke;
        },
        "stroke-width": 4
      });
  }//
});//events
