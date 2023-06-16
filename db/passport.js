// import all the things we need 
// const passport = require('passport') 
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('../controllers/user')
dotenv.config({ path: '../.env' })
// test


module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // callbackURL: 'https://pesticides.onrender.com/auth/google/callback',
        // callbackURL: '/auth/google/callback',
        callbackURL: 'https://pesticides.onrender.com/api-docs/oauth2-redirect.html', // CALL BACK 2

      },
      async (accessToken, refreshToken, profile, done) => {
        //get the user data from google 
        // console.log(profile)
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.emails[0].value
        }

        try {
          //find the user in our database 
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
            //If user present in our database.
            done(null, user)
          } else {
            // if user is not preset in our database save user data to database.
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // used to deserialize the user
  // passport.deserializeUser((id, done) => {
  //   User.findById(id, (err, user) => done(err, user))
  // })

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user))
  });
} 