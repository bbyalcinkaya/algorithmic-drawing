function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.id("drawing");
  colorMode(HSB, 360, 100, 100, 100);
}
function draw(){
  var n_circles = 20;
  var r = min(width, height);
  var t = frameCount * 0.00005;
  background(0, 0, 0, (frameCount/2) % 100);
  translate(width/2, height/2);
  noStroke();
  
  rotate(t* 50);
  for(var i=1; i<=n_circles; i++ ){
    fill(i*10, 70, 90, 20);
    ellipse(0,0, 
            cos(i * t) * i * r/n_circles, 
            sin(i * t) * i * r/n_circles);
  }
} 
