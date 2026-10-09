const db = require('../config/db');

const Visit = {
  // Fetch a single visit with full patient and attending personnel data
  async getById(id) {
    const [rows] = await db.query(
      `SELECT v.*, 
              p.id AS patient_db_id, p.id_number, p.first_name, p.last_name, 
              p.patient_type, p.gender, p.birth_date, p.department_or_course,
              u.full_name AS attending_staff, u.role AS staff_role
       FROM visits v
       JOIN patients p ON v.patient_id = p.id
       LEFT JOIN users u ON v.attending_user_id = u.id
       WHERE v.id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  // Insert a new consultation visit
  async create(visitData) {
    const {
      patient_id,
      attending_user_id,
      blood_pressure,
      temperature,
      pulse_rate,
      chief_complaint,
      diagnosis,
      treatment,
      remarks
    } = visitData;

    const [result] = await db.query(
      `INSERT INTO visits 
       (patient_id, attending_user_id, blood_pressure, temperature, pulse_rate, chief_complaint, diagnosis, treatment, remarks)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        patient_id,
        attending_user_id || null,
        blood_pressure || null,
        temperature || null,
        pulse_rate || null,
        chief_complaint,
        diagnosis || null,
        treatment || null,
        remarks || null
      ]
    );

    return result.insertId;
  }
};

module.exports = Visit;
