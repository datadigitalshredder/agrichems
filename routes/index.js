const express = require('express');
const router = express.Router();

router.use('/agrichems', require('./agrichems'))
router.use('/user', require('./user'));

module.exports = router;