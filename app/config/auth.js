'use strict';

module.exports = {
	'githubAuth': {
		'clientID': process.env.GITHUB_KEY,
		'clientSecret': process.env.GITHUB_SECRET,
		'callbackURL': 'https://memeterest.herokuapp.com/' + 'auth/github/callback'
	},

	'twitterAuth' : {
        'consumerKey'       : process.env.TWITTER_KEY,
        'consumerSecret'    : process.env.TWITTER_SECRET,
        'callbackURL'       : 'https://memeterest.herokuapp.com/auth/twitter/callback'
    }
};
