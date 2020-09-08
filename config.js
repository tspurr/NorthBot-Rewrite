module.exports = {
    prefix: ".",

    // The default guildInfo document for MongoDB
    defaultGuild: {
        _id: 1003,
        guildName: "",
        guildOwner: "",
        modRole: "Moderator",
        adminRole: "Administrator",
        modChat: "",
        streamChannel: "",
        numMembers: 0,
        memberRole: "",
        defaultRole: false,
        reputation: false,
        profanity: true,
        announceStreams: false
    }
};