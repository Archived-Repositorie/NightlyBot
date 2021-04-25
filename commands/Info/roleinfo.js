const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "roleinfo",
    description: "Informacje o roli",
    use: "roleinfo [role]",
    run: async(ctx) => {
        const obj = {
            true: "Tak",
            false: "Nie",
        }
        const role = ctx.message.mentions.roles.first() || ctx.message.guild.roles.cache.get(ctx.args.slice(0).join(" ")) || ctx.message.member.roles.cache.first()
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
                    value: role.createdAt.toLocaleDateString("pl-PL",ctx.options),
                    inline: true
                },
                {
                    name: "Pozycja",
                    value: `${role.position}/${ctx.message.guild.roles.cache.size}`,
                    inline: true
                },
                {
                    name: "Oznaczalny",
                    value: obj[role.mentionable],
                    inline: true
                }
            )
            .setColor("DARK_PURPLE")

        ctx.message.reply(embed)
            .catch(err => console.log(err))
    }
}