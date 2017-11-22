var FormData = require('form-data');
var express = require('express');
var router = express.Router();
var request = require('request-promise');
var overpass = require('../query-overpass');

function distance(p1, p2){  // generally used geo measurement function
	
	var lat1 = p1[1];
	var lon1 = p1[0];
	var lat2 = p2[1];
	var lon2 = p2[0];

	var R = 6378.137; // Radius of earth in KM
	var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
	var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
	Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	return d * 1000; // meters
}

function transformChargingStations(data) {
	let res = [];
	for(let d of data) {
		let newItem = {
			geometry: d.geometry,
			id: d.id,
			name: '',
			address: {
				street: '',
				street_nr: ''
			},
			points: 1,
			description: '',
			source: 'osm'
		}
		res.push(newItem)
	}
	return {osm: res};
}

function combineNobilOSM(osm, nobil) {
	for (let osmItem of osm) {
		let discard = false;
		for(let nobilItem of nobil) {
			let dist = distance(nobilItem.geometry.coordinates, osmItem.geometry.coordinates);
			if(dist < 50) {
				discard = true;
				break;
			}
		}
		if(!discard) {
			nobil.push(osmItem);
		}
	}
	return nobil;
}

function combine(source) {
	
	let s0 = source[0];
	let s1 = source[1];
	let osm = s0.osm ? s0.osm : s1.osm;
	let nobil = s0.nobil ? s0.nobil : s1.nobil;

	if(osm != null) {
		nobil = combineNobilOSM(osm, nobil);
	}

	return nobil;

	//return [].concat.apply([], [osm, nobil]);

	//return source;-
}

function makeQuery(llat, llng, ulat, ulng) {
    
    var query =                    `[out:json];node(${llat},${llng},${ulat},${ulng})`;
    query +=             `[amenity=charging_station];out;way(${llat},${llng},${ulat},${ulng})`;
    query += `[amenity=charging_station];out center;relation(${llat},${llng},${ulat},${ulng})`;
    query += `[amenity=charging_station];out center;`;

    return query;

}

function positionToArray(str) {
	
	// (63.42182,10.43178) -> [ 10.43178, 63.42182 ]
	
	var res = /\((.*),(.*)\)/.exec(str);
	return [ parseFloat(res[2]), parseFloat(res[1]) ];

}

function parseResults(data) {
	var parsedResults = [];
    for(let chargingStation of data) {
        var item = {
            geometry: {
                coordinates: positionToArray(chargingStation.csmd.Position),
                type: 'Point'
            },
            id: chargingStation.csmd.id,
            name: chargingStation.csmd.name,
            address: {
                street: chargingStation.csmd.Street,
                street_nr: chargingStation.csmd.House_number,
            },
            points: chargingStation.csmd.Number_charging_points,
            description: chargingStation.csmd.Description_of_location,
            source: 'nobil'
        };
        parsedResults.push(item);
	}

    return parsedResults;
}

// Makes a route for charging address
router.get('/', function (req, res, next) {

	// no query parameters. Should probably just add a few or give an error or similar...
	if (!(req.query.lng_upper && req.query.lng_lower && req.query.lat_upper && req.query.lat_lower)) {
		// error
		return res.json({
			error: "Invalid parameters. Expected lng_upper, lng_lower, lat_upper and lat_lower."
		});
	}

	var ulng = parseFloat(req.query.lng_upper);
    var ulat = parseFloat(req.query.lat_upper);
	var llng = parseFloat(req.query.lng_lower);
    var llat = parseFloat(req.query.lat_lower);

	// Execute Query

	var reqURL = "http://nobil.no/api/server/search.php?";
	reqURL += `apikey=${process.env.NOBIL_KEY}&apiversion=3&action=search&type=rectangle&`;
	reqURL += `northeast=(${ulat}%2C%20${ulng})&southwest=(${llat}%2C%20${llng})`;


	var query = makeQuery(llat, llng, ulat, ulng);

	let results_1;
	if(distance([ulng, ulat], [llng, llat]) < 3000) {
		results_1 = overpass.get(query, null, transformChargingStations);
	} else {
		results_1 = Promise.resolve([]);
	}
	//let results_1 = Promise.resolve([]);
	let results_2 = request(reqURL).then(response => {
		response = JSON.parse(response);
		if(response.error) {
			return {nobil: []};
		} else {
			return {nobil: parseResults(response.chargerstations)};
		}
		
	}).catch(err => {
		console.error(err);
	});
	//let results_2 = Promise.resolve([]);
	Promise.all([results_1, results_2]).then(r => {
		let output = combine(r);
		return output;
	}).then(results => {
		return res.json(results);
	}).catch(err => {
		console.error(err);
		return err;
	})
});

module.exports = router;
