const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "suggests",
    requirePermissions: ["MANAGE_GUILD"],
    description: "Komenda do ustawiania kanału pod propozycje",
    use: "suggests <disable/enable> <channel>",
    run: async(ctx) => {
        const switchs = {
            "disable": true,
            "enable": true
        }
        if(!switchs[ctx.args[0]])
            return ctx.message.reply(ctx.errorNull("suggests", "<disable/enable>"))
                .catch(err => console.log(err))

        const channel = ctx.message.mentions.channels.first()

        if((ctx.args[0] || " ").toLowerCase() == "disable") {
            db.set(`${ctx.message.guild.id}_switch_join`,0)

            const embed = new MessageEmbed()
                .setTitle("Wyłączono propozycje na serwerze!")
                .setColor("DARK_PURPLE")

            return ctx.message.reply(embed)

        }
        if(!channel)
            return ctx.message.reply(ctx.errorNull("suggests", "enable <channel>"))
                .catch(err => console.log(err))

        db.set(`${ctx.message.guild.id}_suggests`, {
            id: channel.id
        })

        const embed = new MessageEmbed()
            .setTitle("Gotowe!")
            .setColor("DARK_PURPLE")

        ctx.message.reply(embed)
            .catch(err => console.log(err))

        db.set(`${ctx.message.guild.id}_switch_suggests`,1)
    }
}