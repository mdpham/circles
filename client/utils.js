randomBounded = function(bound) {
  return Math.floor(Math.random() * bound);
};

randomData = function(w,h) {
  //Get session variables for generating options
  var cCount = Session.get("circleCount");
  var cHue = Session.get("circleHue");
  cHue = cHue == "random" ? "" : cHue;
  var cLum = Session.get("circleLuminosity");
  cLum = cLum == "random" ? "" : cLum;
  //Generate random circle data
  var c = {};
  var cData = [];
  for (idx=0; idx<cCount; idx++) {
    c.radius = randomBounded(h/3);
    c.xlng = randomBounded(w);
    c.ylat = randomBounded(h);
    //https://github.com/davidmerfield/randomColor
    c.fill = randomColor({hue: cHue, luminosity: cLum});
    c.stroke = randomColor({hue: cHue, luminosity: cLum});
    cData.push(c);
    c = {};
  };
  return cData;
};

addPanel = function() {
  //Get circle generation options for panel heading
  var num = Session.get("generation");
  var count = Session.get("circleCount");
  var hue = Session.get("circleHue");
  var lum = Session.get("circleLuminosity");
  //Construct panel html
  var wrapper = 
    "<div class='panel panel-default'><div class='panel-heading'><h3 class='panel-title'><i id='remove"+num+"' class='fa fa-times fa-lg'></i> | Count: "
    +count+" | Hue: "+hue+" | Luminosity: "+lum
    +"</h3></div><div class='panel-body' id='svgWrapper"+num+"'></div></div>";
    //Add panel to DOM
  $("#circleCanvas").append(wrapper);
  //Add remove on click
  $("#remove"+num).click(function(e){removePanel(e)});
};
removePanel = function(e) {
  //Traverse up tree until div.panel parent element that was appended and remove from DOM
  $(e.target).parents(".panel")[0].remove();
};

showHueSelect = function(e) {
  //Remove previously selected icon by clearing all
  $(".hueSelectIcon").removeClass("fa fa-hand-o-left fa-lg")
  //Get DOM object for selected option's icon and add class
  $(e.target.children[0]).addClass("fa fa-hand-o-left fa-lg");
};
showLumSelect = function(e){
  $(".lumSelectIcon").removeClass("fa fa-hand-o-left fa-lg");
  $(e.target.children[0]).addClass("fa fa-hand-o-left fa-lg");
};