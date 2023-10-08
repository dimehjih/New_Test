const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SEKEY || 'your-secret-key';

exports.home = async (req, res) => {
    res.status(200).json({ error: 'Loading......' });
}

// Register a new user
exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      status: 'active',
      date_created: new Date(),
      date_updated: new Date(),
    });

    await newUser.save();

    // Create and sign a JWT token
    const token = jwt.sign({ _id: newUser._id }, jwtSecretKey, {
      expiresIn: '24h', // You can adjust the expiration time
    });

    res.json({status: true, message: "Registration successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Account Not Found' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ _id: user._id }, jwtSecretKey, {
      expiresIn: '24h', // You can adjust the expiration time
    });

    res.json({status: true, message: "Login Successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Login a user
exports.fetchUser = async (req, res) => {
  try {
    const user_id = req.user._id

    // Check if the email exists
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(401).json({ error: 'Account Not Found' });
    }

    res.json({status: true, message: "success", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }

}