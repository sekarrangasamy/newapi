import fs from 'fs';
import moment from 'moment';
var config = require('../config/environment');
import s3upload from '../utils/s3.js';
// var async = require('async');



const fileUpload = (req, res, resource, data) => {

	return new Promise((resolve, reject) => {
		// if (req.files && req.files.file) {
		if (req.files) {
			//console.log("req.files", req.files, data);
			// setImmediate(function() {
				let file = req.files[data];
				//console.log("file..........", file);
				fs.readFile(file.path, (err, data) => {
					if (err) {
						console.log('data buffer error', err);
					} else {
						//console.log("data", data);
						var params = {
							Bucket: config.s3FileUpload.bucket,
							Key: resource + '/' + moment().valueOf() + file.originalFilename,
							Body: data
						};
						//console.log("params", params);
						s3upload(params, function(err, resp) {
							if (err) {
								console.log("error on uploading image", err);
								reject({});
							} else {
								console.log("response", resp);
								resolve(resp)
							}
						})
					}
				});
			// });
		} else {
			if (req.body.icon == null && !req.body.icon) {
				req.body.icon = [];
			}
			resolve(null);
		}
	});
}


exports.fileUpload = fileUpload;