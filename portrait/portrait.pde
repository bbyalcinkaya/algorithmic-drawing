PImage img;
float div=12; // parameter that determines depth of recursion. change and investigate the result

void setup() {
  size(2000, 2000);
  img = loadImage("lenna.png");
  float scale = calcScale(img.width, img.height);
  img.resize(int(img.width*scale), int(img.height*scale));
  blendMode(ADD);
  noLoop();
}


void draw(){
  translate((width-img.width)/2, (height-img.height)/2); 
  
  background(0,0,0);
  strokeWeight(2);
  stroke(255,20);
  
  divtri(0, 0, img.width, 0,          img.width, img.height, 0); // upper triangle
  line(0,0, img.width, img.height);
  divtri(0, 0, 0,         img.height, img.width, img.height, 0); // lower triangle

  save("output.png");
  print("done");
}
// area of a triangle
float area(float x1, float y1, float x2, float y2, float x3, float y3){ 
  return abs((x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2))/2);
}
// get a number between x and y
float mid(float x, float y, float r){
  return (x*r+(1-r)*y);
}
// Calculate the scale ratio for fitting the drawing
float calcScale(int w, int h){
  float gr = float(width)/height;
  return (float(w)/float(h) > gr ? float(width)/w : float(height)/h);
}



// get maximum brightness of random points in triangle
float maximum(float x1, float y1, float x2, float y2, float x3, float y3){
  int n=max(100, int(sqrt(area(x1,y1,x2,y2,x3,y3)))); // more points for large triangles
  float mx=0, t=0, x_, y_, r1, r2, r3;
  for(int i=0; i<n; i++){
    r1=random(1);
    r2=random(1);
    r3=random(1);
    x_=(x1*r1+x2*r2+x3*r3)/(r1+r2+r3);
    y_=(y1*r1+y2*r2+y3*r3)/(r1+r2+r3);
    t = brightness(img.get(int(x_),int(y_)));
    if( mx<t ) mx = t;
  }
  return mx;
}

float getDivRatio(){
  float variance = 20; // change this and investigate the result
  float r = randomGaussian()/variance+0.5;
  if(r>1) return 1;
  if(r<0) return 0;
  return r;
}
void divtri(float x1, float y1, float x2, float y2, float x3, float y3, int depth){
  float d12=dist(x1,y1,x2,y2),
        d13=dist(x1,y1,x3,y3),
        d23=dist(x2,y2,x3,y3),
        r=getDivRatio();
  
  // stop recursion if recursion is deep enough 
  if(depth > maximum(x1,y1,x2,y2,x3,y3)/div) return;
  
  // find the longest edge and divide
  if(d12>d13 && d12>d23){
    line(x3,y3,mid(x1,x2,r),mid(y1,y2,r));
    divtri(x1,y1,x3,y3,mid(x1,x2,r),mid(y1,y2,r),depth+1);
    divtri(x2,y2,x3,y3,mid(x1,x2,r),mid(y1,y2,r),depth+1);
  }
  else if(d13>d23){
    line(x2,y2,mid(x1,x3,r),mid(y1,y3,r));
    divtri(x1,y1,x2,y2,mid(x1,x3,r),mid(y1,y3,r),depth+1);
    divtri(x3,y3,x2,y2,mid(x1,x3,r),mid(y1,y3,r),depth+1);
  }
  else {
    line(x1,y1,mid(x3,x2,r),mid(y3,y2,r));
    divtri(x1,y1,x2,y2,mid(x2,x3,r),mid(y2,y3,r),depth+1);
    divtri(x1,y1,x3,y3,mid(x2,x3,r),mid(y2,y3,r),depth+1);
  } 
}