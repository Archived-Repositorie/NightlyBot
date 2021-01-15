const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "prefix",
    run: async(client,message,args,per,errorNull,errorPermissions) => {
        const prefix = args[0]
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(errorPermissions("ZARZĄDZANIE SERWEREM","MANAGE_SERVER"))
        if(!prefix) return  message.channel.send(errorNull("prefix","<text>"))
        db.set(`${message.guild.id}_prefix`,prefix)
        const embed = new Discord.MessageEmbed()
            .setTitle("Prefix został zmieniony!")
            .setDescription("`" + prefix + "`")
            .setColor("DARK_PURPLE")
        message.channel.send(embed)
    }
}