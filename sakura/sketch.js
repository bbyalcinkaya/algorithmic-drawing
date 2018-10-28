var seed, geo;

function thickf(rat, thick){
  return thick*pow(rat,0.5);
}
function lenf(rat, len){
  return len*pow(rat,0.3);
}
function anglef(rat, angle){
  return angle+rat*PI/3;
}
function drawTree(x1, y1,x2, y2,x3, y3, len, thick, angle){
  if(random(thick) < 0.1) return;
  if(thick < 3)
    geo = 7;
  else
    geo = 0;
  if(angle > PI)
    angle = (10*angle+geo*TWO_PI)/(10+geo)
  else
    angle = (10*angle)/(10+geo);
  var x4 = x3+cos(angle)*len;
  var y4 = y3-sin(angle)*len;
  if(thick < 0.5){
    leaf(x2,y2);
  } 
  else {
    strokeWeight( thick );
    stroke(0,0,20);
    noFill();
    curve( x1 , y1, x2, y2,x3, y3, x4, y4);

    var rat = randomGaussian(0.5,0.2);
    rat = min(0.9, rat);
    rat = max(0.1, rat);
    drawTree(x2, y2,x3, y3, x4, y4, lenf(rat,len),   thickf(rat, thick),   anglef(1-rat,angle));
    drawTree(x2, y2,x3, y3, x4, y4, lenf(1-rat,len), thickf(1-rat, thick), anglef(-rat,angle));
  }
}


function draw(){
  angleMode(RADIANS);
  translate(width/2, height);
  randomSeed(seed);
  var initl = 90;
  rotate(PI/2);
  background(210, 20, 50);
  drawTree(initl, 0, 0, 0, 0, 0, initl, 80, PI);
  
}


function leaf(x, y){
  push();
  fill(300, random(10,50), 80, 30);
  noStroke();
  ellipse(x, y, random(4,10));
  
  pop();
}


function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  seed = parseInt(random(0,987654321));
  console.log(seed, geo);
  noLoop();
  colorMode(HSB, 360,100,100,100);
}
