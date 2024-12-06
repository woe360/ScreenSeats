export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (req.user.userType !== role) {
      return res.status(403).json({ message: 'Not authorized for this role' });
    }

    next();
  };
}; 