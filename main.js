lefteye_x = 0;
lefteye_y = 0;
chainpos_x = 0;
chainpos_y = 0;
tilakpos_x = 0;
tilakpos_y = 0;

blushx = 0;
blushy = 0;
crownx = 0;
crowny = 0;
earleftx = 0;
earlefty = 0;
earightx = 0;
earighty = 0;
neckx = 0;
necky = 0;

filtah_name= "";
function ThugApply(){
    console.log("thug selected")
    filtah_name = "Thug";
}
function QueenApply(){
    filtah_name = "Queen";
}
function preload(){
    overlap= loadImage("specs.png");
    ovlap = loadImage("chain.png");
    olap = loadImage("tilak.png");

    blush = loadImage("blush.png");
    crown = loadImage("crown.png");
    earleft = loadImage("earringleft.png");
    earight = loadImage("earringright.png");
    necklace = loadImage("necklace.png");
    nosepin = loadImage("nosepin.png");
}
function setup(){
    canvas = createCanvas(500, 350);
    canvas.position(433, 223);
    video = createCapture(VIDEO);
    video.size(500, 350);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("poseNet is initialised");
}
function gotPoses(results){
    if (results.length > 0){
        console.log(results); 
        lefteye_x = results[0].pose.leftEye.x -100;
        lefteye_y = results[0].pose.leftEye.y -55;
        chainpos_x = results[0].pose.leftShoulder.x -160;
        chainpos_y = results[0].pose.leftShoulder.y -50;
        tilakpos_x = results[0].pose.nose.x -40;
        tilakpos_y = results[0].pose.nose.y -95;

        blushx = results[0].pose.leftEye.x -100;
        blushy = results[0].pose.leftEye.y -15;
        crownx = results[0].pose.leftEye.x -100;
        crowny = results[0].pose.leftEye.y -150;
        earleftx = results[0].pose.leftEar.x -20;
        earlefty = results[0].pose.leftEar.y +25;
        earightx = results[0].pose.rightEar.x -25;
        earighty = results[0].pose.rightEar.y +25;
        neckx = results[0].pose.leftShoulder.x -180;
        necky = results[0].pose.rightShoulder.y -60;
    }}
function draw(){
    image(video, 0, 0, 500, 350);
    console.log(lefteye_x);
    if (filtah_name == "Thug"){
        image(overlap, lefteye_x, lefteye_y, 140, 140);
        image(ovlap, chainpos_x, chainpos_y, 115, 115);
        image(olap, tilakpos_x, tilakpos_y, 75, 75);
    }
    else if (filtah_name == "Queen"){
        image(blush, blushx, blushy, 150, 75);
        image(crown, crownx, crowny, 150, 115);
        image(earleft, earleftx, earlefty, 60, 60);
        image(earight, earightx, earighty, 60, 60);
        image(necklace, neckx, necky, 155, 155);
    }
}

function take_snapshot(){
    save("I choose to be a "+ filtah_name+".png");
}
