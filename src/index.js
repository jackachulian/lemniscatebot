require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js')

const eventHandler = require('./handlers/eventHandler')

// intents are basically a set of permissions that bot can use in order to get access to a set of events
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

eventHandler(client);

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content === 'hello') {
        message.reply('hello')
    }
})

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'add') {
        const a = interaction.options.get('a')?.value
        const b = interaction.options.get('b')?.value

        interaction.reply(a+b)
    }

    if (interaction.commandName === 'embed') {
        const embed = new EmbedBuilder()
        .setTitle("Embed Title")
        .setDescription('This is the embed description')
        .setColor('Random')
        .addFields(
            {
                name: 'Field Title',
                value: 'Some random value'
            },
            {
                name: '2nd Field Title',
                value: 'Some random value'
            },
        );

        interaction.reply({embeds: [embed]});
    }
})

client.login(process.env.TOKEN)