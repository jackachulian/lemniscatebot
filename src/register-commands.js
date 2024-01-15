require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

const commands = [
    {
        name: 'hey',
        description: 'replies with hey'
    },

    {
        name: 'add',
        description: 'adds two numbers',
        options: [
            {
                name: 'a',
                description: 'the first number',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: 'one',
                        value: 1
                    },
                    {
                        name: 'two',
                        value: 2
                    },
                    {
                        name: 'three',
                        value: 3
                    },
                ],
                required: true
            },
            {
                name: 'b',
                description: 'the second number',
                type: ApplicationCommandOptionType.Number,
                required: true
            }
        ]
    },

    {
        name: 'embed',
        description: 'sends an embed'
    }
]

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("registering slash commands")

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log("slash commands were registered successfully")
    } catch (e) {
        console.log(e);
    }
})();