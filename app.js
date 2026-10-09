require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./config/db');

const dashboardRoutes = require('./routes/dashboardRoutes');
const patientRoutes = require('./routes/patientRoutes');
const medicineRoutes = require('./routes/medicineRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Root redirect to dashboard
app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

// Feature Routes
app.use('/dashboard', dashboardRoutes);
app.use('/patients', patientRoutes);
app.use('/medicines', medicineRoutes);

// Verify database connection and launch server
async function startServer() {
  try {
    const connection = await db.getConnection();
    console.log('Database connected successfully to campus_clinic_db.');
    connection.release();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
}

startServer();
