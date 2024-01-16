const { Client, Interaction } = require("discord.js")

module.exports = {
    name: 'ping',
    description: 'Replies with the bot ping',
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
    callback: async (client, interaction) => {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const ping = message.createdTimestamp - interaction.createdTimestamp;

        interaction.editReply(`Pong! api latency: ${client.ws.ping}ms | client ping: ${ping}ms`)
    }
}