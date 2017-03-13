'use strict';

var Users = require('../models/users.js');
var path = require('path')

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

	this.getLikes = function (req, res) {
		Users
			.findOne({ 'images': { $elemMatch: { '_id': req.params.id }}}, { 'images.$.likes': 1})
			.exec(function (err, result) {
				if (err) { throw err; }

				res.send(result.images)
			})
	}

	this.addLike = function (req, res) {
		var userId = req.user.twitter.id;
		Users
			.findOneAndUpdate({ 'images': { $elemMatch: { '_id': req.params.id }}}, {
				$push: { 'images.$.likes': userId }
			})
			.exec(function (err, result) {
					if (err) { throw err; }
					res.send(result)
			})
	}

	this.removeLike = function (req, res) {
		Users
			.findOneAndUpdate({ 'images': { $elemMatch: { '_id': req.params.id }}}, {
				$pull: { 'images.$.likes': req.user.twitter.id }
			})
			.exec(function (err, result) {
					if (err) { throw err; }
					res.send(result)
			})

	}

}

module.exports = ImagesHandler;
