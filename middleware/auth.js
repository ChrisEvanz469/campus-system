// Require logged-in session for private clinic routes
function requireAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.redirect('/login');
  }
  next();
}

// Restrict specific actions to authorized roles (e.g. ['admin', 'doctor'])
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.redirect('/login');
    }

    if (!allowedRoles.includes(req.session.user.role)) {
      return res.status(403).send('Access Forbidden: Insufficient permissions for this action.');
    }

    next();
  };
}

module.exports = { requireAuth, requireRole };
