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

  const left_shoulder = pose.left_shoulder; 

  fill('green');
  noStroke();
  ellipse(width-left_shoulder.x, left_shoulder.y, 20);

  const left_wrist = pose.left_wrist; 

  fill('pink');
  noStroke();
  ellipse(width-left_wrist.x, left_wrist.y, 50);



  // const keypoints = pose.keypoints; 
  
  // for (let i=0; i < keypoints.length; i++) { 
  //   const keypoint = keypoints[i];

  //   fill('green');
  //   noStroke();
  //   ellipse(width-keypoint.x, keypoint.y, 20);
  // }


}
