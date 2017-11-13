var express = require('express');
var router = express.Router();
var overpass = require('../query-overpass');
var request = require('request-promise');
var assert = require('assert');

var {OSMCached, OSMParking, VegvesenParking} = require('../models/caching.js');

function makeQuery(llat, llng, ulat, ulng) {
    
    var query =                    `[out:json];node(${llat},${llng},${ulat},${ulng})`;
    query +=             `[amenity=parking];out;way(${llat},${llng},${ulat},${ulng})`;
    query += `[amenity=parking];out center;relation(${llat},${llng},${ulat},${ulng})`;
    query += `[amenity=parking];out center;`;

    return query;

}

function osmQuery(ulat, ulng, llat, llng) {
    var query = makeQuery(llat, llng, ulat, ulng);
    return overpass(query);
}

function getParking(ulat, ulng, llat, llng) {

    let upperQueryLat = Math.ceil(ulat * 10) / 10;
    let lowerQueryLat = Math.floor(llat * 10) / 10;
    let upperQueryLng = Math.ceil(ulng * 10) / 10;
    let lowerQueryLng = Math.floor(llng * 10) / 10;

    let promises = [];
    for(let lat = lowerQueryLat; lat < upperQueryLat; lat += 0.1) {
        for(let lng = lowerQueryLng; lng < upperQueryLng; lng += 0.1) {
            console.log(`(${lat}, ${lng})`);
            let polygon = [
                [ lng, lat ],
                [ lng, lat + 0.1 ],
                [ lng + 0.1, lat + 0.1 ],
                [ lng + 0.1, lat ],
                [ lng, lat ]
            ];
            let geomQuery = {
                type: "Polygon",
                coordinates: [polygon]
            };
            let res = OSMCached.where('geometry').intersects().geometry(geomQuery).exec().then(results => {
                if(results == null || results.length <= 0) {
                    console.log("Data is not cached!");
                    return osmQuery(upperQueryLat, upperQueryLng, lowerQueryLat, lowerQueryLng).then(data => {
                        let sc = new OSMCached({geometry: {type: "Point", coordinates: [ lng + 0.05, lat + 0.05 ]}});
                        sc.save().then(saves => {
                            console.log("Success!")
                            return data;
                        }).catch(error => {
                            console.error(error);
                            return error;
                        });
                        for(let d of data) {
                            let p = new OSMParking(d);
                            p.save();
                        }
                        console.log(p);
                        return d;
                    });
                } else {
                    // there should in theory only be one result...
                    console.log("Data is cached!");
                    OSMParking.where('geometry').intersects().geometry(geomQuery).exec().then(r => {
                        console.log(r);
                        return r;
                    });
                    
                }
            });
            promises.push(res);
        }
    }
    return Promise.all(promises);
}

function getVegvesenetData(llat, llng, ulat, ulng) {
    return VegvesenParking.where('geometry').intersects().geometry({
        type: "Polygon",
        coordinates: [[
            [ llng, llat ],
            [ llng, ulat ],
            [ ulng, ulat ],
            [ ulng, llat ],
            [ llng, llat ]
        ]]
    }).exec().then(function(result) {
        return result;
    });
}

router.get('/', function (req, res, next) {

    var ulng = parseFloat(req.query.lng_upper);
    var ulat = parseFloat(req.query.lat_upper);
	var llng = parseFloat(req.query.lng_lower);
    var llat = parseFloat(req.query.lat_lower);
    
    /*
    getParking(ulat, ulng, llat, llng).then(results => {
        console.log(results);
        return res.json(results);
    }).catch(err => {
        console.error(err);
        return res.json({error: err});
    })*/

/*    ParkingArea.where('geometry').intersects().geometry({
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
	});*/

    var query = makeQuery(llat, llng, ulat, ulng);

    var results_1 = overpass.get(query, null, overpass.transformParkingData);
    var results_2 = getVegvesenetData(llat, llng, ulat, ulng);
    Promise.all([results_1, results_2]).then(r => {
        return [].concat.apply([], r);        
    }).then(results => {
        console.log(results);
        return res.json(results);
    })

});

module.exports = router;