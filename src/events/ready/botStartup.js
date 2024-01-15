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