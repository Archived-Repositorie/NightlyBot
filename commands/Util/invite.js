const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "invite",
    description: "Zaproszenie bota",
    use: "invite",
    run: async(ctx) => {
        const embed = new MessageEmbed()
            .setTitle("Dodaj bota!")
            .setDescription("https://justfox.cf/nightlybot")
            .setURL("https://justfox.cf/nightlybot")
            .setColor("DARK_PURPLE")

        ctx.message.reply(embed)
            .catch(err => console.log(err))
    }
}