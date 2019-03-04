// access db
var db = require('../db/config/config');
var dateTime = require('node-datetime');
var dt = dateTime.create();
var formattedDT = dt.format('Y-m-d H:M:S');
var formattedDate = dt.format('m-d-Y');
var formattedTime = dt.format('H:M:S');

module.exports = {
    test: function() {
        console.log("test");
    },
    // Return a new promise for finding a single user
    findOne: function(user) {
        this.test();
        this.loadAllMessages();
        console.log("findOne")
        console.log(user)
        console.log(user.username)
        var username = user.username;
        return new Promise((resolve, reject) => {
            const queryString = 'SELECT * FROM Users WHERE username=?';
            db.query(queryString, username, (err, res) => {
                // console.log(err, res, "hello");
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
            const queryString = "INSERT INTO Users(username,password) VALUES ('" + user.username + "',  '" + user.pword + "')";
            //  const queryString = 'INSERT INTO Users(username, password) VALUES ('" + user.username + "', '" + user.pword + "')';
            db.query(queryString, (err, res) => {
                // console.log(err, res, "hello");
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
    },
    sendMessage: function(formData, user) {
        console.log("User.js -> sendMessage");
        console.log("there is a user: ");
        console.log("user: " + user);
        console.log("message: " + formData.message);
        message = formData.message;
        console.log(this.findOne(user));
        var foundUser = this.findOne(user);
        var currentUserID = 0;

        return new Promise((resolve, reject) => {
            console.log("User.js -> Promise -> (1) sendMessage");
            // const queryString = "INSERT INTO Chats(sender_username,message) VALUES ('"+user.username+"',  '"+user.message+"')";
            // const queryString = 'INSERT INTO Users(username, password) VALUES ('" + user.username + "', '" + user.pword + "')';
            const queryString = 'SELECT id FROM Users WHERE username=?';
            console.log(queryString);

            db.query(queryString, user, (err, res) => {
                // console.log(err, res, "queryString");

                if (err) {
                    // send back an error
                    console.log("found an error");
                    reject(err);
                } else {
                    if (res.length) {
                        // found a user with username that was passed in
                        console.log("username found");
                        console.log(res);
                        console.log(typeof res);
                        console.log(res[0].id);
                        currentUserID = res[0].id;
                        return new Promise((resolve, reject) => {
                            console.log("User.js -> Promise -> (2) sendMessage");
                            const queryString = "INSERT INTO Chats(sender_ID, sender_username,message,DATESTAMP,TIMESTAMP) VALUES ( '" + currentUserID + "', '" + user + "',  '" + message + "', '" + formattedDate + "', '" + formattedTime + "')";
                            //   const queryString = 'INSERT INTO Users(username, password) VALUES ('" + user.username + "', '" + user.pword + "')';
                            // const queryString = 'SELECT * FROM Users WHERE username="jassy"';
                            db.query(queryString, (err, res) => {
                                console.log(err, res, "queryString");
                                if (err) {
                                    // send back an error
                                    console.log("found an error");
                                    reject(err);
                                } else {
                                    if (res.length) {
                                        // found a user with username that was passed in
                                        
                                        resolve(false);
                                        console.log(res);
                                        // console.log("res.length");

                                    } else {
                                        console.log("Succesfully inserted into Chats Table");
                                        resolve(res[0]);
                                    }
                                }
                            });
                        });
                        // resolve(false);

                    } else {
                        // did not find a user with username
                        resolve(res[0]);
                    }
                }
            });
        });
    },
    loadAllMessages: function() {
        console.log("loadAllMessages")
        // console.log(user)
        // console.log(this.findOne(user));
        // var foundUser = this.findOne(user);

        return new Promise((resolve, reject) => {
            const queryString = 'SELECT * FROM Chats';
            db.query(queryString, (err, res) => {
                console.log(res[0].message, "loadAllMessages res");

                // for 
                if (err) {
                    // send back an error
                    console.log("found an error");
                    reject(err);
                } else {
                    if (res.length) {
                        // found a user with username that was passed in
                        console.log("res.length");
                        resolve(res);
                    } else {
                        // did not find a user with username
                        console.log("ELSEEEE");
                        resolve(false);
                    }
                }
            });
        });
        // if(foundUser){
        //     const queryString = 'SELECT * FROM Chats';
        //     db.query(queryString, (err, res) => {
        //         if (err) {
        //                 // send back an error
        //                 console.log("found an error");
        //                 reject(err);
        //         } else {
        //             console.log("res: ", res[0]);
        //         }

        //     // return new Promise((resolve, reject) => {
        //     //     const queryString = 'SELECT * FROM Chats';
        //     //     db.query(queryString, (err, res) => {
        //     //         // console.log(err, res, "hello");
        //     //         if (err) {
        //     //             // send back an error
        //     //             console.log("found an error");
        //     //             reject(err);
        //     //         } else {
        //     //             if (res.length) {
        //     //                 // found a user with username that was passed in
        //     //                 console.log("res.length");
        //     //                 resolve(res[0]);
        //     //             } else {
        //     //                 // did not find a user with username
        //     //                 console.log("ELSE");
        //     //                 resolve(false);
        //     //             }
        //     //         }
        //     //     });
        //     // });
        //     });
        // }
    },

}