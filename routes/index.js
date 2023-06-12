const express = require('express');
const router = express.Router();

router.use('/agrichems', require('./agrichems'));
router.use('/user', require('./user'));

module.exports = router;

// const express = require('express')
// const router = express.Router()
// const { ensureAuth, ensureGuest } = require('../middleware/auth')

// const Chemical = require('../controllers/chemicals')

// // @desc    Login/Landing page
// // @route   GET /
// router.get('/', ensureGuest, (req, res) => {
//   res.render('login', {
//     layout: 'login',
//   })
// })

// // @desc    Dashboard
// // @route   GET /dashboard
// router.get('/dashboard', ensureAuth, async (req, res) => {
//   try {
//     const chemicals = await Chemical.find({ user: req.user.id }).lean()
//     res.render('dashboard', {
//       name: req.user.firstName,
//       chemicals,
//     })
//   } catch (err) {
//     console.error(err)
//     res.render('error/500')
//   }
// })

// module.exports = router
