const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "addmoneyrole",
    description: "Dodaje pieniądze",
    use: "money <cash/bank> <role> <number>",
    requirePermissions: ["MANAGE_GUILD"],
    run: async(ctx) => {
        let role = ctx.message.mentions.roles.first() || ctx.message.mentions.everyone
        const currency = db.get(`${ctx.message.member.guild.id}_economy.currency`) || "💷"
        const number = ctx.args[2] * 1
        const text = (ctx.args[0]||"").toLowerCase()
        const options = {
            "cash" : "Portfel",
            "bank" : "Bank"
        }

        if(!options[text])
            return ctx.message.reply(ctx.errorNull("addmoneyrole","<cash/bank>"))
                .catch(err => console.log(err))

        if(!role)
            return ctx.message.reply(ctx.errorNull("addmoneyrole","<cash/bank> <role>"))
                .catch(err => console.log(err))

        if(!number || number == 0)
            return ctx.message.reply(ctx.errorNull("addmoneyrole","<cash/bank> <role> <number>"))
                .catch(err => console.log(err))

        if(role == true)
            role = ctx.message.guild.roles.everyone

        role.members.forEach(member => db.add(`${member.guild.id}_${member.id}_economy.${text}`,number))


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
                },
                {
                    name: "Rola",
                    value: role,
                    inline: true
                }
            )
            .setColor("DARK_PURPLE")

        ctx.message.reply(embed)
            .catch(err => console.log(err))
    }
}