const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    if (req.headers['content-type'] === 'application/json') {
      return res.status(401).json({ error: 'Not authenticated' });
    } else {
      return res.redirect('/login');
    }
  }
  next();
};

module.exports = withAuth;
