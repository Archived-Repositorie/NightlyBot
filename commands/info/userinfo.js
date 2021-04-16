const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "userinfo",
    run: async(ctx) => {
        const member = ctx.mention(0) || ctx.message.member
        let bot = ""

        if(member.user.bot)
            bot = "🤖"

        const embed = new MessageEmbed()
            .setTitle("Informacje")
            .setDescription(`${member} ${bot}`)
            .setThumbnail(member.user.avatarURL())
            .setAuthor(member.user.tag,member.user.avatarURL())
            .addFields(
                {
                    name: "ID",
                    value: member.user.id,
                    inline: true
                },
                {
                    name: "Data wejścia na serwer",
                    value: member.joinedAt.toLocaleDateString("pl-PL",ctx.options),
                    inline: true
                },
                {
                    name: "Data stworzenia",
                    value: member.user.createdAt.toLocaleDateString("pl-PL",ctx.options),
                    inline: true
                },
                {
                    name: "Najwyższa rola",
                    value: member.roles.cache.first(),
                    inline: true
                }
            )
            .setColor("DARK_PURPLE")

        ctx.message.reply(embed)
            .catch(err => console.log(err))
    }
}