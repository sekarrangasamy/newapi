'use strict';

import config from '../config/environment';
import fs from 'fs';
var AWS = require('aws-sdk');
var s3 = new AWS.S3({
	accessKeyId: config.s3FileUpload.keyId,
	secretAccessKey: config.s3FileUpload.secret,
	region: config.s3FileUpload.region
});

module.exports = function(params, cb) {
	// var options = {
	// 	partSize: 10 * 1024 * 1024,
	// 	queueSize: 1
	// };
	console.log("data", params);
	s3.upload(params, function(err, data) {
		if (err) {
			console.log("s3.upload err", err);
			cb(err, null);
		}
		if (data) {
			//console.log("data", data);
			//console.log("data", data.Location);
			cb(null, data.Location);
		}
	});
};

var s3delete = function s3delete(params, cb) {
	console.log("cominggggg",params)
	s3.deleteObjects(params, function(err, data) {
		if (err) {
			// console.log(err, err.stack); // an error occurred
			cb(err, null);
		}
		if (data) {
			console.log("Successfully removed from s3", data);
			cb(null, data);
			// console.log(data);           // successful response
		}
	});
}
module.exports.s3delete = s3delete;