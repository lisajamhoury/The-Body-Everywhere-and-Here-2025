let myVid;
let bodyPose;
let connections;
let pose = "undefined";

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 480);
  myVid = createCapture(VIDEO, { flipped: true });
  myVid.hide();

  bodyPose.detectStart(myVid, gotPoses);
  connections = bodyPose.getSkeleton();
}

function gotPoses(poses) {
  if (poses.length > 0) {
    // console.log('got it')
    pose = poses[0];
  }
}

function draw() {
  background(255, 100, 100, 20);
  image(myVid, 0, 0, width, height);

  if (pose === "undefined") {
    console.log("waiting for pose");
    return;
  }

  const left_eye = pose.left_eye;
  const right_wrist = pose.right_wrist;

  copy(
    myVid,
    width - left_eye.x,
    left_eye.y,
    50,
    50,
    width - right_wrist.x,
    right_wrist.y,
    100,
    100
  );

  const nose = pose.nose;
  const left_wrist = pose.left_wrist;

  copy(
    myVid,
    width - nose.x,
    nose.y,
    50,
    50,
    width - left_wrist.x,
    left_wrist.y,
    100,
    100
  );

  const box = pose.box;

  strokeWeight(5);
  stroke("yellow");
  noFill();

  // rect(width - box.xMin, box.yMin, bW, bH);
  rect(width - box.xMin, box.yMin, -1 * box.width, box.height);
}
