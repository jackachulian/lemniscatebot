const { ActivityType } = require("discord.js");

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
        'name': 'SLAY YOURSELF',
    },
    {
        'name': 'Bipole R-XV',
    },
    {
        'name': 'Bipole I',
    },
    {
        'name': 'z?game',
    },
    {
        'name': 'q?battle',
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
        'name': 'lemniscate lore videos',
        'type': ActivityType.Watching
    },
    {
        'name': 'Mana Cycle',
        'type': ActivityType.Competing
    },
    {
        'name': 'Uninstallng everything but Bipole',
        'type': ActivityType.Custom
    },
    {
        'name': 'Fighting level 10 Trainbots',
        'type': ActivityType.Custom
    },
    {
        'name': 'Nerfing Infinity',
        'type': ActivityType.Custom
    },
    {
        'name': 'Buffing z?man',
        'type': ActivityType.Custom
    },
    {
        'name': 'Slaying themself',
        'type': ActivityType.Custom
    },
    {
        'name': 'Searching for the Itucher',
        'type': ActivityType.Custom
    },
    {
        'name': 'Fighting Dark Infinity',
        'type': ActivityType.Custom
    },
    {
        'name': 'Committing Cuban missile crisis',
        'type': ActivityType.Custom
    },
    {
        'name': 'cascading they mana',
        'type': ActivityType.Custom
    },
    {
        'name': 'spellcasting',
        'type': ActivityType.Custom
    },
    {
        'name': 'shadow wizard mana gang',
        'type': ActivityType.Custom
    },
    {
        'name': 'consuming oatmeal',
        'type': ActivityType.Custom
    },
    {
        'name': 'Travellng across Bipole',
        'type': ActivityType.Custom
    },
    {
        'name': 'Eating electric chicken',
        'type': ActivityType.Custom
    },
    {
        'name': 'Liberating Xuir',
        'type': ActivityType.Custom
    },
    {
        'name': 'Neville did it',
        'type': ActivityType.Custom
    },
    {
        'name': 'Doing Notre Dame',
        'type': ActivityType.Custom
    },
    {
        'name': 'Worshipping Bob Ross',
        'type': ActivityType.Custom
    },
    {
        'name': 'Browsing infinityjka.itch.io',
        'type': ActivityType.Custom
    },
]

function changeStatus(client) {
    let random = Math.floor(Math.random() * stati.length);
    client.user.setActivity(stati[random]);
}

module.exports = (client) => {
    console.log(client.user.tag + " is online")

    changeStatus(client);
    setInterval(() => {
        changeStatus(client);
    }, 30000)
}