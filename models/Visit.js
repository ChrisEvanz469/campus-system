const db = require('../config/db');

const Visit = {
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
