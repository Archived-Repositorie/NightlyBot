const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "addmoney",
    description: "Dodaje pieniądze",
    use: "money <cash/bank> <member> <number>",
    requirePermissions: ["MANAGE_GUILD"],
    run: async(ctx) => {
        const member = ctx.mention(1)
        const currency = db.get(`${ctx.message.member.guild.id}_economy.currency`) || "💷"
        const number = ctx.args[2] * 1
        const text = (ctx.args[0]||"").toLowerCase()
        const options = {
            "cash" : "Portfel",
            "bank" : "Bank"
        }

        if(!options[text])
            return ctx.message.reply(ctx.errorNull("addmoney","<cash/bank>"))
                .catch(err => console.log(err))

        if(!member || member.user.bot)
            return ctx.message.reply(ctx.errorNull("addmoney","<cash/bank> <member>"))
                .catch(err => console.log(err))

        if(!number || number == 0)
            return ctx.message.reply(ctx.errorNull("addmoney","<cash/bank> <member> <number>"))
                .catch(err => console.log(err))

        db.add(`${member.guild.id}_${member.id}_economy.${text}`,number)

        const embed = new MessageEmbed()
            .setTitle("Dodano pieniądze")
            .addFields(
                {
                    name: "Wartość",
                    value: `${number}${currency}`,
                    inline: true
                },
                {
                    name: "Miejsce wpłaty",
                    value: options[text],
                    inline: true
                }
            )
            .setColor("DARK_PURPLE")

        ctx.message.reply(embed)
            .catch(err => console.log(err))
    }
}