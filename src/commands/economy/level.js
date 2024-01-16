const { ApplicationCommandOptionType, Client, Interaction, EmbedBuilder } = require("discord.js");
const Level = require('../../models/Level');
const calculateLevelXp = require("../../utils/calculateLevelXp");

module.exports = {
    name: "level",
    description: "Shows yours or another user's level.",
    options: [
        {
            name: 'target-user',
            description: 'The user whose level you want to see',
            type: ApplicationCommandOptionType.Mentionable
        }
    ],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        if (!interaction.inGuild) {
            interaction.reply("You can only run this command inside a server.")
            return
        }

        await interaction.deferReply();

        const mentionedUserId = interaction.options.get('target-user')?.value;
        const targetUserId = mentionedUserId || interaction.member.id;
        const targetUser = await interaction.guild.members.fetch(targetUserId);
        const level = await Level.findOne({
            userId: targetUserId,
            guildId: interaction.guild.id,
        });

        if (!level) {
            level = new Level({
                userId: targetUser,
                guildId: message.guild.id,
                xp: 0,
            });
            await level.save();
        }

        let allLevels = await Level.find({ guildId: interaction.guild.id }).select('-_id userId level xp')

        allLevels.sort((a, b) => {
            if (a.level == b.level) {
                return b.xp - a.xp;
            } else {
                return b.level - a.level;
            }
        });

        let currentRank = allLevels.findIndex((lvl) => lvl.userId == targetUserId) + 1;

        const embed = new EmbedBuilder()
        .setTitle(targetUser.user.tag)
        .setDescription(`Level ${level.level} | XP: ${level.xp}/${calculateLevelXp(level.level)} | Rank ${currentRank}`)
        .setColor(targetUser.displayColor)
        .setThumbnail(targetUser.displayAvatarURL({ size: 256 }))
        // .addFields(
        //     {
        //         name: 'Field Title',
        //         value: 'Some random value'
        //     },
        //     {
        //         name: '2nd Field Title',
        //         value: 'Some random value'
        //     },
        // )

        interaction.editReply({embeds: [embed]});
    }
}