const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
//const movement = require('./movement.js');

const app = express()
const {
  fallbackHandler,
  notFoundHandler,
  genericErrorHandler,
  poweredByHandler
} = require('./handlers.js')

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 9001))

app.enable('verbose errors')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(poweredByHandler)

// --- SNAKE LOGIC GOES BELOW THIS LINE ---

// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // NOTE: Do something here to start the game
  function colorMe(){
    var randomNumb = Math.floor((Math.random() * 2) + 1);
    if(randomNumb == 1){
      return "#C70039";
    }else if(randomNumb == 2){
      return "#FF5733";
  }
}
  // Response data
  const data = {
    color: colorMe(),
    secondary_color: "#00FF00",
    name: "Hugo, Destroyer of the Free World",
    //"head_url": "https://images-na.ssl-images-amazon.com/images/I/61lL2qPoKtL._SX355_.jpg", // optional, but encouraged!
    taunt: "hiss", // optional, but encouraged!
    headType: "bendr",
    tailType: "pixel"
  }

  return response.json(data)
})
var current, //where we are currently?
    neighbours, // what do the surrounding tiles look like?
    lastMove; //what did we do last move?

const BOARD = {
  height: 0,
  weight: 0
};

// Handle POST request to '/move'
app.post('/move', (request, response) => {
  // NOTE: Do something here to generate your move

  var input = request.body; //board details
  var height = input.board.height; //board height
  var width = input.board.width;  //board width
  var position = input.you.body; //snake body
  var head = input.you.body[0]; //snake head
  var position = input.you.body.id;
  var direction = wall();

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
  const data = {
      move: wall(),
      taunt: "woof", // optional, but encouraged!
  }

  return response.json(data)
})

app.post('/end', (request, response) => {
  // NOTE: Any cleanup when a game is complete.
  return response.json({})
})

app.post('/ping', (request, response) => {
  // Used for checking if this snake is still alive.
  return response.json({});
})

// --- SNAKE LOGIC GOES ABOVE THIS LINE ---

app.use('*', fallbackHandler)
app.use(notFoundHandler)
app.use(genericErrorHandler)

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'))
})
