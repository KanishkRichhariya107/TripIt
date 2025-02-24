const User = require('../models/user.model');

// Utility to handle errors from Mongoose operations
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
	// Render the signup page (views/signup.ejs)
	res.render('signup');
};

module.exports.login_get = (req, res) => {
	// Render the login page (views/login.ejs)
	res.render('login');
};

module.exports.signup_post = async (req, res) => {
	// Extract fields from the request body
	const { name, email, password } = req.body;
	try {
		// Create a new user document
		const user = await User.create({ name, email, password });
		// Redirect to the frontend home after signup
		res.status(201).redirect("http://localhost:5173");
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.login_post = async (req, res) => {
	const { email, password } = req.body;
	try {
		console.log(email, password);
		// Redirect to the frontend home after login
		res.status(200).redirect("http://localhost:5173");
	} catch(err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};
