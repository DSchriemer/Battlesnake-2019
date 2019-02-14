const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
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

  // Response data
  const data = {
    color: "#bbebf8",
    name: "Hugo, Destroyer of the Free World",
    head_url: "https://images-na.ssl-images-amazon.com/images/I/61lL2qPoKtL._SX355_.jpg", // optional, but encouraged!
    taunt: "No man can kill me", // optional, but encouraged!
  }

  return response.json(data)
})

// Handle POST request to '/move'
app.post('/move', (request, response) => {
  // NOTE: Do something here to generate your move

  var gen_move; //variable where we store the generated move

  var food_array_x_coords = []; //array containing x coordinates of food items
  var food_array_y_coords = []; //array containing y coordinates of food items

  var food_close_to_right = 0;
  var food_close_to_left = 0;
  var food_close_to_up = 0;
  var food_close_to_down = 0;

  var on_top_of_food = 0;

  //console.log(req.body.snakes[0].coords); //contains the coordinates of the snakes' coordinates
  console.log(req.body.food);

  function check_if_edge() {
    //head at top left corner of wall
    if(req.body.snakes[0].coords[0][0] == 0 && req.body.snakes[0].coords[0][1] == 0) {
      //if next body part is below head
      if(req.body.snakes[0].coords[1][1] == req.body.snakes[0].coords[0][1] + 1) {
        gen_move = 'right';
      }
      //if next body is to right of head
      else if(req.body.snakes[0].coords[1][0] == req.body.snakes[0].coords[0][0] + 1) {
        gen_move = 'down';
      }
      //we are at start state
      else {
        gen_move = 'right';
      }
    }
    //top right corner of wall
    else if(req.body.snakes[0].coords[0][0] == (req.body.width - 1) && req.body.snakes[0].coords[0][1] == 0) {
      //if next body part is to left of head
      if(req.body.snakes[0].coords[1][0] == req.body.snakes[0].coords[0][0] - 1) {
        gen_move = 'down';
      }
      //if next body part is below head
      else if(req.body.snakes[0].coords[1][1] == req.body.snakes[0].coords[0][1] + 1) {
        gen_move = 'left';
      }
    }
    //bottom right corner of wall
    else if(req.body.snakes[0].coords[0][0] == (req.body.width - 1) && req.body.snakes[0].coords[0][1] == (req.body.height - 1)) {
      //if next body part is above head
      if(req.body.snakes[0].coords[1][1] == req.body.snakes[0].coords[0][1] - 1) {
        gen_move = 'left';
      }
      //if next body part is to left of head
      else if(req.body.snakes[0].coords[1][0] == req.body.snakes[0].coords[0][0] - 1) {
        gen_move = 'up';
      }
    }
    //bottom left corner of wall
    else if(req.body.snakes[0].coords[0][0] == 0 && req.body.snakes[0].coords[0][1] == (req.body.height - 1)) {
      //if next body part is to right of head
      if(req.body.snakes[0].coords[1][0] == req.body.snakes[0].coords[0][0] + 1) {
        gen_move = 'up';
      }
      //if next body part is above head
      else if(req.body.snakes[0].coords[1][1] == req.body.snakes[0].coords[0][1] - 1) {
        gen_move = 'right';
      }
    }

    console.log("after check_if_edge" + gen_move);
  }

  function check_if_firstrow() {
    //if we are at top row
    if(req.body.snakes[0].coords[0][1] == 0) {
      //if we have a body part to our left
      if(req.body.snakes[0].coords[1][0] == req.body.snakes[0].coords[0][0] - 1) {
        console.log(gen_move);

        if(gen_move === 'left') {
          gen_move = 'right';
        }
        else if(gen_move === 'up') {
          gen_move = 'down';
        }
      }
      //if we have a body part to our right
      else if(req.body.snakes[0].coords[1][0] == req.body.snakes[0].coords[0][0] + 1) {
        console.log(gen_move);

        if(gen_move === 'right') {
          gen_move = 'left';
        }
        else if(gen_move === 'up') {
          gen_move = 'down';
        }
      }
      //if we have a body part below us
      else if(req.body.snakes[0].coords[1][1] == req.body.snakes[0].coords[0][1] + 1) {
        gen_move = 'left'; //just go left for one move regardless of where food is
      }
      //we are at start state
      else {
        gen_move = 'left';
      }
    }
  }

  function check_if_bottomrow() {
    //if we are at bottom row
    if(req.body.snakes[0].coords[0][1] == (req.body.height - 1)) {
      //if we have a body part to our left
      if(req.body.snakes[0].coords[1][0] == req.body.snakes[0].coords[0][0] - 1) {
        if(gen_move === 'left') {
          gen_move = 'right';
        }
        else if(gen_move === 'down') {
          gen_move = 'up';
        }
      }
      //we must have a body part to our right or above us
      else {
        if(gen_move === 'right') {
          gen_move = 'left';
        }
        else if(gen_move === 'up') {
          gen_move = 'left';
        }
      }
    }
  }

  function check_if_rightcolumn() {
    //if we are at right column wall
    if(req.body.snakes[0].coords[0][0] == (req.body.width - 1)) {
      //if we have a body part above us
      if(req.body.snakes[0].coords[1][1] == req.body.snakes[0].coords[0][1] - 1) {
        if(gen_move === 'up') {
          gen_move = 'down';
        }
        else if(gen_move === 'right') {
          gen_move = 'left';
        }
      }
      //we must have a body part below us or to our left
      else {
        if(gen_move === 'down') {
          gen_move = 'up';
        }
        else if(gen_move === 'left') {
          gen_move = 'up';
        }
      }
    }
  }

  function check_if_leftcolumn() {
    //if we are at left column wall
    if(req.body.snakes[0].coords[0][0] == 0) {
      //if we have a body part above us
      if(req.body.snakes[0].coords[1][1] == req.body.snakes[0].coords[0][1] - 1) {
        if(gen_move === 'up'){
          gen_move = 'down';
        }
        else if(gen_move === 'left') {
          gen_move = 'right';
        }
      }
      //we must have a body part below us or to our right
      else {
        if(gen_move === 'down') {
          gen_move = 'up';
        }
        else if(gen_move === 'right') {
          gen_move = 'down';
        }
      }
    }
  }

  function store_food_location_into_array() {
    //loop through the food array
    for(var i = 0; i < req.body.food.length; i++) {
      //store the x coordinates of the food locations into an array
      food_array_x_coords[i] = req.body.food[i][0];
      //store the y coordinates of the food locations into an array
      food_array_y_coords[i] = req.body.food[i][1];
    }
  }

  function look_for_food() {
    for(var i = 0; i < food_array_x_coords.length; i++) {
      //if head of snake is to left of food item
      if(req.body.snakes[0].coords[0][0] < food_array_x_coords[i]) {
        //as long as body part of snake is not to right
        if(req.body.snakes[0].coords[1][0] != req.body.snakes[0].coords[0][0] + 1) {
          //if there is a food item to right that is 5 spaces or less away in x-dimension
          if(req.body.snakes[0].coords[0][0] >= food_array_x_coords[i] - 5 && food_array_x_coords[i] - 5 >= 0) {
            //food is close by to the right
            food_close_to_right = 1;
            break;
          }
        }
      }
      //if food is in same column as head of snake
      if(req.body.snakes[0].coords[0][0] == food_array_x_coords[i]) {
        //if head of snake is above food item
        if(req.body.snakes[0].coords[0][1] < food_array_y_coords[i]) {
          //if there is a food item below that is 5 spaces or less away in y-dimension
          if(req.body.snakes[0].coords[0][1] >= food_array_y_coords[i] - 5 && food_array_y_coords[i] - 5 >= 0) {
            //food is close by downwards
            food_close_to_right = 0;
            food_close_to_down = 1;
            break;
          }
        }
        //if head of snake is below food item
        else if(req.body.snakes[0].coords[0][1] > food_array_y_coords[i]) {
          //if there is a food item above that is 5 spaces or less away in y-dimension
          if(req.body.snakes[0].coords[0][1] <= food_array_y_coords[i] + 5 && food_array_y_coords[i] + 5 <= (req.body.height - 1)) {
            //food is close by upwards
            food_close_to_right = 0;
            food_close_to_up = 1;
            break;
          }
        }
      }

      //only check if we arent close to food in vertical direction
      if(food_close_to_up == 0 && food_close_to_down == 0) {
        //if head of snake is to right of food item
        if(req.body.snakes[0].coords[0][0] > food_array_x_coords[i]) {
          //as long as body part is not to left of snake
          if(req.body.snakes[0].coords[1][0] != req.body.snakes[0].coords[0][0] - 1) {
            //if there is a food item to left that is 5 spaces or less away in x-dimension
            if(req.body.snakes[0].coords[0][0] <= food_array_x_coords[i] + 5 && food_array_x_coords[i] + 5 <= (req.body.width - 1)) {
              //food is close by to left
              food_close_to_left = 1;
              break;
            }
          }
        }
        //if food is in same column as head of snake
        if(req.body.snakes[0].coords[0][0] == food_array_x_coords[i]) {
          //if head of snake is above food item
          if(req.body.snakes[0].coords[0][1] < food_array_y_coords[i]) {
            //if there is a food item below that is 5 spaces or less away in y-dimension
            if(req.body.snakes[0].coords[0][1] >= food_array_y_coords[i] - 5 && food_array_y_coords[i] - 5 >= 0) {
              //food is close by downwards
              food_close_to_left = 0;
              food_close_to_down = 1;
              break;
            }
          }
          //if head of snake is below food item
          else if(req.body.snakes[0].coords[0][1] > food_array_y_coords[i]) {
            //if there is a food item above that is 5 spaces or less away in y-dimension
            if(req.body.snakes[0].coords[0][1] <= food_array_y_coords[i] + 5 && food_array_y_coords[i] + 5 <= (req.body.height - 1)) {
              //food is close by upwards
              food_close_to_left = 0;
              food_close_to_up = 1;
              break;
            }
          }
        }
      }
    }

    if(food_close_to_right == 1) {
      console.log("food close to the right");

      if(req.body.snakes[0].coords[1][0] != req.body.snakes[0].coords[0][0] + 1) {
        gen_move = 'right';
      }
    }
    else if(food_close_to_left == 1) {
      console.log("food close to the left");

      if(req.body.snakes[0].coords[1][0] != req.body.snakes[0].coords[0][0] - 1) {
        gen_move = 'left';
      }
    }
    else if(food_close_to_down == 1) {
      console.log("food close to down");

      if(req.body.snakes[0].coords[1][1] != req.body.snakes[0].coords[0][1] + 1) {
        gen_move = 'down';
      }
    }
    else if(food_close_to_up == 1) {
      console.log("food close to up");

      if(req.body.snakes[0].coords[1][1] != req.body.snakes[0].coords[0][1] - 1) {
        gen_move = 'up';
      }
    }
  }

  //initially set the default move to up, then perform many checks
  //based on result of the checks, make changes accordingly in functions
  //if no change is made, then the default move of up will be sent to server
  gen_move = 'up';
  store_food_location_into_array();
  look_for_food();
  check_if_firstrow();
  check_if_bottomrow();
  check_if_rightcolumn();
  check_if_leftcolumn();
  check_if_edge();

  // Response data
  var data = {
    //one of: ['up','down','left','right']
    move: gen_move,
    taunt: 'Snake and bake', // optional, but encouraged!
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
