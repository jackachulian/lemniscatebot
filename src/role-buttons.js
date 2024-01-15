require('dotenv').config();
const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

// intents are basically a set of permissions that bot can use in order to get access to a set of events
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

const roles = [
    {
        'id': '1196458104217411715',
        'label': 'Red'
    },
    {
        'id': '1196458181744926742',
        'label': 'Blue'
    },
    {
        'id': '1196458274829127731',
        'label': 'Green'
    },
    {
        'id': '123456789890',
        'label': "fake role"
    }
]

client.on('ready', async (c) => {
    console.log(`${c.user.tag} is ready`)

    try {
        const channel = await client.channels.cache.get('1196458694754435212');
        if (!channel) {
            console.log("button channel not found")
            return;
        }

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder()
                .setCustomId(role.id)
                .setLabel(role.label)
                .setStyle(ButtonStyle.Primary)
            )
        })

        await channel.send({
            content: 'Claim or remove a role',
            components: [row]
        })
    } catch (error) {
        console.log(e)
    }
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;
    await interaction.deferReply({ ephemeral: true });

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
        interaction.editReply({
            content: "I couldn't find that role",
            ephemeral: true
        })
        return;
    }

    const hasRole = interaction.member.roles.cache.has(role.id);
    if (hasRole) {
        await interaction.member.roles.remove(role);
        await interaction.editReply(`The role ${role} has been removed.`)
        return;
    } else {
        await interaction.member.roles.add(role);
        await interaction.editReply(`The role ${role} has been added.`)
    }
})

client.login(process.env.TOKEN)