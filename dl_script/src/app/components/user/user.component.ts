import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { User } from "./user";
import { TripSchema } from "./trip";
import { Http } from "@angular/http";

@Component({
    selector: "app-users",
    template: require("./user.html"),
    providers: [UserService]
})
export class UserComponent implements OnInit {

    private trips: Array<TripSchema> = [];

    constructor(
        private UserService: UserService,
        private http: Http
    ) { }

    ngOnInit() {
        
    }

    running: boolean = false;

    sleep(ms: Number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    onClick(){
        this.running = !this.running;
        if(this.running) {
            this.startDL();
        }
    }
    
    async startDL(){
        while(this.running) {
            var newTrip = await this.UserService.getNext();
            if (newTrip instanceof TripSchema){
                this.trips.push(newTrip);
            }
            else{
                console.error(newTrip);
            }
            await this.sleep(100);
        }
    }

    async send(){
        while(this.trips.length > 0) {
            var trip = this.trips.shift();
            var res = await this.UserService.placeOnServer(trip);
        }
    }

}