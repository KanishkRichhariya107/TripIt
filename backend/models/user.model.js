const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter a name']
	},
	email: {
		type: String,
		required: [true, 'Please enter an email'],
		validate: [validator.isEmail, 'Please enter a valid email']
	},
	password: {
		type: String,
		required: [true, 'Please enter a password']
	}
}, { timestamps: true });

// Pre-save middleware: hash password before saving the user document
userSchema.pre('save', async function(next) {
	console.log('User about to be created and saved:', this);
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Post-save middleware: log the saved user document
userSchema.post('save', function(doc, next) {
	console.log('New user was created and saved:', doc);
	next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
