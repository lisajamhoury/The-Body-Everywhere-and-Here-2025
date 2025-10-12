let myVid; 

function setup() {
  createCanvas(640, 480);

  myVid = createCapture(VIDEO, {flipped:true});
  myVid.hide();
}

function draw() {

  myVid.loadPixels();

  for (let y=0; y< height; y++) { 
    for (let x=0; x < width; x++) { 

      let i = (y*width+x)*4;

      myVid.pixels[i+0] = 255;
      // myVid.pixels[i+1] = 255;
      myVid.pixels[i+2] = 255;
      myVid.pixels[i+3] = 100;
    }
  }
  
  myVid.updatePixels();

  push();
  translate(width,0);
  scale(-1,1);
  image(myVid,0,0,width,height);
  pop();

  image(myVid,0,0,width,height);
}
