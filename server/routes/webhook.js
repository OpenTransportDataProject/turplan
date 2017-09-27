var express = require('express');
var router = express.Router();
var gad = require('node-auto-deploy');

var duration = 5000;

router.post('/',function(req,res){
	console.log('Recieved new pull request... TODO: Secret key!');
	
	var secret = "gAOP847Z7IEyEyeQuCDQ";
	console.log('Recieved new pull request...');
	console.log(req);
	if(req.body.secret == secret){
		console.log('Deploying....');
		setInterval(function(){
			gad.deploy()
		},duration);
	} else {
		console.error('Secret key not valid! Deploying anyway.');
		setInterval(function(){
			gad.deploy()
		},duration);
	}
});

module.exports = router;
