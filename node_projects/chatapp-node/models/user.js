// access db
var db = require('../db/config/config');

module.exports = {
    // Return a new promise for finding a single user
    findOne: function(user) {
        console.log("findOne")
        console.log(user)
        console.log(user.username)
        return new Promise((resolve, reject) => {
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
    registerNewUser: function(user) {
        console.log("User.js -> registerNewUser");
        console.log(user);
        //const queryString = 'INSERT INTO Users(username, password) VALUES (' + user.username + ', ' + user.pword + ')';
        return new Promise((resolve, reject) => {
           const queryString = "INSERT INTO Users(username,password) VALUES ('"+user.username+"',  '"+user.pword+"')";
           //	const queryString = 'INSERT INTO Users(username, password) VALUES ('" + user.username + "', '" + user.pword + "')';
            db.query(queryString, (err, res) => {
                console.log(err, res, "hello");
                if (err) {
                    // send back an error
                    console.log("found an error");
                    reject(err);
                } else {
                    if (res.length) {
                        // found a user with username that was passed in
                        // console.log("Succesfully inserted");
                        resolve(false);
                        console.log(res);
                        
                    } else {
                        // did not find a user with username
                        // console.log("username taken");
                        console.log("Succesfully inserted");
                        resolve(res[0]);
                    }
                }
            });
        });






        // return new Promise((resolve, reject) => {
            
        //     const queryString = 'SELECT * FROM Users WHERE username=?';
        //     console.log("queryString ", queryString);
        //     //		DatabaseConnection.query('INSERT INTO Air_Pollution_Record (Air_Pollution_Reading) VALUES ('+Pollution_Reading+')');

        //     //INSERT INTO Users (username, password) VALUES("jassy", "polygloter");
        //     db.query(queryString, (err, res) => {
        //         console.log(err, res, "registerNewUser");
        //     });
        // });
    },
}