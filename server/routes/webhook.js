var express = require('express');
var router = express.Router();
var gad = require('node-auto-deploy');

router.post('/',function(req,res){
	console.log('Recieved new pull request... TODO: Secret key!');
	
	var secret = "gAOP847Z7IEyEyeQuCDQ";
	console.log('Recieved new pull request...');
	console.log(req);
	if(req.body.secret == secret){
		console.log('Deploying....');
		gad.deploy();
	} else {
		console.error('Secret key not valid! Deploying anyway.');
		gad.deploy();
	}
});

module.exports = router;
