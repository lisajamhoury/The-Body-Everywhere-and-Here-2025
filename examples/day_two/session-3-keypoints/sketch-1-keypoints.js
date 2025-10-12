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
  background(220, 10);
  // image(myVid,0,0,width,height);

  if (pose === 'undefined'){
    console.log('waiting for pose');
    return;
  }

  const keypoints = pose.keypoints; 
  
  for (let i=0; i < keypoints.length; i++) { 
    const keypoint = keypoints[i];

    fill('green');
    noStroke();
    ellipse(width-keypoint.x, keypoint.y, 20);
  }


}
