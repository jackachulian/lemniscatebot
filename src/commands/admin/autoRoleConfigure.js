const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js")
const AutoRole = require('../../models/AutoRole')

module.exports = {
    name: 'autorole-configure',
    description: 'Configure your auto-role for thos server.',
    // devOnly: Boolean,
    // testOnly: Boolean,
    options: [
        {
            name: 'role',
            description: 'The role you want users to get on join.',
            type: ApplicationCommandOptionType.Role,
            required: true
        }
    ],
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
        const targetRoleId = interaction.options.get('role').value;

        let role = await interaction.guild.roles.fetch(targetRoleId);

        let autoRole = await AutoRole.findOne({ guildId: interaction.guild.id });

        if (autoRole) {
            if (autoRole.roleId === targetRoleId) {
                interaction.editReply(`Auto role is already set to **${role.name}**. To disable, run '/autorole-disable'.`)
                return
            }

            autoRole.roleId = targetRoleId;
        } else {
            autoRole = new AutoRole({
                guildId: interaction.guild.id,
                roleId: targetRoleId
            })
        }

        await autoRole.save();
        interaction.editReply(`Autorole has been set to **${role.name}**. To disable, run '/autorole-disable'.`)
    }
}