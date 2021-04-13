const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "warn",
    requirePermissions: ["VIEW_AUDIT_LOG"],
    run: async(client,message,args,errorNull) => {
        const member = message.mentions.members.first()

        if(!member)
            return message.reply(errorNull("warn", "<member>"))
                .catch(err => console.log(err))

        if(member.roles.cache.first().position >= message.member.roles.cache.first().position) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadasz permisji!")
                .setDescription("Twoja rola jest zbyt nisko do użytkowna którego chcesz ostrzegać")
                .setColor("RED")

            return message.reply(embed)
                .catch(err => console.log(err))
        }

        if(member.hasPermission("ADMINISTRATOR")) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadasz permisji!")
                .setDescription("Użytkownik posiada permisje ADMINISTRATOR(ADMINISTRATOR)")
                .setColor("RED")

            return message.reply(embed)
                .catch(err => console.log(err))
        }

        db.push(`${member.guild.id}_${member.id}_punish`,{
            id: message.id,
            name: "warn",
            reason: args.slice(1).join(" ")  || "Brak",
            author: message.author.tag
        })

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
                }
            )

        message.reply(embed)
            .catch(err => console.log(err))
    }
}