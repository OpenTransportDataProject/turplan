var FormData = require('form-data');
var express = require('express');
var router = express.Router();
var apiKey = require('./apiKey');
var request = require('request');

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

	var reqURL = "http://nobil.no/api/server/search.php?"
	reqURL += `apikey=${apiKey.nobilApiKey}&apiversion=3&action=search&type=rectangle&northeast(${ulng}%2C%20${ulat})&southwest(${llng}%2C%20${llat})`;
	
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
		} else {
			return res.json(body);
		}
	});
});

module.exports = router;