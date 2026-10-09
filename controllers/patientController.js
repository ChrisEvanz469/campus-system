const Patient = require('../models/Patient');

const patientController = {
  // GET /patients
  async getAllPatients(req, res) {
    try {
      const patients = await Patient.getAll();
      res.json({ success: true, count: patients.length, data: patients });
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).json({ success: false, message: 'Server error retrieving patients.' });
    }
  },

  // GET /patients/:id
  async getPatientById(req, res) {
    try {
      const patient = await Patient.getById(req.params.id);
      if (!patient) {
        return res.status(404).json({ success: false, message: 'Patient not found.' });
      }
      res.json({ success: true, data: patient });
    } catch (error) {
      console.error('Error fetching patient:', error);
      res.status(500).json({ success: false, message: 'Server error retrieving patient.' });
    }
  }
};

module.exports = patientController;
