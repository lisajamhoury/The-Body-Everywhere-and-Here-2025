// p5 point cloud example 
// works with kinectron depth key feed
// kinectron version 1.0.1 (2025)

let depthDecoder;
let depthPoints = [];
let depthBuffer = [];

const DEPTHWIDTH = 320;
const DEPTHHEIGHT = 288;
const NUMPOINTS = DEPTHWIDTH*DEPTHHEIGHT; 

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);

  depthDecoder = new DepthDecoder(320,288);
  depthPoints = createPoints();

  // Create a new Kinectron instance with just the server IP
  const kinectron = new Kinectron('10.20.43.45'); // Enter IP address from application here!

  // Set up connection event handler
  kinectron.on('ready', () => {
    console.log('Connected to Kinectron server');
    kinectron.startDepthKey(gotDepth);
  });

  // Connect to the server
  kinectron.peer.connect();
}

function gotDepth(depthData){ 
    // Decode the Kinectron WebP depth data to a Uint16Array
    depthDecoder.decode(depthData, (decodedArray) => {
    depthBuffer = decodedArray;
    });
}

function draw() {
    background('green');
    orbitControl();

    if (depthBuffer.length < 1) {
        console.log('waiting for depth');
        return;
    }

    const MINDEPTH = 100;
    const MAXDEPTH = 2000;

    for (let y=0; y < DEPTHHEIGHT; y+=3) {
        for (let x=0; x < DEPTHWIDTH; x+=3) {

            let i = (y*DEPTHWIDTH+x);

            let depthVal = depthBuffer[i];

            if (depthVal < MINDEPTH || depthVal > MAXDEPTH) { 
                depthVal = Number.MAX_VALUE;
            } else {
                depthVal = map(depthVal,0,3000,0,1000);
            } 
            
            let newRed = (i/NUMPOINTS) *255;

            stroke(newRed, 255 - newRed, 255 - newRed);
            point(depthPoints[i].x, depthPoints[i].y, depthVal);
        }
    } 
}


function createPoints(){
    let newPoints = [];

    for (let y=0;y < DEPTHHEIGHT; y++) { 
        for (let x=0; x < DEPTHWIDTH; x++) { 

        const newVertex = {x:x-DEPTHWIDTH/2, y:y-DEPTHHEIGHT/2, z:0};
        
        newPoints.push(newVertex);

        }
    }
    return newPoints;

}  
