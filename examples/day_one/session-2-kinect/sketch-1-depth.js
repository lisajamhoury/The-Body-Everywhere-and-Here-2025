// p5 depth image example 
// works with kinectron depth feed
// kinectron version 1.0.1 (2025)

function setup() {
  createCanvas(640, 576);
  pixelDensity(1);

  // Create a new Kinectron instance with just the server IP
  const kinectron = new Kinectron('10.20.43.45'); // Enter IP address from application here!

  // Set up connection event handler
  kinectron.on('ready', () => {
    console.log('Connected to Kinectron server');
    kinectron.startDepth(gotDepth);
  });

  // Connect to the server
  kinectron.peer.connect();
}

function gotDepth(depthFrame) { 
  loadImage(depthFrame.src, drawDepth);
}

function drawDepth (depthImg) { 
  image(depthImg, 0,0,width,height);

  loadPixels(); 
  
  for (let y=0; y< height; y++) { 
    for (let x =0; x < width; x++) { 

      let i = (y*width+x)*4;

      const deptVal = pixels[i];
      const mappedDepth = map(deptVal, 100,200,0,1);
      const newRGB = HSVtoRGB(mappedDepth,1,1);

      pixels[i+0] = newRGB.r;
      pixels[i+1] = newRGB.g;
      pixels[i+2] = newRGB.b;
      pixels[i+3] = 255;

    }
  }
  updatePixels();
}

// function draw() {
//   background(220);
// }

/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR 
 * h, s, v
*/
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
