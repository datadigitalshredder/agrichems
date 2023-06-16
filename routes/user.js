const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth')


const userController = require('../controllers/users');

router.get('/', userController.getUsers);

router.get('/:id', userController.getUser);

// router.post('/', userController.createNewUser);

module.exports = router;