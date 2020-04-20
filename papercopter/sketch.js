var copters, img;

function preload() {
  img = loadImage('instr.png');
}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.id("cool_canvas");
  background(0);
  copters = [];
  stroke(255);
  strokeWeight(2);
  fill(255);
}


function drawCopter(copter) {
    push();
    
    translate(copter.x, copter.y);
    rotate(frameCount * 0.1);
    rect(0,0, copter.r, copter.r * 0.2);
    rect(0,0, -copter.r, -copter.r * 0.2);
    pop();
}

function inside(copter) {
    return copter.r > 2;
}

function spawnCopter() {
    copters.push({x:random() * width, y: random() * height, r: 50});
}

function moveCopter(copter) {
    copter.y = copter.y + (noise(copter.x * 0.01, copter.y * 0.01 + 1000) - 0.5) * 2;
    copter.x = copter.x + (noise(copter.x * 0.01, copter.y * 0.01) - 0.5) * 2;
    copter.r = copter.r - 0.3;
}
function draw(){
    background(0, 0,0, 30);
    
    if(frameCount  % 20 == 0 && copters.length < 20) {
        spawnCopter();
    }
    
    copters.forEach(drawCopter);
    copters.forEach(moveCopter);
    
    copters = copters.filter(inside);
    image(img, 0, height-250, 250, 250);
} 
