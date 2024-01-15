require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require('discord.js')

// intents are basically a set of permissions that bot can use in order to get access to a set of events
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

let stati = [
    {
        'name': 'Installing Bipole',
        'type': ActivityType.Custom,
        'url': 'https://infinityjka.itch.io/'
    },
    {
        'name': 'Installing Bipole',
        'type': ActivityType.Custom,
    },
    {
        'name': 'Mana Cycle',
    },
    {
        'name': 'Bipole V: Dungeons of Biphero',
    },
    {
        'name': 'Scaleton',
    },
    {
        'name': 'Neville Fighters',
    },
    {
        'name': 'Neville OS',
    },
    {
        'name': 'Bipole IV: Liberation of Xuir',
    },
    {
        'name': 'Bipole III',
    },
    {
        'name': 'Mana Cycle OST',
        'type': ActivityType.Listening
    },
    {
        'name': 'Bipole XV OST',
        'type': ActivityType.Listening
    },
    {
        'name': 'infinityJKA',
        'type': ActivityType.Watching
    },
    {
        'name': 'Mana Cycle',
        'type': ActivityType.Watching
    },
    {
        'name': 'Mana Cycle',
        'type': ActivityType.Competing
    },
    {
        'name': 'Uninstallng everything but Bipole',
        'type': ActivityType.Custom
    }
]

client.on('ready', (c) => {
    console.log(`${c.user.tag} is ready`)

    changeStatus();
    setInterval(() => {
        changeStatus();
    }, 30000)
})

function changeStatus() {
    let random = Math.floor(Math.random() * stati.length);
    client.user.setActivity(stati[random]);
}

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