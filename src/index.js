require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js')

const { mongoose } = require('mongoose');
const eventHandler = require('./handlers/eventHandler');

// intents are basically a set of permissions that bot can use in order to get access to a set of events
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

(async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }

    eventHandler(client);

    client.login(process.env.TOKEN)
})();