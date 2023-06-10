const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth')


const chemsController = require('../controllers/chemicals');
const validation = require('../middleware/validate');

// LESSON 5
router.get('/', chemsController.getAll);

router.get('/:id', chemsController.getOne);

router.post('/', ensureAuth, validation.saveChem, chemsController.createNewChem);

// LESSON 6

router.put('/:id', ensureAuth, validation.saveChem, chemsController.updateChem);

router.delete('/:id', ensureAuth, chemsController.deleteChem);


module.exports = router;