int _numChildren =20;
int _maxLevels =4;
Branch _trunk;

void setup(){
  size(2048, 2048);
  background(255); 
  noFill();
  smooth(); 
  //stroke(10,50);
  strokeWeight(1);
  newTree();
  save("silk-tree.jpg");
  
}
//void draw(){
  //newTree();
//}
void newTree() {
  _trunk = new Branch(1, 0, width/2, 1700);
  _trunk.drawMe(true,null);
}

boolean onShape=false;
class Branch { 
  float level, index; 
  float x, y;
  float endx, endy;
  Branch [] children = new Branch[0];
  Branch(float lev, float ind, float ex, float why) { 
    level = lev;
    index = ind;
    updateMe(ex, why);
    if (level < _maxLevels) {
      children = new Branch[_numChildren]; 
      for (int x=0; x<_numChildren; x++) {
        children[x] = new Branch(level+1, x, endx, endy); 
      }
    } 
  }
  void updateMe(float ex, float why) { 
    x=ex;
    y=why;
    endx = x + (level * (random(220)-110));
    endy = y - 145 - (level * random(100));
  }
  
  void drawMe(boolean parentBranch, float[][] path) {
    
    if(parentBranch){
      path=new float[_maxLevels+1][2];
      //ellipse(x, y, 5, 5);
    }
    //print(level,"  ");
    path[(int)level-1][0]=x;
    path[(int)level-1][1]=y;
    for (int i=0; i<children.length; i++) {
      children[i].drawMe(false,path);
      //ellipse(endx, endy, 5, 5);
    }
    if(level>_maxLevels-1){  
      array2path(path);
    }
   
  }
  void array2path(float[][] path){
    noFill();
    float a=random(30)+20;
    stroke(10,a);
    beginShape();
    curveVertex(path[0][0],path[0][1]+random(200));
    curveVertex(path[0][0]+randomGaussian()*100,path[0][1]+randomGaussian()*50);
    curveVertex(path[0][0]+randomGaussian()*30,path[0][1]-random(50));
    for(int i =1;i<_maxLevels-1;i++){
      curveVertex(path[i][0]+randomGaussian()*10,path[i][1]+randomGaussian()*10);
    }
    curveVertex(path[_maxLevels-1][0],path[_maxLevels-1][1]);
    float endxx=endx+randomGaussian()*10;
    float endyy=endy+randomGaussian()*10;
    
    curveVertex(endxx,endyy);
    curveVertex(endx,endy+random(1000));
    endShape();
    fill(255);
    stroke(0,a);
    ellipse(endxx,endyy,10,10);
  }
}
