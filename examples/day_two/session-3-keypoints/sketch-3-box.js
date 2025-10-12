let bodyPose;
let myVid;
let pose = 'undefined';

function preload() {
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 480);

  myVid= createCapture(VIDEO, {flipped:true});
  myVid.hide();

  bodyPose.detectStart(myVid, {flipped:true}, gotPoses);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0];
  }
}


function draw() {
  background('magenta');
  // image(myVid,0,0,width,height);

  if (pose === 'undefined'){
    console.log('waiting for pose');
    return;
  }

  const box = pose.box;

  strokeWeight(10);
  stroke('yellow');
  noFill();
  rect(width-box.xMin, box.yMin, -1*box.width, box.height);

}
