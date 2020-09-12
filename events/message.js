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
const config = require("../config.json");
const PREFIX = config.prefix;

module.exports = async (client, message) => {
  //If the messages is from the bot return
  if (message.author.bot)
    return;
  //If the messages is a DM return
  if(message.channel.type === "dm")
    return;

  //TODO make it so the member gets an update to their document in the server

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
      return message.reply("Command does not exist!");

  }
};