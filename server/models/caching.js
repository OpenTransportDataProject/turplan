var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const VegvesenParkingSchema = new Schema({
    provider: String,
    organizationNumber: String,
    geometry: {
        type: { type: String, default: 'Point'},
        coordinates: [Number]
    },
    name: String,
    address: String,
    postnumber: String,
    postplace: String,
    numberOfFeePlaces: Number,
    numberOfFreePlaces: Number,
    numberOfChargingPlaces: Number,
    numberOfHandicapped: Number,
    links: [
        {
            rel: String,
            href: String
        }
    ],
    source: String
});

VegvesenParkingSchema.index({geometry: '2dsphere'});
const VegvesenParking = mongoose.model('vegvesenetParking', VegvesenParkingSchema);
module.exports.VegvesenParking = VegvesenParking;

const OSMParkingSchema = new Schema({
    geometry: {
        type: { type: String, default: 'Point'},
        coordinates: [Number]
    },
    amnety: String,
    access: String,
    id: String
});

OSMParkingSchema.index({geometry: '2dsphere'});
const OSMParking = mongoose.model('osmParking', OSMParkingSchema);
module.exports.OSMParking = OSMParking;

/* Used for determining which places is already cached */
const OSMCachedSchema = new Schema({
    geometry: {
		type: { type: String, default: "Point" },
		coordinates: { type: [ Number ], required: true }
    }
});

OSMCachedSchema.index({geometry: '2dsphere'});
const OSMCached = mongoose.model('osmParkingArea', OSMCachedSchema);
module.exports.OSMCached = OSMCached;

