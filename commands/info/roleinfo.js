const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "roleinfo",
    run: async(client,message,args) => {
        const obj = {
            true: "Tak",
            false: "Nie",
        }
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args.slice(0).join(" ")) || message.member.roles.cache.first()
        const embed = new MessageEmbed()
            .setTitle("Informacje")
            .setDescription(role)
            .addFields(
                {
                    name: "ID",
                    value: role.id,
                    inline: true
                },
                {
                    name: "Nazwa",
                    value: role.name,
                    inline: true
                },
                {
                    name: "Kolor",
                    value: role.hexColor,
                    inline: true
                },
                {
                    name: "Użytkownicy",
                    value: role.members.size,
                    inline: true
                },
                {
                    name: "Data stworzenia",
                    value: role.createdAt.toLocaleDateString("pl-PL",options),
                    inline: true
                },
                {
                    name: "Pozycja",
                    value: `${role.position}/${message.guild.roles.cache.size}`,
                    inline: true
                },
                {
                    name: "Oznaczalny",
                    value: obj[role.mentionable],
                    inline: true
                }
            )
            .setColor("DARK_PURPLE")
        message.channel.send(embed)
    }
}