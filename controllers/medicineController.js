const Medicine = require('../models/Medicine');

const medicineController = {
  // GET /medicines
  async getAllMedicines(req, res) {
    try {
      const medicines = await Medicine.getAll();
      const message = req.query.msg || null;

      if (req.query.format === 'json') {
        return res.json({ success: true, count: medicines.length, data: medicines });
      }

      res.render('medicines/index', { medicines, message });
    } catch (error) {
      console.error('Error retrieving medicines:', error);
      res.status(500).send('Server error retrieving pharmacy inventory.');
    }
  },

  // POST /medicines
  async addMedicine(req, res) {
    try {
      const { name, category, stock_quantity, unit, expiration_date } = req.body;
      if (!name) {
        return res.status(400).send('Medicine name is required.');
      }

      await Medicine.create({
        name: name.trim(),
        category: category ? category.trim() : null,
        stock_quantity: parseInt(stock_quantity, 10) || 0,
        unit: unit ? unit.trim() : 'tablets',
        expiration_date: expiration_date || null
      });

      res.redirect('/medicines?msg=New+medicine+added+successfully');
    } catch (error) {
      console.error('Error adding medicine:', error);
      res.status(500).send('Server error adding medicine to inventory.');
    }
  },

  // POST /medicines/:id/adjust
  async adjustStock(req, res) {
    try {
      const { id } = req.params;
      const { amount, action } = req.body;
      const parsedAmount = parseInt(amount, 10) || 0;

      const change = action === 'dispense' ? -parsedAmount : parsedAmount;
      await Medicine.adjustStock(id, change);

      const notice = action === 'dispense' ? 'Medicine+dispensed+successfully' : 'Stock+replenished+successfully';
      res.redirect(`/medicines?msg=${notice}`);
    } catch (error) {
      console.error('Error updating stock:', error);
      res.status(500).send('Server error adjusting stock quantity.');
    }
  }
};

module.exports = medicineController;
