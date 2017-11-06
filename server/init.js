var {OSMCached, OSMParking, VegvesenParking} = require('./models/caching.js');
var request = require('request-promise');

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

/*module.exports.cacheTrips = function(){

    let url = 'http://api.nasjonalturbase.no';
	let current = 0;
	let limit = 50;
	let rest = 0;
    let currentArray = [];
    let amount = 1000;
    let count = 0;

    while(count < amount) {
        
    }

    function getNext(){
        request(`${this.url}/turer?skip=${this.current}&limit=${this.limit}`).then(res => {
            var array = [];
            for(var serverTrip of JSON.parse(res).documents) {

                var newTrip = {};
                newTrip.counties = serverTrip.fylker;
                newTrip.municipalies = serverTrip.kommuner;
                newTrip.seasons = serverTrip.sesong;
                newTrip.classification = ["Enkel", "Middels", "Vanskelig"].indexOf(serverTrip.gradering);
                newTrip.description = serverTrip.beskrivelse;
                newTrip.distance = serverTrip.distanse;
                newTrip.duration = serverTrip.tidsbruk.normal.timer; // dager?
                newTrip.geometry = serverTrip.geojson;
                newTrip.images = serverTrip.bilder;
                newTrip.name = serverTrip.navn;
                newTrip.ntID = serverTrip._id;
                newTrip.tags = serverTrip.tags;
                newTrip.url = serverTrip.url;
                newTrip.lastEdited = serverTrip.endret;
                newTrip.provider = serverTrip.tilbyder;

            }
            while(array.length > 0) {

            }
        })
		var returnValue = this.currentArray.shift();

		var details = await this.http.get(`${this.url}/turer/${returnValue._id}`)
				.map((response: Response) => response.json())
				.toPromise()
				.then(res => {
			
			var serverTrip = <NTTripDetails>res;
			var newTrip: TripSchema = new TripSchema();
			
			newTrip.counties = serverTrip.fylker;
			newTrip.municipalies = serverTrip.kommuner;
			newTrip.seasons = serverTrip.sesong;
			newTrip.classification = ["Enkel", "Middels", "Vanskelig"].indexOf(<string>serverTrip.gradering);
			newTrip.description = serverTrip.beskrivelse;
			newTrip.distance = serverTrip.distanse;
			newTrip.duration = serverTrip.tidsbruk.normal.timer; // dager?
			newTrip.geometry = serverTrip.geojson;
			newTrip.images = serverTrip.bilder;
			newTrip.name = serverTrip.navn;
			newTrip.ntID = serverTrip._id;
			newTrip.tags = serverTrip.tags;
			newTrip.url = serverTrip.url;
			newTrip.lastEdited = serverTrip.endret;
			newTrip.provider = serverTrip.tilbyder;

			return newTrip;

		}).catch(err => {
			console.error(err);
			Promise.resolve({error: err, current: this.current, _id: returnValue._id});
		});

		this.current += 1;
		return Promise.resolve(details);
	}
}*/