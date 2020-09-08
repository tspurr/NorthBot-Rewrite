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

    // Getting guild information
    client.getGuild = async (guild) => {
        let guildID = guild.id;
        let guildDB = mongoose.connection.useDb(guildID);
        let data = await guildDB.Guild.findOne({_id: guild.id});

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

        if (typeof data !== 'object') data = {};
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
        let guildDB = mongoose.connection.useDb(guildID);

        let defaults = Object.assign({_id: mongoose.Types.ObjectId()}, client.config.defaultGuild)
        let merged = Object.assign(defaults, settings);

        const newGuild = await guildDB.model(Guild, merged);
        return newGuild.save()
            .then(g => {
                console.log(`Default settings saved for guild "${g.guildName}" (${g._id})`)
        })
    };

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