const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "suggests",
    run: async(client,message,args,pr,errorNull,errorPermissions) => {

        if(!message.member.hasPermission("MANAGE_GUILD"))
            return message.reply(errorPermissions("ZARZĄDZANIE SERWEREM","MANAGE_SERVER"))
                .catch(err => console.log(err))

        if(!((args[0] || " ").toLowerCase() == "disable" || (args[0] || " ").toLowerCase() == "enable"))
            return message.reply(errorNull("suggests", "<disable/enable>"))
                .catch(err => console.log(err))

        const channel = message.mentions.channels.first()

        if((args[0] || " ").toLowerCase() == "disable") {
            db.set(`${message.guild.id}_switch_join`,0)

            const embed = new MessageEmbed()
                .setTitle("Wyłączono propozycje na serwerze!")
                .setColor("DARK_PURPLE")

            return message.reply(embed)

        }
        if(!channel)
            return message.reply(errorNull("suggests", "enable <channel>"))
                .catch(err => console.log(err))

        db.set(`${message.guild.id}_suggests`, {
            id: channel.id
        })

        const embed = new MessageEmbed()
            .setTitle("Gotowe!")
            .setColor("DARK_PURPLE")

        message.reply(embed)
            .catch(err => console.log(err))

        db.set(`${message.guild.id}_switch_suggests`,1)
    }
}