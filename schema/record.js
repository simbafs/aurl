const mongoose = require('mongoose');

var RecordSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	ip: {
		type: String,
		required: true
	}
});

module.exports = {
	RecordModule: mongoose.model('Record', RecordSchema)
}
