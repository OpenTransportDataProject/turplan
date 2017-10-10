var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var assert = require('assert');
var mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/trips';

router.get('/get-data', function(req, res, next) {
	var result = [];
	mongodb.connect(url, function(err, db) {
		assert.equal(null, err);

		// pointer to the db results
		var cursor = db.collection('trips').find();
		cursor.forEach(function(doc, err) {
			assert.equal(null, err);
			result.push(doc);
		}, function(){
			db.close();
			res.json(result);
		});
	});
});

router.post('/insert', function(req, res, next) {
	var item = {
		author: req.body.author,
		comment: req.body.comment
	};
	mongodb.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('trips').insertOne(item, function(err, result){
			assert.equal(null, err);
			console.log('Item inserted.');
			db.close();
			res.json({response: 'Item inserted.'});
		});
	});
});

module.exports = router;