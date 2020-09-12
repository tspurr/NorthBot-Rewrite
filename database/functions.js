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
const mongoose = require('mongoose');
const { Guild } = require('./models');

module.exports = client => {

    /*##########################################
    #                  Guild                   #
    ##########################################*/

    // Getting guild information
    client.getGuild = async (guild) => {
        let guildID = guild.id;
        let guildDB = mongoose.connection.useDb(guildID);
        let data = await guildDB.collection('guildInfo').findOne({_id: guild.id});

        // If there is a document
        if(data)
            return data;
        // If there is not a document return the default
        else
            return client.config.defaultGuild;
    };

    // Updating guild settings
    client.updateGuild = async (guild, settings) => {
        let data = await client.getGuild(guild);

        if (typeof data !== 'object')
            data = {};
        for (const key in settings) {
            if (settings.hasOwnProperty(key)) {
                if(data[key] !== settings[key])
                    data[key] = settings[key];
                else
                    return
            }
        }

        console.log(`Guild "${data.guildName}" (${data._id} updated settings ${Object.keys(settings)}`);
        return await data.updateOne(settings);
    };

    // When adding a guild to documents
    client.createGuild = async (settings) => {
        let guildID = settings._id;
        let guildDB = mongoose.connection.useDb(guildID); //Connect to the specific guild database

        let defaults = Object.assign({_id: guildID}, client.config.defaultGuild)
        let merged = Object.assign(defaults, settings);

        guildDB.collection('guildInfo').insertOne(merged); // Don't need the ./Models folder, but I'll leave for now
    };

    /*##########################################
    #                 Member                   #
    ##########################################*/

    // Getting a specific member document from memberInfo when called
    client.getMember = async (member) => {

    };

    // When a member of the guild updates their info the relevant info in the database will be updated too
    client.updateMember = async (member, settings) => {

    };

    // When a new member joins the guild a new document is created for them
    client.createMember = async (settings, guild) => {
        let memberID = settings._id;
        let guildDB = mongoose.connection.useDb(guild.id);

        let defaults = Object.assign({_id: memberID}, client.config.defaultMember)
        let merged = Object.assign(defaults, settings);

        guildDB.collection('memberInfo').insertOne(merged);
    };

    /*##########################################
    #                 Channel                  #
    ##########################################*/

    // Getting a specific channel from the collection channelData, if none return default
    client.getChannel = async (channel) => {

    };

    //When a channel is updated in a server the document will be updated too
    client.updateChannel = async (channel, settings) => {

    };

    //When a channel is added to the server the default document will be create in channelData collection
    client.createChannel = async (settings, guild) => {

    };

    /*##########################################
    #                  Misc                    #
    ##########################################*/

    // Cleaning and hiding things for live editing if I want it
    client.clean = async (client, text) => {
        if (text && text.constructor.name === 'Promise')
            text = await text;
        if (typeof evaled !== 'string')
            text = require('util').inspect(text, {depth: 1});

        text = text
            .replace(/`/g, `'` + String.fromCharCode(8203))
            .replace(/@/g, `@` + String.fromCharCode(8203))
            .replace(client.token, 'token.replaced')

        return text;
    }
}