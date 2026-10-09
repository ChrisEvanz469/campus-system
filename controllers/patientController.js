const Patient = require('../models/Patient');

const patientController = {
  // GET /patients
  async getAllPatients(req, res) {
    try {
      const patients = await Patient.getAll();
      const message = req.query.registered ? 'Patient record successfully registered!' : null;

      if (req.query.format === 'json') {
        return res.json({ success: true, count: patients.length, data: patients });
      }

      res.render('patients/index', { patients, message });
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).send('Server error retrieving patient records.');
    }
  },

  // GET /patients/new
  renderNewForm(req, res) {
    res.render('patients/new', { error: null });
  },

  // POST /patients
  async createPatient(req, res) {
    try {
      const {
        id_number,
        patient_type,
        first_name,
        last_name,
        gender,
        birth_date,
        department_or_course,
        contact_number,
        emergency_contact,
        emergency_phone
      } = req.body;

      if (!id_number || !first_name || !last_name || !patient_type || !gender) {
        return res.status(400).render('patients/new', {
          error: 'Please fill in all required fields (ID, Name, Role, Gender).'
        });
      }

      await Patient.create({
        id_number: id_number.trim(),
        patient_type,
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        gender,
        birth_date: birth_date || null,
        department_or_course: department_or_course ? department_or_course.trim() : null,
        contact_number: contact_number ? contact_number.trim() : null,
        emergency_contact: emergency_contact ? emergency_contact.trim() : null,
        emergency_phone: emergency_phone ? emergency_phone.trim() : null
      });

      res.redirect('/patients?registered=true');
    } catch (error) {
      console.error('Error creating patient:', error);
      res.status(500).render('patients/new', {
        error: error.code === 'ER_DUP_ENTRY' 
          ? 'A patient with this University ID Number already exists.' 
          : 'Failed to save patient record. Please check inputs.'
      });
    }
  },

  // GET /patients/:id
  async getPatientById(req, res) {
    try {
      const patient = await Patient.getById(req.params.id);
      if (!patient) {
        return res.status(404).send('Patient record not found.');
      }

      const visits = await Patient.getVisitsByPatientId(req.params.id);

      if (req.query.format === 'json') {
        return res.json({ success: true, data: { patient, visits } });
      }

      res.render('patients/show', { patient, visits });
    } catch (error) {
      console.error('Error fetching patient profile:', error);
      res.status(500).send('Server error retrieving patient profile.');
    }
  }
};

module.exports = patientController;
