const { Client, GuildMember } = require("discord.js");
const AutoRole = require("../../models/AutoRole");

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 */
module.exports = async (client, member) => {
    try {
        if (!member.guild) return;

        const autoRole = await AutoRole.findOne({ guildId: member.guild.id });
        if (!autoRole) return;

        await member.roles.add(autoRole.roleId);

    } catch (error) {
        console.log("Error giving role automatically:")
        console.log(error);
    }
}