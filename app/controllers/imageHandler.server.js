'use strict';

var Users = require('../models/users.js');

function ImagesHandler () {

	this.getAllImages = function (req, res) {
		Users
			.find({})
			.exec(function (err, result) {
				if (err) { throw err; }

				res.send(result)
			})
	}

	this.addImage = function (req, res) {
		var image = req.body;
		console.log(image)
		Users
			.findOneAndUpdate( { 'twitter.id': req.user.twitter.id }, { $push: { 'images': image } }, { 'new': true })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.send(result.images)
			})
	}

	this.myImages = function (req, res) {
		Users
			.findOne({ 'twitter.id': req.user.twitter.id })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.send(result.images)
			})
	}

	this.deleteImage = function (req, res) {
		Users
			.findOneAndUpdate({ 'images': { $elemMatch: { '_id': req.params.id }}}, {
				$pull: { 'images': { '_id': req.params.id }}
			})
			.exec(function (err, result) {
				res.send(result)
			})
	}

}

module.exports = ImagesHandler;
