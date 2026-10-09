const bcrypt = require('bcryptjs');
const db = require('../config/db');

const authController = {
  // GET /login
  renderLogin(req, res) {
    if (req.session && req.session.user) {
      return res.redirect('/dashboard');
    }
    res.render('auth/login', { error: null });
  },

  // POST /login
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).render('auth/login', { error: 'Please provide both username and password.' });
      }

      const [rows] = await db.query('SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1', [
        username.trim(),
        username.trim()
      ]);

      const user = rows[0];
      if (!user) {
        return res.status(401).render('auth/login', { error: 'Invalid username or password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).render('auth/login', { error: 'Invalid username or password.' });
      }

      // Establish session
      req.session.user = {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        role: user.role,
        email: user.email
      };

      res.redirect('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).render('auth/login', { error: 'Server authentication failure. Please try again.' });
    }
  },

  // GET /logout
  logout(req, res) {
    req.session.destroy(err => {
      if (err) {
        console.error('Logout error:', err);
      }
      res.redirect('/login');
    });
  }
};

module.exports = authController;
