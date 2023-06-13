// const express = require('express');
const router = require('express').Router()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/agrichems', require('./agrichems'));
// router.use('/user', require('./user'));

//importing middleware
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// router.get('/api-docs', ensureGuest ,(req, res) => {
//     res.use('/api-docs', swaggerUi.setup(swaggerDocument));
//   })

router.use('/api-docs', ensureGuest, ensureAuth, swaggerUi.serve);
router.get('/api-docs', ensureGuest, ensureAuth, swaggerUi.setup(swaggerDocument));


router.get("/login",ensureAuth, ensureGuest, async(req,res)=>{
    res.render('index',{userinfo:req.user})
})

// LOGIN TEST

// Login page
// route GET /
router.get('/', (req, res) => {
    res.send('Login')
})


module.exports = router;

