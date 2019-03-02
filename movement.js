//work in progress 2019
direction = "down";
let movement = {

  slither: function(request) {

    var input = request.body;         //board details
    var height = input.board.height;  //board height
    var width = input.board.width;    //board width
    var body = input.you.body;        //snake body
    var head = input.you.body[0];     //snake head
    var health = input.you.health;    //snake health
    var food = input.board.food;      //food locations
    const foodSearch = 40;            //health for food search
    //var direction = "down";           //direction of snake

    //console.log(typeof(food));
    console.log(health);

    return(dance());


    function dance(){
      //Distance from snake to Walls
      var wallN = head.y; //top = 0
      var wallS = height - head.y;
      var wallE = head.x; //east = 0
      var wallW = width - head.x;

      while(true){
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
              console.log("oops");
              return "down";
          }

        }
        return(findFood());
    }
  }

    function findFood(){
      var headX = head.x;
      var headY = head.y;
      var closestX = food[0].x;
      var closestY = food[0].y;
      var minX =  Math.abs(headX - closestX);
      var minY =  Math.abs(headY - closestY);

      for(var i = 0; i < food.length; i++){
        if(Math.abs(headX - food[i].x) < minX){
          closestX = food[i].x;
          //console.log("X " + closestX);
        //  console.log("HEAD " + head.x);
        //  console.log("minX "+ minX);
        }
        if(Math.abs(headY - food[i].y) < minY){
          closestY = food[i].y;
        //  console.log("Y " +closestY);
      }
    }
    console.log("X: " + closestX + "  Y: " + closestY);
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
 }
};
module.exports = movement;
