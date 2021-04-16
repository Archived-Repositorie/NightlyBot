const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "warn",
    requirePermissions: ["VIEW_AUDIT_LOG"],
    run: async(ctx) => {
        const member = ctx.mention(0)

        if(!member)
            return ctx.message.reply(ctx.errorNull("warn", "<member>"))
                .catch(err => console.log(err))

        if(member.hasPermission("ADMINISTRATOR")) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadasz permisji!")
                .setDescription("Użytkownik posiada permisje ADMINISTRATOR(ADMINISTRATOR)")
                .setColor("RED")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        if(member.roles.cache.first().position >= ctx.message.member.roles.cache.first().position) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadasz permisji!")
                .setDescription("Twoja rola jest zbyt nisko do użytkowna którego chcesz ostrzegać")
                .setColor("RED")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        db.push(`${member.guild.id}_${member.id}_punish`,{
            id: ctx.message.id,
            name: "warn",
            reason: ctx.args.slice(1).join(" ")  || "Brak",
            author: ctx.message.author.tag
        })

        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle("Gotowe!")
            .setDescription("Użytkownik został ostrzeżony")
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
    }
}