const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js")

module.exports = {
    deleted: true,
    name: 'ban',
    description: '(wip) bans a member!!!!',
    // devOnly: Boolean,
    // testOnly: Boolean,
    options: [
        {
            name: 'target-user',
            description: 'The user to ban',
            required: true,
            type: ApplicationCommandOptionType.Mentionable
        },
        {
            name: 'reason',
            description: 'The reason for the ban',
            type: ApplicationCommandOptionType.String
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: (client, interaction) => {
        interaction.reply('insert ban here..')
    }
}