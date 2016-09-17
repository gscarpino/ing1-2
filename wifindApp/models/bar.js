var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BarSchema = new Schema({
	nombre: String,
	descripcion: String,
	ubicacion: {
		latitud: Number,
		longitud: Number
	},
	direccion: String
});

var Bar = mongoose.model('Bar', BarSchema);
module.exports = Bar;
