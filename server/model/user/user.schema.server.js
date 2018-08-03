var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	dob: String,
	gender: String,
	country: String,
	state: String,
	city: String,
	phone: String,
	email: String,
	isAdmin: {type:Boolean, default: false },
	dateCreated: {type: Date, default: Date.now}
}, {collection: 'user'})

module.exports = UserSchema;



