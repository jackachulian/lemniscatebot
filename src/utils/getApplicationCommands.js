const { Client } = require("discord.js");


/**
 * 
 * @param {Client} client 
 * @param {*} guildId 
 * @returns 
 */
module.exports = async (client, guildId) => {
    let applicationCommands

    if (guildId) {
        const guild = await client.guilds.fetch(guildId);
        applicationCommands = guild.commands;
    } else {
        applicationCommands = await client.application.commands;
    }

    await applicationCommands.fetch();
    return applicationCommands;
}