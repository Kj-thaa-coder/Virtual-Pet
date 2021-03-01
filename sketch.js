const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;



var dog
var sadDog
var happyDog
var foodStock
var specialMilk
var milkImg
var position



var foodS

var input

var foodImg
var lovedDog
var foodObj
var feed
var addFood


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  milkImg = loadImage("Images/Milk.png")
  // lovedDog = loadImage("")

}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();
  console.log(database);

  engine = Engine.create();
	world = engine.world;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock)

// game = new Game()
// game.getState()
// game.start()

  foodObj = new Food();

  feed=createButton("Feed the dog")
  feed.position(690,160)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,160)
  addFood.mousePressed(addFoods)

  input =createInput("put your pets name here")
  input.position(940,190)
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;






}

function draw() {
  background(46,139,87);
  drawSprites();
  
 
 
 foodObj.display()

  // if(mousePressed(dog)){
  //   dog.addImage(lovedDog)
  // }
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}

function feedDog(){

dog.addImage(happyDog)
foodObj.updateFoodStock(foodObj.getFoodStock()-1)
 database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour ()
 })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food: foodS
  }
  
  )
  }


