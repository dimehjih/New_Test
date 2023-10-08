const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SEKEY || 'your-secret-key';

const authMiddleware =  async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send('Access denied');

  jwt.verify(token.split(' ')[1], jwtSecretKey, async (err, user) => {
    
    if (err) {
      return res.status(403).send('Forbidden');
    }

    req.user = user;
    next();
  });

}

module.exports = {authMiddleware};
