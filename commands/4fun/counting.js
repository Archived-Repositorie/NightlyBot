const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "counting",
    requirePermissions: ["MANAGE_GUILD"],
    run: async(client,message,args,errorNull) => {
        const channel = message.mentions.channels.first()

        if(!((args[0] || " ").toLowerCase() == "disable" || (args[0] || " ").toLowerCase() == "enable"))
            return message.reply(errorNull("counting", "<disable/enable>"))
                .catch(err => console.log(err))

        if((args[0] || " ").toLowerCase() == "disable") {
            db.set(`${message.guild.id}_switch_counting`,0)

            const embed = new MessageEmbed()
                .setTitle("Wyłączono liczenie!")
                .setColor("DARK_PURPLE")

            return message.reply(embed)
                .catch(err => console.log(err))
        }

        if(!channel)
            return message.reply(errorNull("counting", "enable <channel>"))

        db.set(`${message.guild.id}_counting`, channel.id)

        const embed = new MessageEmbed()
            .setTitle("Gotowe!")
            .setColor("DARK_PURPLE")

        message.reply(embed)
            .catch(err => console.log(err))

        db.set(`${message.guild.id}_switch_counting`,1)
        db.set(`${message.guild.id}_number`,0)
    }
}