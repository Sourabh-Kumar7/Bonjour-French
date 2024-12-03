const loginService = require('../services/loginService.js');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await loginService.authenticateUser(username, password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const userResponse = {
        name: user.name,
        email: user.email,
        type: user.type,
    };
  
    res.json({ message: 'Login successful', user: userResponse });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
