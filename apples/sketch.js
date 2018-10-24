var seed, phototropism;
function flower(x, y){
  push();
  fill(random(100,200), 10, 10);
  noStroke();
  var f = ellipse(x, y, random(5,10));
  pop();
}
function leaf(x, y){
  push();
  fill(20, random(50,100), 20, 100);
  noStroke();
  var f = ellipse(x, y, random(2,10));
  f.
  pop();
}
function thickf(rat, thick){
  return sqrt(rat)*thick;
}
function lenf(rat, len){
  return len*sqrt(rat);
}
function anglef(rat, angle){
  return angle+rat*PI/2;
}
function drawTree(x1, y1, len, thick, angle, phototropism){
  angle = (10*angle+phototropism*PI/2)/(10+phototropism);
  var x2 = x1+cos(angle)*len;
  var y2 = y1-sin(angle)*len;
  if(thick < 1){
    if(random(100) < 1) flower(x1,y1);
    else leaf(x1,y1);
  } 
  else {
    strokeWeight( thick );
    line( x1 , y1, x2, y2 );

    var rat = randomGaussian(0.5,0.2);
    rat = min(0.9, rat);
    rat = max(0.1, rat);
    drawTree(x2, y2, lenf(rat,len),   thickf(rat, thick),   anglef(1-rat,angle), phototropism);
    drawTree(x2, y2, lenf(1-rat,len), thickf(1-rat, thick), anglef(-rat,angle),     phototropism);
  }
}
function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  phototropism = random(0,3);
	seed = parseInt(random(0,987654321));
  console.log(seed, phototropism);
  noLoop();
}

function draw(){
  background(200);
  angleMode(RADIANS);
  push();
  translate(width/2, height);
  randomSeed(seed);
  drawTree(0, 0, 70, random(30,70), PI/2, phototropism);
  pop();
}
