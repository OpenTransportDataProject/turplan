var express = require('express');
var router = express.Router();
var assert = require('assert');
var cors = require('cors');

var Trip = require('../models/trips.js');

router.get('/', function(req, res, next) {

    // no query parameters. Should probably just add a few or give an error or similar...
    if(!(req.query.lng_upper && req.query.lng_lower && req.query.lat_upper && req.query.lat_lower)) {
    	Trip.find(function(err, result){
			if(err) {
				console.error(err);
				return res.json(err);
			}
	        return res.json(result);
	    }).catch(next);
	    return;
    }

	var ulng = parseFloat(req.query.lng_upper);
    var ulat = parseFloat(req.query.lat_upper);
	var llng = parseFloat(req.query.lng_lower);
    var llat = parseFloat(req.query.lat_lower);

    if(ulng == 0 || ulat == 0 || llng == 0 || llat == 0) {
    	return res.json({error: "Coordinates was zero."});
    }

	Trip.where('geometry').intersects().geometry({
		type: "Polygon",
	    coordinates: [[
	        [ llng, llat ],
	        [ llng, ulat ],
	        [ ulng, ulat ],
	        [ ulng, llat ],
	        [ llng, llat ]
	    ]]
	}).exec().then(function(result) {
		return res.json(result);
	});
	
}); 

router.post('/', function(req, res, next) {
	var trip = new Trip(req.body);
	Trip.findOne({'ntID': trip.ntID}, function(err, retTrip) {
		if(!retTrip) {
			return trip.save().then(function() {
				return res.json(trip);
			});
		} else {
			return res.json({error: "Trip already in database."})
		}
	});
});

// Put request. Not a priority right now.
/*
router.put('/:uid', function(req, res, next) {
	var objID = req.params.uid;
	Trip.findById(req.params.id, function(err, result) {
		if(err) {
			console.error(err);
			return res.json(err);
		}
		result.modified = req.body;
	});
});
*/

router.delete('/:uid', function(req, res, next) {
	var objID = req.params.uid;
	Trip.find({_id: objID}).remove(function(err, result) {
		if(err) {
			console.error(err);
			return res.json(err);
		}
		return res.json(result);
	}).catch(next);
});

// For deleting all items. Requires a key. Will crash server :D
router.delete('/', function(req, res, next) {
	if(req.body.secret === 'fif493hb8e') {
		Trip.remove(function(err, result) {
			if(err) {
				console.error(err);
				return res.json(err);
			}
			return res.json(res);
		}).catch(next);
	} else {
		return res.json({response: "invalid key"});
	}
});

module.exports = router;
