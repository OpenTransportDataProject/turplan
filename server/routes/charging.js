var fetch = require('node-fetch');
var FormData = require('form-data');
var express = require('express');
var router = express.Router();
var apiKey = require ('./apiKey');

// This one transforms the parameters to an url to make it easier to use
// in a get-request.
function serialize(obj) {
  var str = [];
  for(var p in obj)
     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  return str.join("&");
}

// Makes a route for charging address
router.get('/', function(req, res, next) {

// Example Query parameters from nobil
var parameters = {
    'apikey': apiKey.nobilApiKey, 'apiversion': '3',
    'action': "search",
    'type': 'rectangle',
    'northeast': '(59.943921193288915, 10.826683044433594)',
    'southwest': '(59.883683240905256, 10.650901794433594)',
    'existingids': '189,195,199,89,48',
  };

// Execute Query
fetch('http://nobil.no/api/server/search.php?'+serialize(parameters),{
  method:'GET',
    }).then(
      response=>response.json() //converts to json
    ).then(
      json=>console.log(json)
    );
});

module.exports = router;
