'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	twitter: {
		id: String,
		displayName: String,
		username: String,
		token: String,
		profilePic: String
	},

	images: [{
		url: String,
		description: String,
		likes: [String]
	}]
});

module.exports = mongoose.model('User', User);
