//Number of circles generated
Session.setDefault("circleCount", 41);
//Hue of circles generated
Session.setDefault("circleHue", "random");
//Luminosity of circles generated
Session.setDefault("circleLuminosity", "random");
//Number of generations done
Session.setDefault("generation", 0);

Template.circlesCtrl.onRendered(function(){
  //Init all tooltips (Hue, Luminosity)
  $("[data-toggle='tooltip']").tooltip();
}),//onRendered

Template.circlesCtrl.helpers({
  circleCount: function() {
    return Session.get("circleCount");
  },
  circleHueList: function() {
    return ["red","orange","yellow","green","blue","purple","pink","monochrome"];
  },
  circleHue: function(){
    return Session.get("circleHue");
  },
  circleLumList: function() {
    return ["bright","light","dark"];
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
    Session.set("circleCount", Math.max(5, Session.get("circleCount")-4));
  },
  //Changing circleHue
  'click .hueOptions': function(e){
    //Indicate what option was selected
    showHueSelect(e);
    //Get hue from data-hue attribute
    Session.set("circleHue", e.target.dataset.hue);
  },
  //Changing circleLuminosity
  'click .lumOptions': function(e){
    //Indicate what option was selected
    showLumSelect(e);
    //Get luminosity from data-lum attribute
    Session.set("circleLuminosity", e.target.dataset.lum);
  },
  //Generate circles
  'click #generateCircles': function(e){
    //Increment generation
    Session.set("generation", Session.get("generation")+1);
    var svgWrapperID = "#svgWrapper"+Session.get("generation");
    //Add panel to hold SVG
    addPanel();
    //Get width and height for svg
    var w = $(window).width() - 30; // -30px for panel padding
    var h = $(window).height() - 70;
    //Generate random circle styling
    var rData = randomData(w, h);
    //Init svg element to created panel
    var svg = d3.select(svgWrapperID)
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    //Add circles to svg element
    //  .selectAll will create as many circle elements as needed for rData
    var circles = svg.selectAll("circle")
      //Add data
      .data(rData)
      //Enter
      .enter()
      //Add circles
      .append("circle");
    //Style circles, d is each item in rData array
    circles
      .attr("r", function(d, i){
        return 0;
      })
      .attr("cx", function(d, i){
        return d.xlng;
      })
      .attr("cy", function(d, i){
        return d.ylat;
      })
      .style({
        "fill": function(d, i){
          return "white";
        },
        "stroke": function(d, i){
          return "black";
        },
        "stroke-width": 0
      })
      //Add transition, delayed at 500ms and duration of 1000ms
      //  Most methods on selections apply to transitions, and d3 interpolates from start->end state
      .transition().delay(500)
      .duration(2000)
      .attr("r", function(d, i){
        return d.radius;
      })
      .style({
        "fill": function(d, i){
          return d.fill;
        },
        "stroke": function(d, i){
          return d.stroke;
        },
        "stroke-width": function(d, i){
          return Math.sqrt(Math.sqrt(d.radius))*3;
        }
      });
    //Scroll to newly created panel via remove icon ID
    $("#remove"+Session.get("generation"))[0].scrollIntoView();
  }
  //
});//events
