randomBounded = function(bound) {
  return Math.floor(Math.random() * bound);
};

//Session Variables//
//Number of circles 
Session.setDefault("circleCount", 25);

Template.circlesCtrl.helpers({
  circleCount: function() {
    return Session.get("circleCount");
  }
});//helpers

Template.circlesCtrl.events({
  'click #circleAdd': function(e) {
    Session.set("circleCount", Session.get("circleCount")+1);
  },
  'click #circleRemove': function(e) {
    Session.set("circleCount", Math.max(0, Session.get("circleCount")-1));
  },
  'click #generateCircles': function(e){
    var w = 500, h = 500;
    //Get circle count
    var circleCount = Session.get("circleCount");
    //Generate random circle data (radius, (x,y) posn);
    //  Add color eventually
    var c = {};
    var circleData = [];
    for (idx=0; idx<circleCount; idx++) {
      c.radius = randomBounded(50);
      c.xlng = randomBounded(w);
      c.ylat = randomBounded(h);
      circleData.push(c);
      c = {};
    };
    console.log("random circle data: ", circleData);
    //Init svg element
    var svg = d3.select("#circleContainer")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    //Add circles
    var circles = svg.selectAll("circle")
      .data(circleData)
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
      });
  }//
});//events
