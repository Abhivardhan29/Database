var ball;
var database,pos;
function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    database=firebase.database();
    var ballPos=database.ref("Ball/Position");
    ballPos.on("value",readOp,showErr);
}
function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
database.ref("Ball/Position").set(
    {
        x:pos.x+x,
        y:pos.y+y
    }
)
}

function readOp(data){
    pos=data.val();
    ball.x=pos.x;
    ball.y=pos.y;
}

function showErr(){
    console.log("Error Unable to connect to server");
}