const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "tempmute",
    requirePermissions: ["MUTE_MEMBERS",["MANAGE_CHANNELS","MANAGE_ROLES"]],
    run: async(ctx) => {
        const member = ctx.mention(0)
        const obj = {
            muted: {
                time: {
                    date: undefined,
                    sec: undefined
                },
                check: undefined
            }
        }

        const roleId = db.get(`${ctx.message.guild.id}_muted`) || {id: undefined}
        const role = ctx.message.guild.roles.cache.get(roleId.id)

        if(!role) {
            const embed = new MessageEmbed()
                .setTitle("Rola nie istnieje!")
                .setDescription("Aby stworzyć role użyj komendy `muted create` lub `muted set-role`")
                .setColor("RED")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        if(role.position >= ctx.message.guild.me.roles.cache.first().size) {
            const embed = new MessageEmbed()
                .setTitle("Rola nie można nadać!")
                .setDescription("Role którą chcesz wyciszyć jest na tej samej pozycji co moja lub większa")
                .setColor("RED")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        if(!member)
            return ctx.message.reply(ctx.errorNull("tempmute", "<member>"))
                .catch(err => console.log(err))

        if(member.hasPermission("ADMINISTRATOR")) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadasz permisji!")
                .setDescription("Użytkownik posiada permisje ADMINISTRATOR(ADMINISTRATOR)")
                .setColor("RED")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        const { muted }= db.get(`${member.guild.id}_${member.id}_mute`) || obj
        if(muted.check) {
            const embed = new MessageEmbed()
                .setTitle("Użytkownik jest już wyciszony!")
                .setDescription("Odcisz użytkownika aby nadać znowu wyciszenie")
                .setColor("RED")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        if(member.roles.cache.first().position >= ctx.message.member.roles.cache.first().position) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadasz permisji!")
                .setDescription("Twoja rola jest zbyt nisko do użytkowna którego chcesz wyciszyć")
                .setColor("RED")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        const timedText = (ctx.args[1] || " ").toLowerCase() || " "
        const number = Math.floor(timedText.replace(/(^\d+)(.+$)/i, '$1'))
        const timeType = timedText.replace(/[^a-zA-Z]+/g, '') || NaN
        const timeParsed = number * ctx.timeTest[timeType]

        if (!number || !ctx.timeTest[timeType] || !timeType || !timeParsed)
            return ctx.message.reply(ctx.errorNull("tempmute", "<member> <time+timeType(second/minute/hour)>"))
                .catch(err => console.log(err))

        member.roles.add(role)
            .catch(err => console.log(err))

        db.set(`${member.guild.id}_${member.id}_mute`,{
            muted: {
                time: {
                    date: new Date().getTime(),
                    sec: timeParsed
                },
                check: true
            }
        })

        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle("Gotowe!")
            .setDescription("Użytkownik został wyciszony")
            .addFields(
                {
                    name: "Powód",
                    value: ctx.args.slice(2).join(" ") || "Brak"
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

        db.push(`${member.guild.id}_${member.id}_punish`,{
            id: ctx.message.id,
            name: "tempmute",
            reason: ctx.args.slice(2).join(" ")  || "Brak",
            author: ctx.message.author.tag
        })

        await ctx.sleep(timeParsed * 1000)

        db.delete(`${member.guild.id}_${member.id}_mute`)

        member.roles.remove(role)
            .catch(err => console.log(err))

        db.push(`${member.guild.id}_${member.id}_punish`,{
            id: msg.id,
            name: "auto unmute",
            reason: "Odciszony przez bota",
            author: ctx.client.user.tag
        })
    }
}