var particles;
function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.id("cool_canvas");
  colorMode(HSB,360,100,100);
  background(0,0,0);
  strokeWeight(15);
  particles = min(width, height) / 2;
}
function draw(){
  translate(width/2, height/2);
  
  // FADE
  fill(0,0.1);
  noStroke();
  rect(-width/2, -height/2, width, height);
  noFill();
  
  for(var i=0; i<particles ; i++){
    stroke(360*i/particles, 50, 100, 0.05);
    point(
      i*cos((particles-i-1)*frameCount/450.0),
      i*sin((particles-i-1)*frameCount/1350.0)
    );
  }
} 
