module.exports = {
    prefix: ".",
    owner: "218164992216793088",

    // The default guildInfo document for MongoDB
    defaultGuild: {
        _id: "",
        guildName: "",
        guildID: "",
        guildOwnerTag: "",
        guildOwnerID: "",
        staffRoles: "Administrator",
        modChat: "",
        streamChannel: "",
        numMembers: "",
        memberRole: "",
        defaultRole: false,
        reputation: false,
        profanity: true,
        announceStreams: false
    },

    // The default member document for MongoDB
    defaultMember: {
        _id: "",
        memberName: "",
        memberID: "",
        badMessageID: [],
        badMessage: [],
        warnings: 0,
        numMessages: 0,
        reputation: 0
    }
};