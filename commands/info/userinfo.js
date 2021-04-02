const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "userinfo",
    run: async(client,message,args) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        const member = message.mentions.members.first() || message.member
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
                    value: member.joinedAt.toLocaleDateString("pl-PL",options),
                    inline: true
                },
                {
                    name: "Data stworzenia",
                    value: member.user.createdAt.toLocaleDateString("pl-PL",options),
                    inline: true
                },
                {
                    name: "Najwyższa rola",
                    value: member.roles.cache.first(),
                    inline: true
                }
            )
            .setColor("DARK_PURPLE")

        message.channel.send(embed)
            .catch(err => console.log(err))
    }
}