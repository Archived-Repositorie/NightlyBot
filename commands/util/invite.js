const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "invite",
    run: async(client,message,args) => {
        const embed = new MessageEmbed()
            .setTitle("Dodaj bota!")
            .setDescription("https://justfox.cf/nightlybot")
            .setURL("https://justfox.cf/nightlybot")
            .setColor("DARK_PURPLE")

        message.reply(embed)
            .catch(err => console.log(err))
    }
}