const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
	timestamp: {
		type: Number
	},
	coords: {
		latitude: Number,
		longitude: Number,
		altitude: Number,
		accuracy: Number,
		heading: Number,
		speed: Number
	}
});

const trackSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	name: {
		type: String,
		default: ''
	},
	locations: [ pointSchema ]
});

mongoose.model('Track', trackSchema);
