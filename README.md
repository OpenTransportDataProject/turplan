# tdt4290

## Installation

The prerequisites to be installed:
* yarn (`brew install yarn` / `apt-get install yarn`)

Install project dependencies with:

In client and server

```
yarn
```

### Api Key
This application uses data from Nova transnova. To access the API you will have to create a file named apiKey.js under server/routes and add a valid apiKey there. 

### Testing
https://facebook.github.io/jest/docs/en/snapshot-testing.html

To run tests 
```
yarn test
```

### APIs

Get trips/hikes in an area
* Method: GET
* Route: /api/v1/trips?lat_lower={value}&lat_upper={value}&lng_lower={value}&lng_upper={value}
* lat_lower: lower latitude coordinate
* lat_upper: upper latitude coordinate
* lng_lower: lower longitude coordinate
* lng_upper: upper longitude coordinate
* Description: Returns all trips in the db within a given area.
* Status: Implemented

Get charging stations in an area
* Method: GET
* Route: /api/v1/charging?lat_lower={value}&lat_upper={value}&lng_lower={value}&lng_upper={value}
* lat_lower: lower latitude coordinate
* lat_upper: upper latitude coordinate
* lng_lower: lower longitude coordinate
* lng_upper: upper longitude coordinate
* Description: Returns all charging stations within a given area.
* Status: Implemented

Get parking in an area
* Method: GET
* Route: /api/v1/parking?lat_lower={value}&lat_upper={value}&lng_lower={value}&lng_upper={value}
* lat_lower: lower latitude coordinate
* lat_upper: upper latitude coordinate
* lng_lower: lower longitude coordinate
* lng_upper: upper longitude coordinate
* Description: Returns all parking lots within a given area.
* Status: Implemented

### Docker



