const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "suggest",
    run: async(ctx) => {
        const switched = db.get(`${ctx.message.guild.id}_switch_suggests`)

        if (switched != 1) {

            const embed = new MessageEmbed()
                .setTitle("Nie ustawiono kanału!")
                .setColor("DARK_PURPLE")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        const text = ctx.args.join(" ")

        if (!text)
            return ctx.message.reply(ctx.errorNull("suggest", "<text>"))
                .catch(err => console.log(err))

        const channel = db.get(`${ctx.message.guild.id}_suggests`)
        const embed = new MessageEmbed()
            .setColor(ctx.message.member.displayHexColor)
            .setAuthor(ctx.message.author.tag, ctx.message.author.avatarURL())
            .setDescription(text)

        ctx.message.guild.channels.cache.get(channel.id).send(embed)
            .catch(err => console.log(err))
    }
}