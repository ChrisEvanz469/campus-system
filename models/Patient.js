const db = require('../config/db');

const Patient = {
  // Get all patients ordered by most recently registered
  async getAll() {
    const [rows] = await db.query('SELECT * FROM patients ORDER BY created_at DESC');
    return rows;
  },

  // Get single patient by database ID
  async getById(id) {
    const [rows] = await db.query('SELECT * FROM patients WHERE id = ?', [id]);
    return rows[0] || null;
  },

  // Create new patient record
  async create(patientData) {
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
    } = patientData;

    const [result] = await db.query(
      `INSERT INTO patients 
       (id_number, patient_type, first_name, last_name, gender, birth_date, department_or_course, contact_number, emergency_contact, emergency_phone) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id_number, patient_type, first_name, last_name, gender, birth_date, department_or_course, contact_number, emergency_contact, emergency_phone]
    );

    return result.insertId;
  }
};

module.exports = Patient;
