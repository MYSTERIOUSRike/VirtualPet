//In this project, we apply to connect to real time database and create a virtual pet app to feed the dog.

//Creatng the variables 
var dog, happyDog, database, foodS, foodStock;
var dogsprite,dogsprite1;
var database;

function preload()
{
  //load images here 
  dog= loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800, 1000);
  //geting the firebase database
  database=firebase.database();

  //refering food
  foodStock=database.ref('Food')
  foodStock.on("value", readStock);

  //writing the food stock
  writeStock(21);
  console.log("foodS in setup "+foodS);
 }


function draw() {  

  background(46, 139, 87);

  //create image sprite
  dogsprite=createSprite(350,600,10,10);
  dogsprite.addImage(dog);

  //funtion to feed the dog
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    background(46, 139, 87);
    dogsprite.addImage(happyDog); // Open Issue - How to over write existing image?
  }
    
  drawSprites();

  textSize(50);
  fill("blue");
  stroke("red");
  text("FoodStock="+foodS, 150, 200);  

}

//funtion to read  the food stock from databaae
function readStock(data){
   foodS=data.val();
}

//funtion to write  the food stock to database
function writeStock(x){
 
  if (x<=0)
  {
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({  
    Food:x
  })
}

/*function happydog(body1){
  body1.addImage("images/dogImg1.png",dog)
}*/

