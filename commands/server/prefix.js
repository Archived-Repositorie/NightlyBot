const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "prefix",
    requirePermissions: ["MANAGE_GUILD"],
    run: async(ctx) => {
        const prefix = ctx.args[0]

        if(!prefix)
            return  ctx.message.reply(ctx.errorNull("prefix","<text>"))
                .catch(err => console.log(err))

        db.set(`${ctx.message.guild.id}_prefix`,prefix)

        const embed = new MessageEmbed()
            .setTitle("Prefix został zmieniony!")
            .setDescription("`" + prefix + "`")
            .setColor("DARK_PURPLE")

        ctx.message.reply(embed)
            .catch(err => console.log(err))
    }
}