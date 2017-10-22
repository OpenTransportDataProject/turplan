import React, {Component} from 'react';
import axios from "axios";

let coordinates1 = [
    [
        10.3030374768782,
        63.1979270275093
    ],
    [
        10.3032091382617,
        63.1997846592407
    ],
    [
        10.3032091382617,
        63.2013325946106
    ],
    [
        10.3045824293297,
        63.2029578376467
    ],
    [
        10.3080156569997,
        63.2031126179375
    ],
    [
        10.3129938371212,
        63.2064401939566
    ],
    [
        10.3164270647912,
        63.2067497164583
    ],
    [
        10.3205469379952,
        63.2079103963503
    ],
    [
        10.3244951498165,
        63.2091484035809
    ],
    [
        10.329130007171,
        63.210773207678
    ],
    [
        10.335996462511,
        63.2164206262746
    ],
    [
        10.339429690181,
        63.2186638153286
    ],
    [
        10.341489626783,
        63.222144281475
    ],
    [
        10.3459528227539,
        63.226784251391
    ],
    [
        10.3493860504239,
        63.2302637401667
    ],
    [
        10.3524759553269,
        63.2342066544859
    ],
    [
        10.3555658602299,
        63.2379171413132
    ],
    [
        10.3591707492834,
        63.242786432278
    ],
    [
        10.3629472997204,
        63.2457230681575
    ],
    [
        10.3643205907884,
        63.247345817805
    ],
    [
        10.3670671729243,
        63.2490457434626
    ],
    [
        10.3718736916623,
        63.2522907782543
    ],
    [
        10.3706720619778,
        63.2539904128626
    ],
    [
        10.3680971412253,
        63.2556126980303
    ],
    [
        10.3624323155699,
        63.2570031556275
    ],
    [
        10.3595140720504,
        63.2580073333577
    ],
    [
        10.3555658602299,
        63.2587797539982
    ],
    [
        10.3550508760794,
        63.2611741266482
    ],
    [
        10.3567674899144,
        63.2624098541839
    ],
    [
        10.3581407809824,
        63.2641861198351
    ],
    [
        10.3602007175844,
        63.2665028237985
    ],
    [
        10.3620889928029,
        63.2688193417981
    ],
    [
        10.3631189611039,
        63.2707496314167
    ],
    [
        10.3665521887738,
        63.2739922272877
    ],
    [
        10.3706720619778,
        63.2763081440804
    ],
    [
        10.3737619668808,
        63.2804763258049
    ],
    [
        10.3758219034828,
        63.2827145451786
    ],
    [
        10.3782251628518,
        63.284335216291
    ],
    [
        10.3821733746732,
        63.2873447924327
    ],
    [
        10.3859499251102,
        63.2891966831621
    ],
    [
        10.3948832089261,
        63.3031560986491
    ],
    [
        10.4003763731989,
        63.3079372828465
    ],
    [
        10.4017496642669,
        63.3111756987669
    ],
    [
        10.4068995057719,
        63.3145679344841
    ],
    [
        10.4041529236359,
        63.3179597706701
    ]
]

let coordinates2 = [
    [
        5.27134249279738,
        60.2125205565519
    ],
    [
        5.27022669380464,
        60.2140981742576
    ],
    [
        5.26936838688714,
        60.2152919966709
    ],
    [
        5.26885340273664,
        60.2165284097843
    ],
    [
        5.26963277083725,
        60.2178039855527
    ],
    [
        5.2692036173785,
        60.2188058333569
    ],
    [
        5.26740117285167,
        60.219232142287
    ],
    [
        5.26448292933219,
        60.2189550421127
    ],
    [
        5.26263756945957,
        60.2183795188839
    ],
    [
        5.26122136304561,
        60.218677939597
    ],
    [
        5.26130719373736,
        60.2194666098358
    ],
    [
        5.26169343185023,
        60.2202552611051
    ],
    [
        5.26259465411369,
        60.2208307514101
    ]
];


export class Hikes extends Component {

    constructor(props){
        super(props);

        
        // Binding the functions
        this.logMapBounds = this.logMapBounds.bind(this);
        this.getHikes = this.getHikes.bind(this);
        this.flipHikeCoordinates = this.flipHikeCoordinates.bind(this);
        
        
    }

    logMapBounds() {
        console.log(this.props.mapBounds);
    }
   
    

    async getHikes(){
        
            
            let upperLat = this.props.mapBounds.northEastLat;
            let upperLng = this.props.mapBounds.northEastLng;
            let lowerLat = this.props.mapBounds.southWestLat;
            let lowerLng = this.props.mapBounds.southWestLng;
    
            let url = "http://198.211.120.107:3001";
    
            //return axios.get('https://api.github.com/users/' + username + '/repos');
            // console.log(axios.get(`${url}/api/v1/trips?lat_lower=${lowerLat}&lat_upper=${upperLat}&lng_lower=${lowerLng}&lng_upper=${upperLng}`))
            
            //let result = await axios.get(`${url}/api/v1/trips?lat_lower=${lowerLat}&lat_upper=${upperLat}&lng_lower=${lowerLng}&lng_upper=${upperLng}`);
            //console.log(result);
            //return axios.get(`${url}/api/v1/trips?lat_lower=${lowerLat}&lat_upper=${upperLat}&lng_lower=${lowerLng}&lng_upper=${upperLng}`);
            
            

            let hikesCoordinates = this.flipHikeCoordinates(coordinates1);
            this.props.getHikesCoordinates(hikesCoordinates);
         


            hikesCoordinates = this.flipHikeCoordinates(coordinates2);
            this.props.getHikesCoordinates(hikesCoordinates);
            


            console.log("Hikes - getHikes()");

    }


    flipHikeCoordinates(hikeCoordinates) {

        /* The hike coordinates are formatted in a two dimensional array, where every inner array are an
            array with two elements; lng, lat. The order of these has to be flipped to the correct format
            for leaflet to make polyLines of them.   
        */

        
        let lengthOfOuterArray = hikeCoordinates.length;
        
        let flippedHikeCoordinates = hikeCoordinates;

    
        for(let i = 0; i < lengthOfOuterArray; i++){
            flippedHikeCoordinates[i] = flippedHikeCoordinates[i].reverse();
        }

        return flippedHikeCoordinates;

    }

   componentWillMount() {
  
        /*
        Need to use componentWillMount here because the component
        are not supposed to be re-rendered when called. 
        If this is done inside e.g componentWillUpdate,
        this will cause an infinite recursion because we are setting
        a state in the parent.
        */
       this.getHikes();
   }


    render(){
        return(
            <div>
             
            </div> 
        )
    }

}
