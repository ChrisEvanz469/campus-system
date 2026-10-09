const db = require('../config/db');

const dashboardController = {
  async getDashboard(req, res) {
    try {
      // 1. Metric: Total Patients
      const [[{ totalPatients }]] = await db.query('SELECT COUNT(*) AS totalPatients FROM patients');

      // 2. Metric: Today's Visits
      const [[{ visitsToday }]] = await db.query(
        'SELECT COUNT(*) AS visitsToday FROM visits WHERE DATE(visit_date) = CURDATE()'
      );

      // 3. Metric: All-Time Consultation Visits
      const [[{ totalVisits }]] = await db.query('SELECT COUNT(*) AS totalVisits FROM visits');

      // 4. Metric: Low Stock Medicine Items (stock <= 50)
      const [[{ lowStockCount }]] = await db.query(
        'SELECT COUNT(*) AS lowStockCount FROM medicines WHERE stock_quantity <= 50'
      );

      // 5. Recent 5 Consultations
      const [recentVisits] = await db.query(
        `SELECT v.*, p.first_name, p.last_name, p.id_number, p.patient_type, u.full_name AS staff_name
         FROM visits v
         JOIN patients p ON v.patient_id = p.id
         LEFT JOIN users u ON v.attending_user_id = u.id
         ORDER BY v.visit_date DESC
         LIMIT 5`
      );

      // 6. Recent 5 Registered Patients
      const [recentPatients] = await db.query(
        'SELECT * FROM patients ORDER BY created_at DESC LIMIT 5'
      );

      res.render('dashboard/index', {
        stats: {
          totalPatients,
          visitsToday,
          totalVisits,
          lowStockCount
        },
        recentVisits,
        recentPatients
      });
    } catch (error) {
      console.error('Error loading dashboard metrics:', error);
      res.status(500).send('Server error loading clinic dashboard.');
    }
  }
};

module.exports = dashboardController;
