let bodyPose;
let myVid;
let pose = 'undefined';
let p5lm;
let friendBox = 'undefined';

function preload() {
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 480);

  myVid= createCapture(VIDEO, {flipped:true});
  myVid.hide();

  bodyPose.detectStart(myVid, {flipped:true}, gotPoses);

  p5lm = new p5LiveMedia(this, "DATA", null, "taco1598");
  p5lm.on('data', gotData);

}

function gotData(data, id) {
  friendBox = JSON.parse(data);
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

  p5lm.send(JSON.stringify(box));

  if (friendBox === 'undefined') {
    console.log('waiting for a friend');
    return;
  }
  
  strokeWeight(30);
  stroke('blue');
  noFill();
  rect(width-friendBox.xMin, friendBox.yMin, -1*friendBox.width, friendBox.height);
}
