oneisPlaying = "";
twoisPlaying = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;
song_1 ="";
song_2 ="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload(){
song_1 =loadSound("Cradles.mp3");
song_2 =loadSound("Love Nwantiti.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("Model is intialized.");
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreLeftWrist,scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist X: "+leftWristX+"  Left Wrist Y: "+leftWristY);
        console.log("Right Wrist X: "+rightWristX+"  Right Wrist Y: "+rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    oneisPlaying = song_1.isPlaying();
    twoisPlaying = song_2.isPlaying();  
    fill('salmon');
    stroke('chocolate');
    if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY,20);
    song_2.stop();
    if(oneisPlaying == false){
        song_1.play();
        document.getElementById("result").innerHTML = "Playing Cradles"
    }
    }
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY,20);

        song_1.stop();
        if(twoisPlaying == false){
            song_2.play();
            document.getElementById("result").innerHTML = "Playing Love Nwantiti."
        }
    }

}


