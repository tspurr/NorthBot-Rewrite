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
const { Schema, model } = require("mongoose")

const Guild = new Schema({
    _id: Number,        // There shouldn't be another file in this collection
    guildName: String,  // Guild name so user can tell what database they are in
    guildOwner: String, // For easy reference later on
    staffRoles: [{role: String}],   // Want to list for access to website and such
    modChat: String,    // A channel for bot reporting commands and stuff
    streamChannel: String,  // Channel to announce streams in
    numMembers: Number, // Number of members in the guild
    memberRole: String, // The base member role if set by the owner/admin

    defaultRole: Boolean,   // Turns default role on/off
    reputation: Boolean,    // Turns the reputation system on and off
    profanity: Boolean, // Turns the profanity filter on messages on and off
    announceStreams: Boolean  // Turn the stream announcements on and of
});

module.exports = model('Guild', Guild, 'guildInfo');