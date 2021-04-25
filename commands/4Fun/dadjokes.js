const fs = require('fs')
const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "dad-jokes",
    description: "Nieśmieszne żarty",
    use: "dad-jokes",
    run: async(ctx) => {
        const embed = new MessageEmbed()
            .setDescription(ctx.random("dadjokes"))
            .setColor("DARK_PURPLE")

        ctx.message.reply(embed)
            .catch(err => console.log(err))
    }
}