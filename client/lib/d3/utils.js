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