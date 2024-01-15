const { Client, Interaction } = require("discord.js")

module.exports = {
    name: 'ping',
    description: 'Pong!',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean // will remove this command from servers
    // permissionsRequired: [PermissionFlagsBits.Administrator],


    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: (client, interaction) => {
        interaction.reply(`Pong! ${client.ws.ping}ms`)
    }
}