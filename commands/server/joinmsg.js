const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "joinmsg",
    requirePermissions: ["MANAGE_GUILD"],
    run: async(client,message,args,errorNull,tags) => {

        if(!((args[0] || " ").toLowerCase() == "disable" || (args[0] || " ").toLowerCase() == "enable"))
            return message.reply(errorNull("joinmsg", "<disable/enable>"))
                .catch(err => console.log(err))

        const channel = message.mentions.channels.first()

        if((args[0] || " ").toLowerCase() == "disable") {
            db.set(`${message.guild.id}_switch_join`,0)

            const embed = new MessageEmbed()
                .setTitle("Wyłączono wiadomość o wejściu na serwer!")
                .setColor("DARK_PURPLE")

            return message.reply(embed)
                .catch(err => console.log(err))
        }

        if(!channel)
            return message.reply(errorNull("joinmsg", "enable <channel>"))

        const text = args.slice(2).join(" ")

        if(!text)
            return message.reply(errorNull("joinmsg", `enable #${channel.name} <text>`))

        db.set(`${message.guild.id}_join`, {
            text: text,
            id: channel.id
        })

        const embed = new MessageEmbed()
            .setTitle("Gotowe!")
            .setDescription(tags(text,message.member))
            .setColor("DARK_PURPLE")

        message.reply(embed)
            .catch(err => console.log(err))

        db.set(`${message.guild.id}_switch_join`,1)
    }
}