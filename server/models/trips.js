var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TripSchema = new Schema({
	counties: { type: [ String ], default: [] },
	municipalies: { type: [ String ], default: [] },
	seasons: { type: [ Number ], default: [] },
	lastEdited: { type: Date, default: Date.now },
	url: { type: String, default: ""},
	distance: { type: Number , default: -1 },
	description: { type: String, default: ""},
	duration: { type: Number , default: -1 }, // In hours
	tags: { type: [ String ], default: [] },
	geometry: {
		type: { type: String, default: "LineString" },
		coordinates: { type: [ [ Number ] ], required: true }
	},
	images: { type: [ String ], default: [] },
	name: { type: String, required: true },
	classification: { type: Number, required: true }, // Easy, Medium, Hard etc.
	ntID: { type: String, required: true }, // used for checking against nasjonal turbase
    provider: { type: String, default: "" }
});

const Trip = mongoose.model('trip', TripSchema);

//TripSchema.index({geometry: '2dsphere'});

module.exports = Trip;
