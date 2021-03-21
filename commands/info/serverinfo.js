const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "serverinfo",
    run: async(client,message,args) => {
        const guild = message.guild
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        const embed = new MessageEmbed()
            .setTitle("Informacje")
            .setAuthor(guild.name)
            .setThumbnail(guild.iconURL())
            .addFields(
                {
                    name: "ID",
                    value: guild.id,
                    inline: true
                },
                {
                    name: "Właściciel",
                    value: guild.owner,
                    inline: true
                },
                {
                    name: "Użytkownicy",
                    value: `Online ${guild.members.cache.filter(member => member.presence.status != "offline").size} \n Offline ${guild.members.cache.filter(member => member.presence.status == "offline").size}`,
                    inline: true
                },
                {
                    name: "Kanały",
                    value: `Tekstowe ${guild.channels.cache.filter(channel => channel.type != "voice" && channel.type != "category").size} \n Głosowe ${guild.channels.cache.filter(channel => channel.type == "voice" && channel.type != "category").size}`,
                    inline: true
                },
                {
                    name: "Role",
                    value: guild.roles.cache.size,
                    inline: true
                },
                {
                    name: "Emotki",
                    value: guild.emojis.cache.size,
                    inline: true
                },
                {
                    name: "Boost",
                    value: `Level ${guild.premiumTier} (${guild.premiumSubscriptionCount} Boosty)`,
                    inline: true
                },
                {
                    name: "Data stworzenia",
                    value: guild.createdAt.toLocaleDateString("pl-PL",options),
                    inline: true
                }
            )
            .setColor("DARK_PURPLE")
        message.channel.send(embed)
    }
}