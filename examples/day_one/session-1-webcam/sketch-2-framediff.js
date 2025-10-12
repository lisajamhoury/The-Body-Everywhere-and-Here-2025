let myVid; 
let pastPixels = [];
let tSlider;

function setup() {
  createCanvas(640, 480);

  myVid = createCapture(VIDEO, {flipped:true});
  myVid.hide();

  tSlider = createSlider(0,255, 100);
}

function draw() {

  myVid.loadPixels();

  const threshold = tSlider.value();

  for (let y=0; y < height; y++) { 
    for (let x=0; x < width; x++) { 

    let i = (y*width+x)*4;

    const diffR = abs(myVid.pixels[i+0]-pastPixels[i+0]);
    const diffG = abs(myVid.pixels[i+1]-pastPixels[i+1]);
    const diffB = abs(myVid.pixels[i+2]-pastPixels[i+2]);

    const avgDiff = (diffR+diffB+diffG)/3;

    pastPixels[i+0] = myVid.pixels[i+0];
    pastPixels[i+1] = myVid.pixels[i+1];
    pastPixels[i+2] = myVid.pixels[i+2];
    pastPixels[i+3] = myVid.pixels[i+3];

    if (avgDiff > threshold) { 
      myVid.pixels[i+0] = 255;
      myVid.pixels[i+1] = 255;
      myVid.pixels[i+2] = 255;
      myVid.pixels[i+3] = 255;
    } else{
      myVid.pixels[i+0] = 0;
      myVid.pixels[i+1] = 0;
      myVid.pixels[i+2] = 0;
      myVid.pixels[i+3] = 255;
    }
    }
  }
  
  myVid.updatePixels();
  image(myVid,0,0,width,height);
}
