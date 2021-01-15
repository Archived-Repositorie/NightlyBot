const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "suggests",
    run: async(client,message,args,pr,errorNull,errorPermissions) => {
        if(!message.member.hasPermission("MANAGE_GUILD"))
            return message.channel.send(errorPermissions("ZARZĄDZANIE SERWEREM","MANAGE_SERVER"))
        if(!(args[0] == "disable" || args[0] == "enable"))
            return message.channel.send(errorNull("suggests", "<disable/enable>"))
        const channel = message.mentions.channels.first()
        if(args[0] == "disable") {
            db.set(`${message.guild.id}_switch_join`,0)
            const embed = new Discord.MessageEmbed()
                .setTitle("Wyłączono propozycje na serwerze!")
                .setColor("DARK_PURPLE")
            return message.channel.send(embed)
        }
        if(!channel)
            return message.channel.send(errorNull("suggests", "enable <channel>"))
        db.set(`${message.guild.id}_suggests`, {
            id: channel.id
        })
        const embed = new Discord.MessageEmbed()
            .setTitle("Gotowe!")
            .setColor("DARK_PURPLE")
        message.channel.send(embed)
        db.set(`${message.guild.id}_switch_suggests`,1)
    }
}