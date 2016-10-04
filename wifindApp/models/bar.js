var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PuntajesSchema = new Schema({
    wifi: Number,
    enchufes: Number,
    precios: Number,
    higiene: Number
});

var CriticaSchema = new Schema({
	comentario: String,
    puntajes: PuntajesSchema
});

var BarSchema = new Schema({
	nombre: String,
	descripcion: String,
	ubicacion: {
		latitude: Number,
		longitude: Number
	},
	direccion: String,
    wifi: { type: Boolean, default: true },
    enchufes: { type: Boolean, default: true },
    criticas: [CriticaSchema]
});

var Bar = mongoose.model('Bar', BarSchema);
module.exports = Bar;
