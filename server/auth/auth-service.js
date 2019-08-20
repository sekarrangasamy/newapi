import mongoose from 'mongoose';
import passport from 'passport';
import config from '../config/environment';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import SuperAdminModel from '../api/sa-auth/auth/superAdminModel';
import util from 'util';
import _ from 'lodash';
var sendRsp = require('../utils/response').sendRsp;

var validateJwt = expressJwt({
	secret: config.secrets.accessToken
});

var globalValidateJwt = expressJwt({
	secret: config.secrets.globalAccessToken
});


function isSuperAdmin() {
	return compose()
		.use(function(req, res, next) {
			//console.log("response", res.statusCode);
			if (req.query && req.query.hasOwnProperty('access_token')) {
				req.headers.authorization = 'Bearer ' + req.query.access_token;
			}
			validateJwt(req, res, next);
		})
		.use(function(req, res, next) {
			SuperAdminModel.findById(req.user.userId, '-tokens -salt -hashed_password')
				.exec(function(err, superAdmin) {		
					if (err) {
						console.log('errorFindingInSuperAdmin', err)
						return next(err);
					}
					if (superAdmin) {
						req.user = superAdmin;
						next();
					} else {
						return res.send(401);
					}
				})
		});
}

function isValid() {
	return compose()
		.use(function(req, res, next) {
			var auth = req.headers['authorization'];
			var temp = auth.split(' ');
			console.log("code", temp)

			var code = temp[0]
			console.log("code", code)
			if (code == 'Bearer') {
				if (req.query && req.query.hasOwnProperty('access_token')) {
					req.headers.authorization = 'Bearer ' + req.query.access_token;
				}
				validateJwt(req, res, next);
				return compose()
					.use(function(req, res, next) {
						SuperAdminModel.findById(req.user.userId, '-tokens -salt -hashed_password')
							.exec(function(err, admin) {
								if (err) {
									return next(err);
								} else if (admin) {
									req.user = admin;
									next();
								} else {
									return res.send(403);

								}
							});
					});
			} else {
				var auth = req.headers['authorization'];
				if (!auth) {
					sendRsp(res, 403, "Authorization header not found");
					return;
				} else {
					var temp = auth.split(' ');
					var code = temp[1]
					var buffer = new Buffer(temp[1], 'base64');
					var plain_auth = buffer.toString();
					var credentials = plain_auth.split(':');
					var clientId = credentials[0];
					var clientSecret = credentials[1];
					if (clientId === config.base_auth.id && clientSecret === config.base_auth.secret) {
						next();
					} else {
						res.send(403);
					}
				}

			}

		})
}



exports.isValid = isValid;
exports.isSuperAdmin = isSuperAdmin;