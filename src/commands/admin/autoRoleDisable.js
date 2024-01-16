const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js")
const AutoRole = require('../../models/AutoRole')

module.exports = {
    name: 'autorole-disable',
    description: 'Remove the auto-role for this server.',
    options: [],
    // devOnly: Boolean,
    // testOnly: Boolean,
    // deleted: Boolean // will remove this command from servers
    permissionsRequired: [PermissionFlagsBits.ManageRoles],
    botPermissions: [PermissionFlagsBits.ManageRoles],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        if (!interaction.inGuild()) {
            interaction.reply("You can only run this command inside a server.")
            return;
        }

        await interaction.deferReply();
        
        exists = await AutoRole.exists({ guildId: interaction.guild.id });
        
        if (!exists) {
            interaction.editReply("Auto role has not been configured. Use '/autorole-configure' to set it up.");
            return;
        }

        await AutoRole.findOneAndDelete({ guildId: interaction.guild.id });
        interaction.editReply("Auto role has been disabled for this server. Use '/autorole-configure' to set it up again.")
    }
}