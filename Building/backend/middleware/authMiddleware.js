// ── isAuthenticated (JSON API) ────────────────────────────────────────────────
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) return next();
  return res.status(401).json({ error: 'Not authenticated' });
};

// ── isAdminAuthenticated (JSON API) ──────────────────────────────────────────
const isAdminAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  if (req.session.userRole !== 'admin') {
    return res.status(403).json({ error: 'Forbidden — admin only' });
  }
  return next();
};

// ── isGuest ───────────────────────────────────────────────────────────────────
const isGuest = (req, res, next) => {
  if (req.session && req.session.userId) {
    return res.status(400).json({ error: 'Already authenticated' });
  }
  next();
};

module.exports = { isAuthenticated, isAdminAuthenticated, isGuest };