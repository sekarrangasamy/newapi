/**
 * Main application file
 */

import express from 'express';
import mongoose from 'mongoose';
import config from './config/environment';
import http from 'http';
import _ from 'lodash';
import expressConfig from './config/express';
import registerRoutes from './routes';
var agenda = require('./agenda').agenda;
var sendEmailNotifications = require('./job/email');

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error(`MongoDB connection error: ${err}`);
	process.exit(-1); // eslint-disable-line no-process-exit
});

// Setup server
app.set('agenda', agenda);


	// Start server
function startServer() {
	app.angularFullstack = server.listen(config.port, config.ip, function() {
		console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
	});
}


setImmediate(startServer);

// Expose app
exports = module.exports = app;