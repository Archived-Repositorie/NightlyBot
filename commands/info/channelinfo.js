const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "channelinfo",
    run: async(ctx) => {
        const obj = {
            true: "Tak",
            false: "Nie",
        }
        const justText = {
            name: "brak"
        }
        const channel = ctx.message.mentions.channels.first() || ctx.message.channel
        const embed = new MessageEmbed()
            .setTitle("Informacje")
            .setDescription(channel)
            .addFields(
                {
                    name: "ID",
                    value: channel.id,
                    inline: true
                },
                {
                    name: "Nazwa",
                    value: channel.name,
                    inline: true
                },
                {
                   name: "Kategoria",
                   value: (channel.parent || justText).name,
                   inline: true
                },
                {
                    name: "NSFW",
                    value: obj[channel.nsfw],
                    inline: true
                },
                {
                    name: "Data stworzenia",
                    value: channel.createdAt.toLocaleDateString("pl-PL",ctx.options),
                    inline: true
                }
            )
            .setColor("DARK_PURPLE")

        ctx.message.reply(embed)
            .catch(err => console.log(err))
    }
}