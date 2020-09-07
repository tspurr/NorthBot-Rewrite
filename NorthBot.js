/*
The MIT License (MIT)

Copyright (c) 2020 Tyler Spurr

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
 */
const path = require("path")
const Discord = require("discord.js");  //Imports the discord.js package
const fs = require("fs").promises;
const config = require("./config.json");  //Loads the config file for the bot
const PREFIX = config.prefix
const TOKEN = config.TOKEN
const client = new Discord.Client();  //Initiates the discord bot

client.commands = new Map();
client.login(TOKEN);

client.on("message", message => {
    //If the messages is from the bot return
    if (message.author.bot)
        return;
    //If the messages is a DM return
    if(message.channel.type === "dm")
        return;

    //If the messages is a command needing to be run
    if (message.content.startsWith(PREFIX)) {
        // Getting the command name from the messages
        let cmdName = message.content.substring(message.content.indexOf(PREFIX) + 1).split(new RegExp(/\s+/)).shift();

        //Getting the command args, but not parsing them yet
        let cmdArgs = message.content.substring(message.content.indexOf(" ") + 1)

        //If the command exists then we pass
        if(client.commands.get(cmdName)) {
            client.commands.get(cmdName).run(client, message, cmdArgs);
        }
        else
            message.channel.send("Command does not exist!");

    }

});


  /*#####################################################
  #                 Command Handler                     #
  #####################################################*/
(async function registerCommands(dir = "commands"){
    //reads directory/file
    let files = await fs.readdir(path.join(__dirname, dir));

    //Loop through each file in dir
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));

        //If the file is a directory
        if (stat.isDirectory())
            await registerCommands(path.join(dir, file));
        else {
            if(file.endsWith(".js")) {
                let cmdName = file.substring(0, file.indexOf(".js"));
                let cmdModule = require(path.join(__dirname, dir, file));
                client.commands.set(cmdName, cmdModule);
            }
        }


    }
})();

  /*#####################################################
  #                   Event Handler                     #
  #####################################################*/
(async function registerEvents(dir = "events"){
    //reads directory/file
    let files = await fs.readdir(path.join(__dirname, dir));

    //Loop through each file in dir
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));

        //If the file is a directory
        if (stat.isDirectory())
            await registerEvents(path.join(dir, file));

        else {
            if(file.endsWith(".js")) {
                let eventName = file.substring(0, file.indexOf(".js"));
                let eventModule = require(path.join(__dirname, dir, file));

                //bind the function listener for later use
                //Pass in client for later use in the listener
                client.on(eventName, eventModule.bind(null, client));
            }
        }


    }
})();