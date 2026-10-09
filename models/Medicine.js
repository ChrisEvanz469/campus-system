const db = require('../config/db');

const Medicine = {
  // Fetch all medicines sorted by lowest stock first
  async getAll() {
    const [rows] = await db.query('SELECT * FROM medicines ORDER BY stock_quantity ASC');
    return rows;
  },

  // Adjust medicine stock by quantity delta (positive to restock, negative to dispense)
  async adjustStock(id, changeAmount) {
    const [result] = await db.query(
      'UPDATE medicines SET stock_quantity = GREATEST(0, stock_quantity + ?) WHERE id = ?',
      [changeAmount, id]
    );
    return result.affectedRows;
  },

  // Add new medicine to inventory
  async create(data) {
    const { name, category, stock_quantity, unit, expiration_date } = data;
    const [result] = await db.query(
      'INSERT INTO medicines (name, category, stock_quantity, unit, expiration_date) VALUES (?, ?, ?, ?, ?)',
      [name, category || null, stock_quantity || 0, unit || 'tablets', expiration_date || null]
    );
    return result.insertId;
  }
};

module.exports = Medicine;
