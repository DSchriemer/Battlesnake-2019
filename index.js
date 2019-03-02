const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const movement = require('./movement.js');


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
    color: "#C70039",
    secondary_color: "#00FF00",
    name: "Smaug, the terrible",
    head_url: "https://pbs.twimg.com/profile_images/2931866544/127b863ca71b759a41cacd9715435a99.jpeg", // optional, but encouraged!
    taunt: "I am King Under the Mountain!", // optional, but encouraged!
    headType: "evil",
    tailType: "pixel"
  }

  return response.json(data)
})

// Handle POST request to '/move'
app.post('/move', (request, response) => {

  const data = {
      move: movement.slither(request),
      taunt: ["I am fire, I am death.",
              "My teeth are swords!",
              "You will burn!"
      ],
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
