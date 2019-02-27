//work in progress

function init(request){

  var input = request.body; //board details

  var height = input.board.height; //board height
  var width = input.board.width;  //board width
  var position = input.you.body; //snake body
  var head = input.you.body[0]; //snake head
  var position = input.you.body.id;
  var direction = wall();

}


function wall(){
  var wallN = head.y;
  var wallS = height - head.y;
  var wallE = head.x;
  var wallW = width - head.x;

  if((wallS === 1) && (wallE != 14)){
    return "right";
  }
  if((wallE === 14) && (wallN != 0)){
      return "up";
  }
  if((wallN === 0) && (wallE != 0)){
    return "left";
  }
  return "down";
}
