const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "money",
    description: "informacje o stanie pieniędzy",
    use: "money [member]",
    run: async(ctx) => {
        const member = ctx.mention(0) || ctx.message.member
        const cash = db.get(`${member.guild.id}_${member.id}_economy.cash`) || 0
        const bank = db.get(`${member.guild.id}_${member.id}_economy.bank`) || 0
        const currency = db.get(`${member.guild.id}_economy.currency`) || "💷"
        const money = cash + bank
        const embed = new MessageEmbed()
            .setTitle("Stan pieniędzy")
            .setThumbnail(member.user.avatarURL())
            .setAuthor(member.user.tag,member.user.avatarURL())
            .addFields(
                {
                    name: "Portfel",
                    value: `${cash}${currency}`,
                    inline: true
                },
                {
                    name: "Bank",
                    value: `${bank}${currency}`,
                    inline: true
                },
                {
                    name: "Całość",
                    value: `${money}${currency}`,
                    inline: true
                }
            )
            .setColor("DARK_PURPLE")

        ctx.message.reply(embed)
            .catch(err => console.log(err))
    }
}