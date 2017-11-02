var express = require('express');
var router = express.Router();
var overpass = require('../query-overpass');

function makeQuery(llat, llng, ulat, ulng) {
    
    var query =                    `[out:json];node(${llat},${llng},${ulat},${ulng})`;
    query +=             `[amenity=parking];out;way(${llat},${llng},${ulat},${ulng})`;
    query += `[amenity=parking];out center;relation(${llat},${llng},${ulat},${ulng})`;
    query += `[amenity=parking];out center;`;

    return query;

}

router.get('/', function (req, res, next) {

	var ulng = parseFloat(req.query.lng_upper);
    var ulat = parseFloat(req.query.lat_upper);
	var llng = parseFloat(req.query.lng_lower);
    var llat = parseFloat(req.query.lat_lower);

    var query = makeQuery(llat, llng, ulat, ulng);

    overpass(query).then(results => {
        return res.json(results);
    }).catch(error => {
        return res.json(error);
    });

});

module.exports = router;