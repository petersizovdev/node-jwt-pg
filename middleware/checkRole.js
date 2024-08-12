const checkRole = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).send('Access denied not an admin');
  }
  next();
};

module.exports = checkRole;