const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "warn",
    run: async(client,message,args,pr,errorNull,errorPermissions,a,errorBotPermissions) => {
        const member = message.mentions.members.first()

        if (!message.member.hasPermission("VIEW_AUDIT_LOG"))
            return message.channel.send(errorPermissions("WYŚWIETLANIE DZIENNIKA ZDARZEŃ", "VIEW_AUDIT_LOG"))
                .catch(err => console.log(err))

        if(!member)
            return message.channel.send(errorNull("warn", "<member>"))
                .catch(err => console.log(err))

        if(member.roles.cache.first().position >= message.member.roles.cache.first().position) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadasz permisji!")
                .setDescription("Twoja rola jest zbyt nisko do użytkowna którego chcesz ostrzegać")
                .setColor("RED")

            return message.channel.send(embed)
                .catch(err => console.log(err))
        }

        if(member.hasPermission("ADMINISTRATOR")) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadasz permisji!")
                .setDescription("Użytkownik posiada permisje ADMINISTRATOR(ADMINISTRATOR)")
                .setColor("RED")

            return message.channel.send(embed)
                .catch(err => console.log(err))
        }

        db.push(`${member.guild.id}_${member.id}_warns`,args.slice(1).join(" ")  || "brak")

        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle("Gotowe!")
            .setDescription("Użytkownik został ostrzeżony")
            .addFields(
                {
                    name: "Powód",
                    value: args.slice(1).join(" ")  || "Brak"
                },
                {
                    name: "Użytkownik",
                    value: member
                },
                {
                    name: "Ilość",
                    value: db.get(`${member.guild.id}_${member.id}_warns`).length
                }
            )

        message.channel.send(embed)
            .catch(err => console.log(err))
    }
}