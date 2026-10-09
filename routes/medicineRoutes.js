const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');

router.get('/', medicineController.getAllMedicines);
router.post('/', medicineController.addMedicine);
router.post('/:id/adjust', medicineController.adjustStock);

module.exports = router;
