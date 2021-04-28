const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "setstartmoney",
    description: "Ustawia pieniądze po wejściu użytkownika",
    use: "setstartmoney <cash/bank> <number>",
    requirePermissions: ["MANAGE_GUILD"],
    run: async(ctx) => {
        const currency = db.get(`${ctx.message.member.guild.id}_economy.currency`) || "💷"
        const number = ctx.args[2] * 1
        const text = ctx.args[1]||"".toLowerCase()
        const options = {
            "cash" : "Portfel",
            "bank" : "Bank"
        }
        const switchs = {
            "disable": true,
            "enable": true
        }

        if(!switchs[ctx.args[0]])
            return ctx.message.reply(ctx.errorNull("setstartmoney", "<disable/enable>"))
                .catch(err => console.log(err))

        if((ctx.args[0] || " ").toLowerCase() == "disable") {
            db.set(`${ctx.message.guild.id}_economy.start.switch`,false)

            const embed = new MessageEmbed()
                .setTitle("Wyłączono startowe pieniądze!")
                .setColor("DARK_PURPLE")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        if(!options[text])
            return ctx.message.reply(ctx.errorNull("setstartmoney","enable <cash/bank>"))
                .catch(err => console.log(err))

        if(!number || number <= 0)
            return ctx.message.reply(ctx.errorNull("setstartmoney","<cash/bank> <number>"))
                .catch(err => console.log(err))

        db.set(`${ctx.message.guild.id}_economy.start`, { type: options[text], value: number })
        db.set(`${ctx.message.guild.id}_economy.start.switch`,true)

        const embed = new MessageEmbed()
            .setTitle("")
            .addFields(
                {
                    name: "Wartość",
                    value: `${number}${currency}`,
                    inline: true
                },
                {
                    name: "Miejsce wpłacania",
                    value: options[text],
                    inline: true
                }
                )
            .setColor("DARK_PURPLE")

        ctx.message.reply(embed)
            .catch(err => console.log(err))
    }
}