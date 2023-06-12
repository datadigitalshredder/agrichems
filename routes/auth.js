const express = require('express')
const passport = require('passport')
const router = express.Router()

// Send to Google for authentication
router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))

// Callback after google has authenticated the user.
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/log')
  }
)

// For logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router