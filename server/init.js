var {OSMCached, OSMParking, VegvesenParking} = require('./models/caching.js');

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

module.exports = function cacheVegvesenet(){
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