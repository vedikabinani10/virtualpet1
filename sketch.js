//Create variables here
var dog, happydog, database, foodS, foodStock,dogimg;

function preload(){
  //load images here
  dogimg = loadImage("images/dogImg.png");
  happydog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 1000);
   database = firebase.database();
   dogsprite = createSprite(300,300,20,20);
   dogsprite.addImage("dogimg",dogimg);
   dogsprite.scale = 0.3;
   foodStock = database.ref('Food');
   foodStock.on("value", readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog = createSprite(300,300,20,20);
    dog.addImage("happydog",happydog);
    dog.scale = 0.3;
    dogsprite.visible = false;
  }
  else if(keyWentUp(UP_ARROW)){
    dog.visible = false;
    dogsprite.visible = true;
  }
  drawSprites();
  fill("black");
  textSize(40);
  //add styles here
  text(foodS,50,200);
  text("Note: Press UP_ARROW key to feed the dog milk", 50,50);
  stroke(15);
}



//function to read values from database
function readStock(data){
  foodS = data.val();
}

//function to write values from database
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food : x
  })
}

