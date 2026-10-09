const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/', patientController.getAllPatients);
router.get('/new', patientController.renderNewForm);
router.post('/', patientController.createPatient);
router.get('/:id', patientController.getPatientById);
router.post('/:id/visits', patientController.recordVisit);
router.get('/:id/visits/:visitId/certificate', patientController.renderCertificate);

module.exports = router;
