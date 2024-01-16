const { Client, Message } = require("discord.js");
const Level = require('../../models/Level');
const calculateLevelXp = require('../../utils/calculateLevelXp')
const cooldowns = new Set();

function getRandomXp(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = async (client, message) => {
    if (!message.inGuild() || message.author.bot || cooldowns.has(message.author.id)) return;

    const xpToGive = getRandomXp(8, 12);

    const query = {
        userId: message.author.id,
        guildId: message.guild.id
    }

    try {
        const level = await Level.findOne(query);

        if (level) {
            level.xp += xpToGive;

            const levelXp = calculateLevelXp(level.level)
            if (level.xp > levelXp) {
                level.xp -= levelXp;
                level.level += 1;
                
                message.channel.send({
                    content: `${message.member} has leveled up to **level ${level.level}**!`
                })
            }

            await level.save().catch((e) => console.log("error saving updated level: "+e));
        }

        // if no user in database
        else {
            // create new level
            const newLevel = new Level({
                userId: message.author.id,
                guildId: message.guild.id,
                xp: xpToGive,
            });

            await newLevel.save();
        }

        cooldowns.add(message.author.id);
        setTimeout(() => {
            cooldowns.delete(message);
        }, 30000)
    } catch (error) {
        console.log(error);
    }
}