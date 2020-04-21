var img;

function preload() {
  img = loadImage('image.png');
}
function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.id("drawing");
  //img = loadImage("lenna.png");
  var scale = calcScale(img.width, img.height);
  img.resize(img.width * scale, img.height * scale);
  blendMode(ADD);

  translate((width - img.width) / 2, (height - img.height) / 2);

  background(0, 0, 0);
  strokeWeight(1);
  stroke(255, 20);

  divtri(0, 0, img.width, 0, img.width, img.height, 0); // upper triangle
  line(0, 0, img.width, img.height);
  divtri(0, 0, 0, img.height, img.width, img.height, 0); // lower triangle

}

var q = [];

function draw() {
  translate((width - img.width) / 2, (height - img.height) / 2);


  for (var i = 0; i < 200 && q.length > 0; i++) {
    var params = q.shift();
    divtriWork(params[0], params[1], params[2], params[3], params[4], params[5], params[6]);
  }

  if (q.length <= 0) {
    console.log("stop");
    noLoop();
  }
}
// area of a triangle
function area(x1, y1, x2, y2, x3, y3) {
  return abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
}
// get a number between x and y
function mid(x, y, r) {
  return (x * r + (1 - r) * y);
}
// Calculate the scale ratio for fitting the drawing
function calcScale(w, h) {
  var gr = width / height;
  return (w / (h) > gr ? width / w : height / h);
}



// get maximum brightness of random points in triangle
function maximum(x1, y1, x2, y2, x3, y3) {
  var n = max(100, sqrt(area(x1, y1, x2, y2, x3, y3))); // more points for large triangles
  var mx = 0, t = 0, x_, y_, r1, r2, r3;
  for (var i = 0; i < n; i++) {
    r1 = random(1);
    r2 = random(1);
    r3 = random(1);
    x_ = (x1 * r1 + x2 * r2 + x3 * r3) / (r1 + r2 + r3);
    y_ = (y1 * r1 + y2 * r2 + y3 * r3) / (r1 + r2 + r3);
    t = brightness(img.get(int(x_), int(y_)));
    //console.log(x_, y_, t);
    if (mx < t) mx = t;
  }
  return mx;
}

function getDivRatio() {
  var variance = 20; // change this and investigate the result
  var r = randomGaussian() / variance + 0.5;
  if (r > 1) return 1;
  if (r < 0) return 0;
  return r;
}

function divtri(x1, y1, x2, y2, x3, y3, depth) {
  q.push([x1, y1, x2, y2, x3, y3, depth]);
}

function divtriWork(x1, y1, x2, y2, x3, y3, depth) {
  var d12 = dist(x1, y1, x2, y2),
    d13 = dist(x1, y1, x3, y3),
    d23 = dist(x2, y2, x3, y3),
    r = getDivRatio();

  // stop recursion if recursion is deep enough 
  var xt = maximum(x1, y1, x2, y2, x3, y3);

  if (depth > Math.pow(xt, 2) * 0.002) return;

  // find the longest edge and divide
  if (d12 > d13 && d12 > d23) {
    line(x3, y3, mid(x1, x2, r), mid(y1, y2, r));
    divtri(x1, y1, x3, y3, mid(x1, x2, r), mid(y1, y2, r), depth + 1);
    divtri(x2, y2, x3, y3, mid(x1, x2, r), mid(y1, y2, r), depth + 1);
  }
  else if (d13 > d23) {
    line(x2, y2, mid(x1, x3, r), mid(y1, y3, r));
    divtri(x1, y1, x2, y2, mid(x1, x3, r), mid(y1, y3, r), depth + 1);
    divtri(x3, y3, x2, y2, mid(x1, x3, r), mid(y1, y3, r), depth + 1);
  }
  else {
    line(x1, y1, mid(x3, x2, r), mid(y3, y2, r));
    divtri(x1, y1, x2, y2, mid(x2, x3, r), mid(y2, y3, r), depth + 1);
    divtri(x1, y1, x3, y3, mid(x2, x3, r), mid(y2, y3, r), depth + 1);
  }
}
