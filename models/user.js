var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	nombre: String,
	email: String,
	posicion : positionSchema
});

module.exports = users....;
