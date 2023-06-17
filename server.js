const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const mongodb = require('./db/connection')
// const mongodb = require('mongodb')
// const MongoClient = require('mongodb').MongoClient
const connectDB = require('./db/connection')
const mongoose = require('mongoose')

const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
let bodyParser = require('body-parser')
// const exphbs = require('express-handlebars')

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();

// dotenv.config({ path: './.env' })

const port = process.env.PORT || 8080;

// connectDB()

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

// Passport config
require('./db/passport')(passport)

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Handlebars
// app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
// app.set('view engine', '.hbs')
// app.set("views", "./views")

// Body parser
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())

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

  // Routes
  .use('/', require('./routes'))
  .use('/auth', require('./routes/auth'))
  // .use('/dashboard', require('./routes/'));


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
    // connectDB();
    app.listen(port);
    console.log(`Mongodb connected and listening on ${port}`);
  }
});

// app.listen(
//   port,
//   console.log(`Mongoose connected and listening on ${port}`)
// )