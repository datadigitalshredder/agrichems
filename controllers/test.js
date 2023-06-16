const express = require('express');
const mongodb = require('./db/connection')
const connectDB = require('./db/connection')
const mongoose=require('mongoose');
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
let bodyParser = require('body-parser')

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();

dotenv.config({ path: './.env' })

const port = process.env.PORT || 8080;

connectDB()

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

// Passport config
require('./db/passport')(passport)

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use(express.urlencoded({extended:true}))
  .use(express.static('public'))

  // Sessions

  .use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      // cookie: { secure: true }, // Works with https
      store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    })
  )
  // Passport middleware
  .use(passport.initialize())
  .use(passport.session())

  .use('/', require('./routes'))
  .use('/auth', require('./routes/auth'));

// Error handling
// Catch All Errors
// process.on('uncaughtException', (err, origin) => {
//   console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
// });

//

// mongodb.initDb((err, mongodb) => {
//   if (err) {
//     console.log(err);
//   } else {
//     app.listen(port);
//     console.log(`Connected to Database and listening on ${port}`);
//   }
// });

app.listen(
  port,
  console.log(`Connected to Database and listening on ${port}`)
)