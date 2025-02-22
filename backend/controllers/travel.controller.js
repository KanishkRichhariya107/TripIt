const User = require('../models/user.model');

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { name: '', email: '', password: '' };

  // Duplicate email error
  if (err.code === 11000) {
    errors.email = 'That email is already registered';
    return errors;
  }

  // Validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.signup_get = (req, res) => {
  res.render('signup'); // Renders views/signup.ejs
};

module.exports.login_get = (req, res) => {
  res.render('login'); // Renders views/login.ejs
};

module.exports.signup_post = async (req, res) => {
  // Ensure the form sends a "name" field along with email and password
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send('User login');
};
