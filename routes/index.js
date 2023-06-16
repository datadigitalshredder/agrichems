// const express = require('express');
const router = require('express').Router()
const dotenv = require('dotenv')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

dotenv.config({ path: './.env' })

// router.use('/agrichems', require('./agrichems'));
// router.use('/user', require('./user'));

//importing middleware
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// router.get('/api-docs', ensureGuest ,(req, res) => {
//     res.use('/api-docs', swaggerUi.setup(swaggerDocument));
//   })

// router.use('/api-docs', ensureAuth, swaggerUi.serve);
// router.get('/api-docs', ensureAuth, swaggerUi.setup(swaggerDocument));


// router.get("/login", ensureGuest, async(req,res)=>{
//     res.render('index',{userinfo:req.user})
// })

// LOGIN TEST

// Login page
// route GET /
// ensureGuest
// router.get('/login', ensureGuest, (req, res) => {
//     res.redirect('https://pesticides.onrender.com/auth/google')
// })

// router.get('/', (re, res) => {
//     res.render('login', {
//         layout: 'login'
//     })
// })

// Swagger dashboard
// route GET /dashboard
// // ensureAuth
// router.get('/api-docs', ensureAuth, (req, res) => {
//     res.redirect(
//         `https://pesticides.onrender.com/auth/google?client_id=${process.env.GOOGLE_CLIENT_ID}`
//       );
// })
// router.get('/dashboard', (req, res) => {
//     res.render('dashboard')
// })

router.use('/agrichems', require('./agrichems'));
router.use('/user', require('./user'));


module.exports = router;

