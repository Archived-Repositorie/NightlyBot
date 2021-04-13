const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "prefix",
    requirePermissions: ["MANAGE_GUILD"],
    run: async(client,message,args,errorNull) => {
        const prefix = args[0]

        if(!prefix)
            return  message.reply(errorNull("prefix","<text>"))
                .catch(err => console.log(err))

        db.set(`${message.guild.id}_prefix`,prefix)

        const embed = new MessageEmbed()
            .setTitle("Prefix został zmieniony!")
            .setDescription("`" + prefix + "`")
            .setColor("DARK_PURPLE")

        message.reply(embed)
            .catch(err => console.log(err))
    }
}