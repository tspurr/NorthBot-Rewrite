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
const GuildModel = require("../database/models/Guild");
const config = require("../config.json");
const MongoClient = require("mongodb").MongoClient;
const mongo = new MongoClient(config.MongoURL, {useNewUrlParser: true});

module.exports.run = async(client, message, args) => {
    let guildID = message.guild.id; //Getting guild ID

    MongoClient.connect(config.MongoURL, async function(err, db) {
        if (err)
            throw err;
        let dataBase = db.db(guildID);
        dbo.createCollection("customers", async function(err, res) {
            if (err)
                throw err;
            console.log("Collection created!");
            db.close();
        });
    });

    const doc = new GuildModel({id: guildID});
    await doc.save();
    message.reply('Made New Document');
}