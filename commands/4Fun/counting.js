const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "counting",
    requirePermissions: ["MANAGE_GUILD"],
    description: "Ustawia kanał pod liczenie",
    use: "counting <disable/enable> <channel>",
    run: async(ctx) => {
        const channel = ctx.message.mentions.channels.first()
        const switchs = {
            "disable": true,
            "enable": true
        }

        if(!switchs[ctx.args[0]])
            return ctx.message.reply(ctx.errorNull("counting", "<disable/enable>"))
                .catch(err => console.log(err))

        if((ctx.args[0] || " ").toLowerCase() == "disable") {
            db.set(`${ctx.message.guild.id}_switch_counting`,0)

            const embed = new MessageEmbed()
                .setTitle("Wyłączono liczenie!")
                .setColor("DARK_PURPLE")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        if(!channel)
            return ctx.message.reply(ctx.errorNull("counting", "enable <channel>"))

        db.set(`${ctx.message.guild.id}_counting`, channel.id)

        const embed = new MessageEmbed()
            .setTitle("Gotowe!")
            .setColor("DARK_PURPLE")

        ctx.message.reply(embed)
            .catch(err => console.log(err))

        db.set(`${ctx.message.guild.id}_switch_counting`,1)
        db.set(`${ctx.message.guild.id}_number`,0)
    }
}