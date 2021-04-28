const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "setcurrency",
    description: "Zmienia walute serwerową",
    use: "setcurrency <text>",
    requirePermissions: ["MANAGE_GUILD"],
    run: async(ctx) => {
        const text = ctx.args[0]

        if(!text)
            return ctx.message.reply(ctx.errorNull("setcurrency","<text>"))
                .catch(err => console.log(err))

        db.set(`${ctx.message.guild.id}_economy.currency`,text)

        const embed = new MessageEmbed()
            .setTitle("Waluta została zmieniona!")
            .setDescription("`" + text + "`")
            .setColor("DARK_PURPLE")

        ctx.message.reply(embed)
            .catch(err => console.log(err))
    }
}