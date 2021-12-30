song1 = "";
song2 = "";
lx = 0;
ly = 0;
rx = 0;
ry = 0;
rightwristscore = 0;
leftwristscore = 0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses)
}
function draw() {
    //creating canvas
    image(video, 0, 0, 600, 500);
    //song status + var
    leftwristscore = song1.isPlaying();
    //circle code
    fill("#4230a6");
    stroke("#4230a6");
    //if cond.
    if(leftwristscore > 0.2){
        //circle with X&Y
        circle(leftWristX, leftWristY, 20);
        //stoping song2
        song2.stop();
        //if cond. for song1
        if(song1 == false){
            //play song1
            song1.play();
            //update heading w/ song name
            document.getElementById("songname").innerHTML = "Peterpan Song"
        }
    }
}
function modelLoaded() {
    console.log("model loaded")
}
function gotPoses(results) {
    if(results.length > 0){
        console.log(results)
        lx = results[0].pose.leftWrist.x;
        ly = results[0].pose.leftWrist.y;
        rx = results[0].pose.rightWrist.x;
        ry = results[0].pose.rightWrist.y;
    }
}