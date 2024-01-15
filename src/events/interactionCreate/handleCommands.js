const { Client, Interaction } = require('discord.js');
const { devs, testServerId } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */
module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName)

        if (!commandObject) return;

        if (commandObject.devOnly && !devs.includes(interaction.member.id)) {
            interaction.reply({
                content: 'Only developers can run this command.',
                ephemeral: true
            })
        }

        if (commandObject.testOnly && interaction.guild.id !== testServerId) {
            interaction.reply({
                content: 'This command cannot be run here.',
                ephemeral: true
            })
        }

        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: 'Missing permission: '+permission,
                        ephemeral: true
                    })
                    break;
                }
            }
        }
        
        if (commandObject.botPermissions?.length) {
            const bot = interaction.guild.members.me;
            for (const permission of commandObject.botPermissions) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: 'This bot is missing the required permission: '+permission,
                        ephemeral: true
                    })
                    break;
                }
            }
        }

        await commandObject.callback(client, interaction);
    } catch (error) {
        console.log(`There was an error running this command: ${error}`)
    }
}