'use strict';

var Agenda = require('agenda');
var config = require('./config/environment');

//Define New Agenda
var agenda = new Agenda({
	db: {
		address: config.mongo.uri,
		collection: "agenda",
		options: {
            autoReconnect: true
		}
	}
});

module.exports.agenda = agenda;