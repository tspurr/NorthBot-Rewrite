const mongoose = require('mongoose'); //Importing the mongoose library
const config = require("../config.json"); //Grabbing the config file so we don't have private things on github

module.exports = {
    init: () => {
        const DBOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        mongoose.connect(config.MongoURL, DBOptions); //Connecting to the server
        mongoose.set("useFindAndModify", false);
        mongoose.promise = global.Promise;

        //When the bot successfully connects to the server
        mongoose.connection.on('connected', () => {
            console.log(`Mongoose Connected Successful!`)
        });

        //If the bot encounters any error trying to connect to the mongoDB
        mongoose.connection.on('err', err => {
            console.log(`Mongoose Connection Error: \n${err.stack}`);
        });

        mongoose.connection.on('disconnect', () => {
            console.log(`Mongoose Disconnected!`)
        });
    }
};