const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "leavemsg",
    run: async(client,message,args,prefix,errorNull,errorPermissions,tags) => {
        if(!message.member.hasPermission("MANAGE_GUILD"))
            return message.channel.send(errorPermissions("ZARZĄDZANIE SERWEREM","MANAGE_SERVER"))
        if(!(args[0] == "disable" || args[0] == "enable"))
            return message.channel.send(errorNull("leavemsg", "<disable/enable>"))
        const channel = message.mentions.channels.first()
        if(args[0] == "disable") {
            db.set(`${message.guild.id}_switch_leave`,0)
            const embed = new Discord.MessageEmbed()
                .setTitle("Wyłączono wiadomość o wyjściu z serwera!")
                .setColor("DARK_PURPLE")
            return message.channel.send(embed)
        }
        if(!channel)
            return message.channel.send(errorNull("leavemsg", "enable <channel>"))
        const text = args.slice(2).join(" ")
        if(!text)
            return message.channel.send(errorNull("leavemsg", `enable #${channel.name} <text>`))
        db.set(`${message.guild.id}_leave`, {
            text: text,
            id: channel.id
        })
        const embed = new Discord.MessageEmbed()
            .setTitle("Gotowe!")
            .setDescription(tags(text,message.member))
            .setColor("DARK_PURPLE")
        message.channel.send(embed)
        db.set(`${message.guild.id}_switch_leave`,1)
    }
}