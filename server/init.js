var {OSMCached, OSMParking, VegvesenParking} = require('./models/caching.js');
var request = require('request-promise');
var Trip = require('./models/trips')

function transformVegvesenetData(data) {
    let out = [];
    for(let item of data) {
        if(!item.aktivVersjon) {
            console.error(item)
            continue;
        }
        let newItem = {
            provider: item.parkeringstilbyderNavn,
            organizationNumber: item.parkeringstilbyderOrganisasjonsnummer,
            geometry: {
                type: 'Point',
                coordinates: [item.lengdegrad, item.breddegrad]
            },
            name: item.aktivVersjon.navn,
            address: item.aktivVersjon.adresse,
            postnumber: item.aktivVersjon.postnummer,
            postplace: item.aktivVersjon.poststed,
            numberOfFeePlaces: item.aktivVersjon.antallAvgiftsbelagtePlasser,
            numberOfFreePlaces: item.aktivVersjon.antallAvgiftsfriePlasser,
            numberOfChargingPlaces: item.aktivVersjon.antallLadeplasser,
            numberOfHandicapped: item.aktivVersjon.antallForflytningshemmede,
            links: item.aktivVersjon.links,
            source: "vegvesenet"
        };
        out.push(newItem);
    }
    return out;
}

module.exports.cacheVegvesenet = function cacheVegvesenet(){
    VegvesenParking.count(function (err, count) {
        if (!err && count === 0) {
            console.log('Caching vegvesenet!');
            return request("https://www.vegvesen.no/ws/no/vegvesen/veg/parkeringsomraade/parkeringsregisteret/v1/parkeringsomraade?datafelter=alle").then(data => {
                data = JSON.parse(data);
                data = transformVegvesenetData(data);
                let promises = [];
                for(let item of data) {
                    let newItem = new VegvesenParking(item);
                    promises.push(newItem.save().then(res => {
                        console.log('saved');
                        return res;
                    }).catch(error => {
                        console.error(error);
                        return error;
                    }));
                }
                console.log('Vegvesenet cached!');
                return Promise.all(promises).then(returnFunc);
            }).catch(error => {
                console.error(error);
                return error;
            });
        }
    });
}

module.exports.cacheTrips = function(){

    var start = function(current, limit){
        let url = 'http://api.nasjonalturbase.no';
        
        request.get(`${url}/turer?skip=${current}&limit=${limit}`).then(res => {
            res = JSON.parse(res);
            for(let item of res.documents) {
                request.get(`${url}/turer/${item._id}`).then(serverTrip => {
                    serverTrip = JSON.parse(serverTrip);
                    var newTrip = {
                        counties: serverTrip.fylker,
                        municipalies: serverTrip.kommuner,
                        seasons: serverTrip.sesong,
                        classification: ["Enkel", "Middels", "Vanskelig"].indexOf(serverTrip.gradering),
                        description: serverTrip.beskrivelse,
                        distance: serverTrip.distanse,
                        duration: serverTrip.tidsbruk.normal.timer, // dager?
                        geometry: serverTrip.geojson,
                        images: serverTrip.bilder,
                        name: serverTrip.navn,
                        ntID: serverTrip._id,
                        tags: serverTrip.tags,
                        url: serverTrip.url,
                        lastEdited: serverTrip.endret,
                        provider: serverTrip.tilbyder
                    };
                    var s = new Trip(newTrip);
                    s.save().then(res => {

                    }).catch(err => {
                        console.error(err);
                    });
                }).catch(err => {
                    console.error(err.message);
                });
            }
        }).catch(err => {
            console.error(err.message);
        });
    }

    Trip.remove(function(err, result) {
        if(err) {
            console.error(err.message);
            return err;
        }
        start(0, 100);
        return result;
    }).catch(err => {
        console.error(err.message);
        return err;
    });
	
}