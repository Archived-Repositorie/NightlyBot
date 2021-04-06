const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "unban",
    run: async(client,message,args,pr,errorNull,errorPermissions,a,errorBotPermissions) => {
        const memberID = args[0]
        const bans = await message.guild.fetchBans()
        const member = bans.get(memberID)

        if (!message.member.hasPermission("BAN_MEMBERS"))
            return message.reply(errorPermissions("BANOWANIE UŻYTKOWNIKÓW", "BAN_MEMBERS"))
                .catch(err => console.log(err))

        if (!message.guild.me.hasPermission("BAN_MEMBERS"))
            return message.reply(errorBotPermissions("WYRZUCANIE UŻYTKOWNIKÓW", "KICK_MEMBERS"))
                .catch(err => console.log(err))

        if(!memberID)
            return message.reply(errorNull("unban", "<memberID>"))
                .catch(err => console.log(err))

        if(bans.size < 1 || !member) {
            const embed = new MessageEmbed()
                .setTitle("Nie można odblokować!")
                .setDescription("Użytkownik nie jest zablokowany lub nie podałes poprawnego ID")
                .setColor("RED")

            return message.reply(embed)
                .catch(err => console.log(err))
        }

        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle("Gotowe!")
            .setDescription("Użytkownik został odblokowany")
            .addFields(
                {
                    name: "Powód",
                    value: args.slice(1).join(" ")  || "Brak"
                },
                {
                    name: "Użytkownik",
                    value: `<@${memberID}>`
                }
            )

        message.reply(embed)
            .catch(err => console.log(err))

        message.guild.members.unban(member.user.id,args.slice(1).join(" ")  || "Brak")
            .catch(err => console.log(err))
    }
}