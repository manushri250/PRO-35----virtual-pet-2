class Food {

    constructor(){
      this.foodStock = 15;
      this.lastFed;
      this.image = loadImage("Milk.png");
    }

    updateFoodStock(foodStock){
      this.foodStock = foodStock;
    }

    getFedTime(lastFed){
      this.lastFed = lastFed;
    }

    deductFood(){
      if(this.foodStock>1){
        this.foodStock = this.foodStock-1;
      }
      return this.foodStock;
    }


    getFoodStock(){
      return this.foodStock;
    }

    display(){


      var x = 50, y = 100;

      imageMode(CENTER);
      image(this.image, 600,275,70,70);

      if(this.foodStock!=0){
        for (var i = 0; i<this.foodStock; i++) {
          if(i%10==0){
            x = 50;
            y = y+50;
          }

         image(this.image, x, y, 50, 50);
         x = x+30;
        }
      }

          
        
    }

 

    

}

