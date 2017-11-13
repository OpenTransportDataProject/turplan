var osmtogeojson = require('osmtogeojson'),
    querystring = require('querystring'),
    request = require('request'),
    concat = require('concat-stream'),
    JSONStream = require('JSONStream'),
    xmldom = require('xmldom');


module.exports.transformParkingData = function (data) {

    let parkingLots = data;

    let parkingLotsTransformed = [];
    for(let parking of parkingLots) {
        parkingLotsTransformed.push({
            geometry: parking.geometry,
            source: "osm",
            amenity: parking.properties.tags.amenity,
            access: parking.properties.tags.access,
            id: parking.id
        });
    }
    return parkingLotsTransformed;

}

/*

This is an heavily edited version of the overpass
npm thingy. What this does is wait for the stream
to finish and then return the resulting assay as
a promise.

*/
module.exports.get = function(query, options, transform = null) {
    
    var contentType;
    options = options || {};

    var reqOptions = {    
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({ data: query })
    };

    var toGeoJSON = function(data) {
        var geojson;
        geojson = osmtogeojson(data, {
            flatProperties: options.flatProperties || false
        });
        return geojson;
    };

    var promise = new Promise(function(resolve, reject) {

        var r = request.post(options.overpassUrl || 'http://overpass-api.de/api/interpreter', reqOptions);

        r.on('response', function(response) {
            if (response.statusCode != 200) {
                r.abort();
                reject({error: response.statusCode});
            }
            var dataArray = [];
            response.pipe(JSONStream.parse())
                .on('data', function(data) {
                    var geo = toGeoJSON(data);
                    for(let item of geo.features) {
                        dataArray.push(item);
                    }
                })
                .on('error', function(error) {
                    console.error(error);
                    reject(error);
                })
                .on('end', function(args) {
                    resolve(dataArray);
                });
        });
    });

    return promise.then(data => {
        let transformed = data;
        if(transform) {
            transformed = transform(data);
        }
        return transformed;
    }).catch(err => {
        return err;
    });

};
