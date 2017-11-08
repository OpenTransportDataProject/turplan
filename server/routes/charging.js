var FormData = require('form-data');
var express = require('express');
var router = express.Router();
var apiKey = require('./apiKey');
var request = require('request');


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
            description: chargingStation.csmd.Description_of_location
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
	reqURL += `apikey=${apiKey.nobilApiKey}&apiversion=3&action=search&type=rectangle&`;
	reqURL += `northeast=(${ulat}%2C%20${ulng})&southwest=(${llat}%2C%20${llng})`;
	
	request(reqURL, function (error, response, body) {
		if (error) {
			return res.json({
				error: error
			});
		} else if (!(/^2/.test('' + response.statusCode))) {
			return res.json({
				error: error,
				response: response,
				statusCode: response.statusCode,
				url: reqURL
			});
		} else if(JSON.parse(body).error != null) {
			return res.json({
				error: body
			});
		} else {
			return res.json(parseResults(JSON.parse(body).chargerstations));
		}
	});
});

module.exports = router;
