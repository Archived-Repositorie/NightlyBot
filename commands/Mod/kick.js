const db = require("quick.db");
const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "kick",
    requirePermissions: ["KICK_MEMBERS","KICK_MEMBERS"],
    description: "Wyrzuca użytkownika",
    use: "kick <member> [reason]",
    run: async(ctx) => {
        const member = ctx.mention(0)

        if(!member)
            return ctx.message.reply(ctx.errorNull("kick", "<member>"))
                .catch(err => console.log(err))

        if(member.roles.cache.first().position >= ctx.message.member.roles.cache.first().position) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadasz permisji!")
                .setDescription("Twoja rola jest zbyt nisko do użytkowna którego chcesz wyrzucić")
                .setColor("RED")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        if(member.hasPermission("ADMINISTRATOR")) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadasz permisji!")
                .setDescription("Użytkownik posiada permisje ADMINISTRATOR(ADMINISTRATOR)")
                .setColor("RED")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        if(!member.kickable) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadam permisji!")
                .setDescription("Użytkownik jest niemożliwy do wyrzucenia")
                .setColor("RED")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        member.kick(ctx.args.slice(1).join(" ")  || "Brak")
            .catch(err => console.log(err))

        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle("Gotowe!")
            .setDescription("Użytkownik został wyrzucony")
            .addFields(
                {
                    name: "Powód",
                    value: ctx.args.slice(1).join(" ")  || "Brak"
                },
                {
                    name: "Użytkownik",
                    value: member
                }
            )

        ctx.message.reply(embed)
            .catch(err => console.log(err))

        db.push(`${member.guild.id}_${member.id}_punish`,{
            id: ctx.message.id,
            name: "kick",
            reason: ctx.args.slice(1).join(" ")  || "Brak",
            author: ctx.message.author.tag
        })
    }
}