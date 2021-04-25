const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "help",
    description: "Lista komend oraz informacje o nich",
    use: "help [command]",
    run: async(ctx) => {
        const text = (ctx.args[0] || "").toLowerCase()
        function styled(string) {
            return "```\n" + string.split(" ").join("\n") + "```"
        }
        if(!ctx.cmd.find(cmd => cmd.name == text)) {
            const embed = new MessageEmbed()
                .setTitle("Lista komend")
                .setColor("DARK_PURPLE")
                .setThumbnail(ctx.client.user.avatarURL())
                .setFooter("Aby sprawdzić informacje o komendzie wpisz help <komenda>")

            ctx.client.categories.forEach(cate => {
                if(cate == "nsfw") return;
                embed.addField(cate,styled(ctx.client.categories[cate].join(" ")),true)
            })

            if(ctx.message.channel.nsfw)
                embed.addFields(
                    {
                        name: "NSFW",
                        value: styled("anal ass boobs rule34"),
                        inline: true
                    }
                )

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        if(!ctx.cmd.find(cmd => cmd.name == text).requirePermissions)
            ctx.cmd.find(cmd => cmd.name == text).requirePermissions = ["Brak","Brak"]

        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle(`Informacje o ${text}`)
            .addFields(
                {
                    name: "Jak użyć?",
                    value: ctx.cmd.find(cmd => cmd.name == text).use,
                    inline: true
                },
                {
                    name: "Permisje potrzebne użytkownikowi",
                    value: ctx.cmd.find(cmd => cmd.name == text).requirePermissions[0],
                    inline: true
                },
                {
                    name: "Permisje potrzebne botowi",
                    value: ctx.cmd.find(cmd => cmd.name == text).requirePermissions[1],
                    inline: true
                },
                {
                    name: "Opis",
                    value: ctx.cmd.find(cmd => cmd.name == text).description,
                    inline: true
                }
            )

        ctx.message.reply(embed)
            .catch(err => console.log(err))
    }
}
