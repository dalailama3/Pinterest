'use strict';

var path = process.cwd();
var ImageHandler = require(path + '/app/controllers/imageHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var imageHandler = new ImageHandler();

	app.route('/')
		.get(function (req, res) {
			if (req.user) {
				res.render('index.ejs', {
					user: req.user.twitter
				});
			} else {
				res.render('index.ejs')
			}

		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.twitter);
		});

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/images')
		.get(imageHandler.getAllImages)
		.post(isLoggedIn, imageHandler.addImage)

	app.route('/myimages')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/myimages.html')
		});

	app.get('/images/:userId', imageHandler.getUserImages)

	app.route('/images/:id')
		.delete(imageHandler.deleteImage)

	app.get('/images/:id/likes', isLoggedIn, imageHandler.getLikes)
	app.get('/images/:id/addLike', isLoggedIn, imageHandler.addLike)
	app.get('/images/:id/removeLike', isLoggedIn, imageHandler.removeLike)

};
