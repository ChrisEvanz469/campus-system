require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const db = require('./config/db');

const { requireAuth } = require('./middleware/auth');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const patientRoutes = require('./routes/patientRoutes');
const medicineRoutes = require('./routes/medicineRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'campus_clinic_super_secret_key_2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 8 // 8 hours session expiration
    }
  })
);

// Global view variables (pass currentUser to all EJS templates)
app.use((req, res, next) => {
  res.locals.currentUser = req.session ? req.session.user : null;
  next();
});

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Public Authentication Routes
app.use('/', authRoutes);

// Protected Feature Routes (Require Login)
app.use('/dashboard', requireAuth, dashboardRoutes);
app.use('/patients', requireAuth, patientRoutes);
app.use('/medicines', requireAuth, medicineRoutes);

// Root redirect
app.get('/', (req, res) => {
  if (req.session && req.session.user) {
    return res.redirect('/dashboard');
  }
  res.redirect('/login');
});

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found.');
});

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
