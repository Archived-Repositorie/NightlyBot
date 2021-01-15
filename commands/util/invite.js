const Discord = require("discord.js")

module.exports = {
    name: "invite",
    run: async(client,message,args) => {
        const embed = new Discord.MessageEmbed()
            .setTitle("Dodaj bota!")
            .setDescription("https://justfox.cf/nightlybot")
            .setURL("https://justfox.cf/nightlybot")
            .setColor("DARK_PURPLE")
        message.channel.send(embed)
    }
}