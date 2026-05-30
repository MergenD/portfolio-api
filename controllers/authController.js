const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { username, password } = req.body;

  if (username === 'mergen' && password === '05.06.01.Md') {
    const token = jwt.sign(
      { username: 'mergen' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '36h' }
    );

    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

module.exports = {
  login,
};
