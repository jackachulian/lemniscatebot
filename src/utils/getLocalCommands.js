const path = require('path');
const getAllFiles = require("./getAllFiles");

/**
 * 
 * @param {string[]} exceptions commands to exclude
 * @returns 
 */
module.exports = (exceptions = []) => {
    let localCommands = [];

    const commandCategories = getAllFiles(
        path.join(__dirname, '..', 'commands'),
        true
    )

    for (const commandCategory of commandCategories) {
        const commandFiles = getAllFiles(commandCategory);

        for (const commandFile of commandFiles) {
            const commandObject = require(commandFile);

            if (exceptions.includes(commandObject.name)) {
                continue;
            }

            console.log
            localCommands.push(commandObject);
        }
    }

    return localCommands;
}