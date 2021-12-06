var Balloon, database;
var position;
function preload(){
  bg =loadImage("cityImage.png");
  balloonImage1=loadAnimation("hotairballoon1.png");
  balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
  "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
  "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
 }



function setup(){
  database=firebase.database()

  console.log(database);
  createCanvas(500,500);

  Balloon = createSprite(250,250,10,10);
  Balloon.shapeColor = "red";
  Balloon.addAnimation("hotAirBalloon",balloonImage2);
  Balloon.scale=0.5;

  var bPos=database.ref("balloon/position")
  bPos.on("value",readPosition,showError) 



}

function draw(){
  background(bg);
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
   
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x':position.x+x,
    'y':position.y+y
    })
    
 
}

function readPosition(data){
 position=data.val()
 Balloon.x=position.x
 Balloon.y=position.y
}

function showError(){
  console.log("error in writing procedure")
}
