const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "tempban",
    requirePermissions: ["BAN_MEMBERS","BAN_MEMBERS"],
    run: async(ctx) => {
        const member = ctx.message.mentions.members.first()

        if(!member)
            return ctx.message.reply(ctx.errorNull("tempban", "<member>"))
                .catch(err => console.log(err))

        if(member.roles.cache.first().position >= ctx.message.member.roles.cache.first().position) {
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

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        if(!member.bannable) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadam permisji!")
                .setDescription("Użytkownik jest niemożliwy do zablokowania")
                .setColor("RED")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        const timedText = (ctx.args[1] || " ").toLowerCase() || " "
        const number = Math.floor(timedText.replace(/(^\d+)(.+$)/i, '$1'))
        const timeType = timedText.replace(/[^a-zA-Z]+/g, '') || NaN
        const timeParsed = number * ctx.timeTest[timeType]

        if (!number || !ctx.timeTest[timeType] || !timeType || !timeParsed)
            return ctx.message.reply(ctx.errorNull("tempban", "<member> <time+timeType(second/minute/hour)>"))


        member.ban({
            reason: ctx.args.slice(2).join(" ")  || "Brak"
        })
            .catch(err => console.log(err))

        db.push(`${member.guild.id}_${member.id}_punish`,{
            id: ctx.message.id,
            name: "tempban",
            reason: ctx.args.slice(1).join(" ")  || "Brak",
            author: ctx.message.author.tag
        })

        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle("Gotowe!")
            .setDescription("Użytkownik został zablokowany")
            .addFields(
                {
                    name: "Powód",
                    value: ctx.args.slice(2).join(" ")  || "Brak"
                },
                {
                    name: "Czas",
                    value: ctx.time(timeParsed)
                },
                {
                    name: "Użytkownik",
                    value: member
                }
            )

        const msg = await ctx.message.reply(embed)
            .catch(err => console.log(err))

        await ctx.sleep(timeParsed * 1000)

        ctx.message.guild.members.unban(member, "Unbanned by bot")
            .catch(err => console.log(err))

        db.push(`${member.guild.id}_${member.id}_punish`,{
            id: msg.id,
            name: "auto unban",
            reason: ctx.args.slice(1).join(" ")  || "Brak",
            author: ctx.client.user.tag
        })
    }
}