//work in progress
direction = "down"; //direction of snake
let movement = {

  slither: function(request) {

    //var fill = require('flood-fill');
    //var zero = require('zeros');
    var PF = require('pathfinding');

    var input = request.body;         //board details
    var height = input.board.height;  //board height
    var width = input.board.width;    //board width
    var body = input.you.body;        //snake body
    var head = input.you.body[0];     //snake head
    var health = input.you.health;    //snake health
    var food = input.board.food;      //food locations
    const foodSearch = 30;            //health for food search

    //var grid = zero([width, height]);
    var grid = new PF.Grid(width, height);
    var finder = new PF.AStarFinder();
    var gridBackup = grid.clone();
    var path = finder.findPath(head.x, head.y, food[0].x, food[0].y, grid);


    console.log(path);
    //console.log(body);

    return(dance());

    function dance(){
      //Distance from snake to Walls
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
              return "down";
          }

        }
        return(findFood());

  }

    function findFood(){
      var headX = head.x;
      var headY = head.y;
      var closestX = food[0].x;
      var closestY = food[0].y;
      var minX =  Math.abs(headX - closestX);
      var minY =  Math.abs(headY - closestY);

      //to-do make sure x and y coordinate
      //are for single food

      for(var i = 0; i < food.length; i++){
        if(Math.abs(headX - food[i].x) < minX){
          closestX = food[i].x;
        }
        if(Math.abs(headY - food[i].y) < minY){
          closestY = food[i].y;
      }
    }
    console.log("foodX: " + closestX + "  foodY: " + closestY);
    console.log("x: " + head.x + "  y: " + head.y);
    console.log("direction: " + direction);
    if(head.x > closestX && (direction === "up" || direction === "down" || direction === "left")){
      direction = "left";
      return "left";
    }
    if(head.x <= closestX && (direction === "up" || direction === "down" || direction === "right")){
      direction = "right";
      return "right";
    }
    if(head.y <= closestY && (direction === "right" || direction === "left" || direction === "down")){
      direction = "down";
      return "down";
    }
    if(head.y > closestY && (direction === "right" || direction === "left" || direction === "up")){
      direction = "up";
      return "up";
    }
    direction = "up";
    return("up");
  }

  /****
  Check and see if direction will not result
  in a collison with other snakes or my snake.
  Take direction and scan spot. If spot is unsafe,
  find a spot that is safe. If spot is safe continue
  on the path. Return true?
  ****/

  /****
  new idea create a 2d array of unsafe coordinates and
  get rid of them completely
  ****/


  //function avoidSnek(direction){
  //  if(direction === "right" && (head.x - 1) !=  ){

  //  }
//  }






 }
};
module.exports = movement;
