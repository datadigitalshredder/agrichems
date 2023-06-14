const express = require('express')
const passport = require('passport')
const router = express.Router()

// Send to Google for authentication
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// Callback after google has authenticated the user.
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // res.redirect('/api-docs', swaggerUi.setup(swaggerDocument))
    res.redirect('/api-docs')

  }
)

// For logout
// router.get('/logout', (req, res) => {
//   req.logout()
//   res.redirect('/')
// })

router.get('/logout', (req, res, next) => {
  req.logout((error) => {
      if (error) {return next(error)}
      res.redirect('/')
  })
})

module.exports = router