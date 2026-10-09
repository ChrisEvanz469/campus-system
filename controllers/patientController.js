const Patient = require('../models/Patient');

const patientController = {
  // GET /patients
  async getAllPatients(req, res) {
    try {
      const patients = await Patient.getAll();
      
      // Return JSON if requested by API clients, otherwise render HTML view
      if (req.query.format === 'json') {
        return res.json({ success: true, count: patients.length, data: patients });
      }

      res.render('patients/index', { patients });
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).send('Server error retrieving patient records.');
    }
  },

  // GET /patients/:id
  async getPatientById(req, res) {
    try {
      const patient = await Patient.getById(req.params.id);
      if (!patient) {
        return res.status(404).send('Patient record not found.');
      }
      res.json({ success: true, data: patient });
    } catch (error) {
      console.error('Error fetching patient:', error);
      res.status(500).send('Server error retrieving patient record.');
    }
  }
};

module.exports = patientController;
