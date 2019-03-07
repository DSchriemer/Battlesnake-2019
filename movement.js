//work in progress
direction = "down"; //direction of snake
let movement = {

  slither: function(request) {

    var PF = require('pathfinding');
    const distance = require('manhattan')

    var input = request.body;         //board details
    var height = input.board.height;  //board height
    var width = input.board.width;    //board width
    var body = input.you.body;        //snake body
    var head = input.you.body[0];     //snake head
    var health = input.you.health;    //snake health
    var food = input.board.food;      //food locations

    const foodSearch = 30;            //health for food search

    //A* path finder module
    var grid = new PF.Grid(width, height); //create grid
    var finder = new PF.AStarFinder(); //select A*
    var gridBackup = grid.clone(); //clone grid


    //var initLength = (Math.abs(head.x - food[0].x) + Math.abs(head.y - food[0].y));

    //console.log(sneks.body);

    return(dance()); //LETS DANCE

    function dance(){

      var wallN = head.y; //top = 0
      var wallS = height - head.y;
      var wallE = head.x; //east = 0
      var wallW = width - head.x;


        while(health > foodSearch){

          if((wallS === 1) && (wallE != 14)){
              direction = "right";
              return "right";
          }
          if((wallE === 14) && (wallN != 0)){
              direction = "up";
              return "up";
          }
          if((wallN === 0) && (wallE != 0)){
              direction = "left";
              return "left";
          }
          if(direction != "up"){
              direction = "down";
              //if(avoidSnek(direction)){
              return "down";
          //}
        }
      }
        return(findFood());
    }

    function findFood(){

      var closestFoodX = food[0].x;
      var closestFoodY = food[0].y;
      var count = 0;
/*
      for(var i = 0; i < food.length; i++){
        if((Math.abs(head.x - food[i].x) + Math.abs(head.y - food[i].y)) < initLength){
           closestFoodX = food[i].x;
           closestFoodY = food[i].y;
           count = i;
           initLength = (Math.abs(head.x - food[i].x) + Math.abs(head.y - food[i].y))
        }
    }*/
    //var path = finder.findPath(head.x, head.y, food[count].x, food[count].y, grid); //find path

    if(head.x > closestFoodX && (direction === "up" || direction === "down" || direction === "left")){
      direction = "left";
      return "left";
    }
    if(head.x <= closestFoodX && (direction === "up" || direction === "down" || direction === "right")){
      direction = "right";
      return "right";
    }
    if(head.y <= closestFoodY && (direction === "right" || direction === "left" || direction === "down")){
      direction = "down";
      return "down";
    }
    if(head.y > closestFoodY && (direction === "right" || direction === "left" || direction === "up")){
      direction = "up";
      return "up";
    }
    direction = "up";
    return("up");

  }

/*
  function avoidSnek(direction){
      var flag = 0;
      /*if(direction === "up"){
        for(var i = 0; i < body.length; i++){
          if((head.y + 1) != body[i]){
            flag = 0;
        }else{
          flag = 1;
        }
      }
      if(direction === "down"){
        for(var i = 0; i < body.length; i++){
          if((head.y + 1) != body[i].y){
            flag = 0;
        }else{
          flag = 1;
          return false;
        }
      }
      /*for(var i = 0; i < sneks.length; i++){
        if((head.y + 1) != snekpos[i].y){
          flag = 0;
      }else{
        flag = 1;
      }
    }
  }
    /*
      if(direction === "right"){
        for(var i = 0; i < body.length; i++){
          if((head.x + 1) != body[i]){
            flag = 0;
        }else{
          flag = 1;
        }
      }
    }
    */
    /*
      if(direction === "left"){
        for(var i = 0; i < body.length; i++){
          if((head.x - 1) != body[i]){
            flag = 0;
        }else{
          flag = 1;
        }
      }
    }
    */
    /*  if(flag === 0){
        return true;
      }else{
        return false;
      }*/


/*
  }*/
  }
};
module.exports = movement;
