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
module.exports.run = async(client, message, args) => {
    //Checks if the user has permission to run command
    if(!message.member.hasPermission(`KICK_MEMBERS`))
        message.channel.send("You do not have permissions to run this command");

    //If the members has permission to use this command
    else {
        //Get the members ID from the members being mentioned
        let memberID = args.substring(args.indexOf("!") + 1, args.indexOf(">"));
        let reason = "";

        //Check to see if there was a reason applied to the ban
        if (!(args.indexOf(">") === args.length))
            reason = args.substring(args.indexOf(">") + 2, args.length);

        //Try to ban the members
        try {
            //The function to ban a members from the server
            let kickedMember = await message.guild.members.kick(memberID);

            //If the members was banned?
            if (kickedMember)
                // Check to see if there was a reason
                if (reason === "")
                    console.log(`${kickedMember.id} was banned from the server!`);
                    // TODO make this log to MODCHAT as well
                else
                    console.log(`${kickedMember.id} was banned from the server for: ${reason}`);
                    //TODO make this log to MODCHAT as well
        }
            //If members doesn't ban error is logged
        catch (err) {
            console.log(err);
        }

    }

}