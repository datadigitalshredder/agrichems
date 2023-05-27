const express = require('express');
const router = express.Router();

const chemsController = require('../controllers/chemicals');
const validation = require('../middleware/validate');

// LESSON 5
router.get('/', chemsController.getAll);

router.get('/:id', chemsController.getOne);

router.post('/', validation.saveChem, chemsController.createNewChem);

// LESSON 6

router.put('/:id', validation.saveChem, chemsController.updateChem);

router.delete('/:id', chemsController.deleteChem);


module.exports = router;