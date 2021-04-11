const db = require("quick.db");
const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "kick",
    requirePermissions: ["KICK_MEMBERS","KICK_MEMBERS"],
    run: async(client,message,args,pr,errorNull) => {
        const member = message.mentions.members.first()

        if(!member)
            return message.reply(errorNull("kick", "<member>"))
                .catch(err => console.log(err))

        if(member.roles.cache.first().position >= message.member.roles.cache.first().position) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadasz permisji!")
                .setDescription("Twoja rola jest zbyt nisko do użytkowna którego chcesz wyrzucić")
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

        if(!member.kickable) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadam permisji!")
                .setDescription("Użytkownik jest niemożliwy do wyrzucenia")
                .setColor("RED")

            return message.reply(embed)
                .catch(err => console.log(err))
        }

        member.kick(args.slice(1).join(" ")  || "Brak")
            .catch(err => console.log(err))

        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle("Gotowe!")
            .setDescription("Użytkownik został wyrzucony")
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

        db.push(`${member.guild.id}_${member.id}_punish`,{
            id: message.id,
            name: "kick",
            reason: args.slice(1).join(" ")  || "Brak",
            author: message.author.tag
        })
    }
}