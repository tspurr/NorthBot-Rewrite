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
const {defaultGuild: defaults} = require("../../config");

const Guild = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildName: {
        type: String,
        default: defaults.guildName
    }, // Guild name so user can tell what database they are in
    /*guildID: {
        type: String,
        default: defaults.guildID
    },*/
    guildOwnerID: {
        type: String,
        default: defaults.guildOwnerID
    }, // For easy reference later on
    guildOwnerTag: {
        type: String,
        default: defaults.guildOwnerTag
    },
    staffRoles: [{role: String}],   // Want to list for access to website and such
    modChat: {
        type: String,
        default: defaults.modChat
    }, // A channel for bot reporting commands and stuff
    streamChannel: {
        type: String,
        default: defaults.streamChannel
    }, // Channel to announce streams in
    numMembers: {
        type: Number,
        default: defaults.numMembers
    }, // Number of members in the guild
    memberRole: {
        type: String,
        default: defaults.memberRole
    }, // The base member role if set by the owner/admin
    defaultRole: {
        type: Boolean,
        default: defaults.defaultRole
    }, // Turns default role on/off
    reputation: {
        type: Boolean,
        default:  defaults.reputation
    }, // Turns the reputation system on and off
    profanity: {
        type: Boolean,
        default: defaults.profanity
    }, // Turns the profanity filter on messages on and off
    announceStreams: {
        type: Boolean,
        default: defaults.announceStreams
    } // Turn the stream announcements on and of
});

module.exports = mongoose.model('Guild', Guild, 'guildInfo');