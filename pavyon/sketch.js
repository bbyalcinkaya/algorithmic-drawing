var particles, fr = 50;
function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.id("cool_canvas");
  colorMode(HSB,360,100,100);
  background(0,0,0);
  strokeWeight(15);
  frameRate(fr);
  particles = min(width, height) / 2;
}
function draw(){
  translate(width/2, height/2);
  var t = frameCount * 1.0 / fr;
  // FADE
  fill(0,0.1);
  noStroke();
  rect(-width/2, -height/2, width, height);
  noFill();
  
  for(var i=0; i<particles ; i++){
    stroke(360*i/particles, 100, 100, 0.1);
    var k = (particles - i - 1) * t / 60;
    point(
      i*cos(k*sin(t/20)),
      i*sin(k)
    );
  }
} 
