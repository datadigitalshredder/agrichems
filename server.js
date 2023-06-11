const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connection');
// const dotenv = require('dotenv')
// const passport = require('passport')

//
const path = require('path')
// const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const connectDB = require('./db/connection')
//
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const port = process.env.PORT || 8080;

// Load config
dotenv.config({ path: './.env' })

require('./db/passport')(passport)

connectDB()

const app = express();

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
  .use( // Sessions
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
    })
  )
  .use(passport.initialize()) // Passport middleware
  .use(passport.session())
  .use(function (req, res, next) { // Set global var
    res.locals.user = req.user || null
    next()
  })
  .use('/', require('./routes'))
  .use('/auth', require('./routes/auth'))
  .use('/agrichems', require('./routes/agrichems'))


// Error handling
// Catch All Errors
// process.on('uncaughtException', (err, origin) => {
//   console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
// });

//

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to Database and listening on ${port}`);
  }
});