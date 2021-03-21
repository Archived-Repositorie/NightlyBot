const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "channelinfo",
    run: async(client,message,args) => {
        const obj = {
            true: "Tak",
            false: "Nie",
        }
        const justText = {
            name: "brak"
        }
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        const channel = message.mentions.channels.first() || message.channel
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
                    value: channel.createdAt.toLocaleDateString("pl-PL",options),
                    inline: true
                }
            )
            .setColor("DARK_PURPLE")
        message.channel.send(embed)
    }
}