var express = require('express');
var router = express.Router();
var gad = require('node-auto-deploy');

var duration = 1000;

router.post('/',function(req,res){
	var secret = "gAOP847Z7IEyEyeQuCDQ";
	console.log('Recieved new pull request...');
	if(req.body.secret == secret){
		setTimeout(function(){
			console.log('Deploying....');
			gad.deploy({ origin:"origin", branch:"dev" });
		},duration);
		res.send('Success!');
	} else {
		console.error('Secret key not valid! Deploying anyway.');
		setTimeout(function(){
			console.log('Deploying....');
			gad.deploy({ origin:"origin", branch:"dev" });
		},duration);
		res.send('Error: Secret key invalid!');
		console.log(req);
	}
});

module.exports = router;
