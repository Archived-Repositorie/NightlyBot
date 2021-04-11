const db = require("quick.db");
const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "ban",
    requirePermissions: ["BAN_MEMBERS","BAN_MEMBERS"],
    run: async(client,message,args,pr,errorNull) => {
        const member = message.mentions.members.first()

        if(!member)
            return message.reply(errorNull("ban", "<member>"))
                .catch(err => console.log(err))

        if(member.roles.cache.first().position >= message.member.roles.cache.first().position) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadasz permisji!")
                .setDescription("Twoja rola jest zbyt nisko do użytkowna którego chcesz zablokować")
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

        if(!member.bannable) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadam permisji!")
                .setDescription("Użytkownik jest niemożliwy do zablokowania")
                .setColor("RED")

            return message.reply(embed)
                .catch(err => console.log(err))
        }

        member.ban(args.slice(1).join(" ")  || "Brak")
            .catch(err => console.log(err))

        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle("Gotowe!")
            .setDescription("Użytkownik został zablokowany")
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
            name: "ban",
            reason: args.slice(1).join(" ")  || "Brak",
            author: message.author.tag
        })
    }
}