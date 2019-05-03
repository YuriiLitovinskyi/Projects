const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let hasp = new Schema({
	dateCreated: {type: Date, default: Date.now},
	company: {
		name: String,
		city: String,
		phone: String
	},
	serial: {type: String, required: true},
	soft: {type: String, required: true},
	numberOfKeys: {type: Number, default: 2}
});

module.exports = mongoose.model("Hasp", hasp);