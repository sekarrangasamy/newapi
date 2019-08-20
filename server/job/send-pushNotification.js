'use strict';

import util from 'util';
import config from '../config/environment';
import _ from 'lodash';
// import uuid from 'node-uuid';
// import moment from 'moment';

var serviceAccountFile = '../config/' + config.pushNotification.fcm_js_file;
var serviceAccount = require(serviceAccountFile);

var admin = require('firebase-admin');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: config.pushNotification.fcm_db_url
});

var sendRsp = require('../utils/response').sendRsp;
var log = require('../libs/log')(module);

export function FCMPushNotification(rspTokens, payload, fcmCB) {
	admin.messaging().sendToDevice(rspTokens, payload)
		.then(function(response) {
			console.log('Successfully sent message:', JSON.stringify(response));
			fcmCB(null, response);
		})
		.catch(function(error) {
			console.log('Error sending message:', JSON.stringify(error));
			fcmCB(error, null);
		});
}