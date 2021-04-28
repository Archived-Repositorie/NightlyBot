const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "joinmsg",
    requirePermissions: ["MANAGE_GUILD"],
    description: "Ustawia kanał pod wiadomość wejściową",
    use: "joinmsg <disable/enable> <text>",
    run: async(ctx) => {
        const switchs = {
            "disable": true,
            "enable": true
        }

        if(!switchs[ctx.args[0]])
            return ctx.message.reply(ctx.errorNull("joinmsg", "<disable/enable>"))
                .catch(err => console.log(err))

        const channel = ctx.message.mentions.channels.first()

        if((ctx.args[0] || " ").toLowerCase() == "disable") {
            db.set(`${ctx.message.guild.id}_switch_join`,0)

            const embed = new MessageEmbed()
                .setTitle("Wyłączono wiadomość o wejściu na serwer!")
                .setColor("DARK_PURPLE")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        if(!channel)
            return ctx.message.reply(ctx.errorNull("joinmsg", "enable <channel>"))

        const text = ctx.args.slice(2).join(" ")

        if(!text)
            return ctx.message.reply(ctx.errorNull("joinmsg", `enable #${channel.name} <text>`))

        db.set(`${ctx.message.guild.id}_join`, {
            text: text,
            id: channel.id
        })

        const embed = new MessageEmbed()
            .setTitle("Gotowe!")
            .setDescription(ctx.tags(text,ctx.message.member))
            .setColor("DARK_PURPLE")

        ctx.message.reply(embed)
            .catch(err => console.log(err))

        db.set(`${ctx.message.guild.id}_switch_join`,1)
    }
}