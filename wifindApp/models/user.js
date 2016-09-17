var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	nombre: String,
	email: String
});

module.exports = UserSchema;
