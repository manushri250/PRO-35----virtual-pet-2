//Create variables here
var dog, happydogimg, database, foodS, foodStock;
var dogimg;
var fedTime, lastFed;
var foodObj;
var feed, addFood;
//var x =20;


function preload()
{
  //load images here
  dogimg=loadImage("dog.png");
  happydogimg=loadImage("happydog.png");
  //milk = loadImage("Milk.png")
}

function setup() {
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodStock.set(15);

  createCanvas(800, 500);
  dog = createSprite(700,300,20,20);
  dog.addImage(dogimg);
  dog.scale = 0.2;

  feed = createButton("Feed the dog");
  feed.position(800,100);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(900,100);
  addFood.mousePressed(addFoods);

  input = createInput("Name your pet");
  button = createButton("Play");
  greeting = createElement("h3");
  input.position(1140,200);
  button.position(1220,230);
  
  foodObj = new Food();
  
}


function draw() { 
  background((46, 139, 87)); 

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed= data.val();
  })

  button.mousePressed(function(){
    input.hide();
    button.hide();

    var name = input.value();
    greeting.html("Hello ! I am "+name);
    greeting.position(1150,240);
    
})

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM", 600, 75);
  } else if(lastFed==0){
    text("Last Feed : 12 AM", 600, 30);
  }else{
    text("Last Feed : "+ lastFed+ "AM", 600, 75);
  }

  foodObj.display();
  
  drawSprites();
  text("I am feeling hungry !", 630, 400);
  
  textSize(50);
}

function readStock(data){
  foodS=data.val();
}


// function to update food stock and and last fed time
function feedDog(){
  dog.addImage(happydogimg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodObj = new Food();
  dog.addImage(dogimg);
  foodS++;
  database.ref('/').update({
  Food: foodS
  
  })
}



