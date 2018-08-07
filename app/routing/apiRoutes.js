// dependencies
var path = require('path');
var friends = require('../data/friends.js');

// routes
module.exports = function(app) {
	
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	// new friend
	app.post('/api/friends', function(req, res) {
		var userInput = req.body;
		var userResponses = userInput.scores;
		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000; 

		// check friend list
		for (var i = 0; i < friends.length; i++) {
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}

			// set friend match
			if (diff < totalDifference) {
				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		friends.push(userInput);

		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};