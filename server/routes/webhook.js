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
		setTimeout(function(){
			gad.deploy()
		},duration);
		res.send('Success!');
	} else {
		console.error('Secret key not valid! Deploying anyway.');
		setTimeout(function(){
			gad.deploy()
		},duration);
		res.send('Error: Secret key invalid!');
	}
});

module.exports = router;
