var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BarSchema = new Schema({
	nombre: String,
	descripcion: String,
	ubicacion: {
		latitude: Number,
		longitude: Number
	},
	direccion: String
});

var Bar = mongoose.model('Bar', BarSchema);
module.exports = Bar;
