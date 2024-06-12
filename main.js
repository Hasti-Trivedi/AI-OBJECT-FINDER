objects = [];
status = "";
video = "";

function preload () {
    
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.position();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 300);
        if(status != "")
            {
                objectDetector.detect(video, gotResult);
                for (i = 0; i < objects.length; i++) {
                    document.getElementById("status").innerHTML = "Status : Objects Detected";
                    

                    fill("#FF0000");
                    percent = floor(objects[i].confidence * 100);
                    text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                    noFill();
                    stroke("#FF0000");
                    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

                    if(objects[i].label== name)
                        {
                            video.stop();
                            objectDetector.detect(gotResult);
                            document.getElementById("status").innerHTML = name + "Found";
                            synth = window.speechSynthesis;
                            utterThis = new SpeechSynthesisUtterance(object_name + "Found"); 
                            synth.speak(utterThis);
                        }
                        else{
                            document.getElementById("status").innerHTML = name + " Not Found";
                        }
                }
            }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    name = documenty.getElementById("name").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}