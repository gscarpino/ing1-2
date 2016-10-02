var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PuntajesSchema = new Schema({
    wifi: Number,
    enchufes: Number,
    precios: Number
});

var ObjectId = mongoose.SchemaTypes.ObjectId;

var CriticaSchema = new Schema({
	barId: ObjectId,
	comentario: String,
    puntajes: [PuntajesSchema]
});

var Critica = mongoose.model('Critica', CriticaSchema);
module.exports = Critica;
