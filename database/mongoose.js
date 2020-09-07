const mongoose = require('mongoose'); //Importing the mongoose library
const config = require("../config.json"); //Grabbing the config file so we don't have private things on github

module.exports = {
    init: () => {
        const DBOptions = {
            useNewUrlParser: true,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE, //Max number of reconnects the bot can try
            reconnectInterval: 500, //Every 500ms the bot will try to reconnect
            poolSize: 5, //How many connections to the database the bot can have
            connectionTimeOutMS: 10000, //The connection to each data base will time out after 10 seconds
            family: 4 //Try using IPv6 and if fail ue IPV4
        };

        mongoose.connect(config.MongoURL, DBOptions); //Connecting to the server
        mongoose.set("useFindAndModify", false);
        mongoose.promise = global.Promise;

        //When the bot successfully connects to the server
        mongoose.connection.on('connected', () => {
            console.log(`Mongoose Connection Successful!`)
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