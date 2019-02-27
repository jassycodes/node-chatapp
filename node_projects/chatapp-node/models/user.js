// access db
var db = require('../db/config/config');

module.exports = {
	// Return a new promise for finding a single user
	findOne: function (user) {
		console.log("findOne")
		console.log(user)
		console.log(user.username)
		return new Promise ((resolve, reject) => {
			const queryString = 'SELECT * FROM Users WHERE username=?';
			db.query(queryString, [user.username], (err, res) => {
				console.log(err, res, "hello");
				if (err) { 
					// send back an error
					console.log("found an error");
					reject(err);
				} else {
					if (res.length) {
						// found a user with username that was passed in
						resolve(res[0]);
					} else {
						// did not find a user with username
						resolve(false);
					}
				}
			});
		});
	},
}