const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "leavemsg",
    requirePermissions: ["MANAGE_GUILD"],
    run: async(ctx) => {

            if (!((ctx.args[0] || " ").toLowerCase() == "disable" || (ctx.args[0] || " ").toLowerCase() == "enable"))
                return ctx.message.reply(errorNull("leavemsg", "<disable/enable>"))
                    .catch(err => console.log(err))

            const channel = ctx.message.mentions.channels.first()

            if ((ctx.args[0] || " ").toLowerCase() == "disable") {
                db.set(`${ctx.message.guild.id}_switch_leave`, 0)

                const embed = new MessageEmbed()
                    .setTitle("Wyłączono wiadomość o wyjściu z serwera!")
                    .setColor("DARK_PURPLE")

                return ctx.message.reply(embed)
                    .catch(err => console.log(err))

            }
            if (!channel)
                return ctx.message.reply(ctx.errorNull("leavemsg", "enable <channel>"))
                    .catch(err => console.log(err))

            const text = ctx.args.slice(2).join(" ")

            if (!text)
                return ctx.message.reply(ctx.errorNull("leavemsg", `enable #${channel.name} <text>`))
                    .catch(err => console.log(err))

            db.set(`${ctx.message.guild.id}_leave`, {
                text: text,
                id: channel.id
            })

            const embed = new MessageEmbed()
                .setTitle("Gotowe!")
                .setDescription(ctx.tags(text, ctx.message.member))
                .setColor("DARK_PURPLE")

            ctx.message.reply(embed)
                .catch(err => console.log(err))

            db.set(`${ctx.message.guild.id}_switch_leave`, 1)
    }
}