
export class TripSchema {
	counties: [ String ];
	municipalies: [ String ];
	seasons: [ Number ];
	lastEdited: Date;
	url: String;
	distance: Number;
	description: String;
	duration: Number;
	tags: [ String ];
	geometry: {
		type: String,
		coordinates: [ [ Number ] ]
	};
	images: [ String ];
	name: String;
    classification: Number;
    ntID: String; // used for checking against nasjonal turbase
    provider: String;
};

export class NTTrip {
    _id: String;
    tilbyder: String;
    entret: String;
    status: String;
    tags: [ String ];
    lisens: String;
    navn: String;
}

export class NTTripDetails {
    _id: String;
    gradering: String;
    tidsbruk: {
        normal: {
            timer: Number;
            minutter: Number;
        }
    };
    url: String;
    tilbyder: String;
    navngiving: String;
    retning: String;
    kommuner: [ String ];
    adkomst: String;
    endret: Date;
    områder: [ String ];
    fylker: [ String ];
    checksum: String;
    status: String;
    distanse: Number;
    passer_for: [ String ];
    tags: [ String ];
    bilder: [ String ];
    lisens: String;
    navn: String;
    sesong: [ Number ];
    geojson: {
        type: String;
        coordinates: [ [ Number ] ]
    };
    beskrivelse: String;
}
