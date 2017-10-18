import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { User } from './user';
import { NTTrip, NTTripDetails, TripSchema } from './trip';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

	constructor(
		private http: Http
	) { }

	getAll(): Observable<Array<User>> {
		return this.http
			.get('https://jsonplaceholder.typicode.com/users')
			.map((response: Response) => response.json())
			.share();
	}

	url = 'http://api.nasjonalturbase.no';
	current = 0;
	limit = 50;
	rest = 0;
	currentArray: NTTrip[] = [];

	async getNext() : Promise<TripSchema | any> {
		if(this.currentArray.length <= 0) {
			console.log("getting new stuff");
			this.currentArray = await this.http.get(`${this.url}/turer?skip=${this.current}&limit=${this.limit}`)
					.map((response: Response) => response.json())
					.toPromise()
					.then(res => {
				var array = [];
				for(var trip of res.documents) {
					array.push(<NTTrip> trip);
				}
				return array;
			});
		}
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

	backendUrl = 'http://198.211.120.107:3001';
// 				  http://198.211.120.107:3001/api/v1/trips

	async placeOnServer(trip: TripSchema){
		return await this.http.post(`${this.backendUrl}/api/v1/trips`, trip).toPromise().then(res => {
			console.log("Success!");
			return res;
		}).catch(err => {
			console.error("Error:");
			console.error(err);
			return err;
		})
	}

}
