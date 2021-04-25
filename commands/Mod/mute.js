const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "mute",
    requirePermissions: ["MUTE_MEMBERS",["MANAGE_CHANNELS","MANAGE_ROLES"]],
    description: "Wycisza użytkownika",
    use: "mute <member> [reason]",
    run: async(ctx) => {
        const member = ctx.mention(0)
        const obj = { muted: { time: { date: undefined, sec: undefined }, check: undefined } }

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

        if(!member)
            return ctx.message.reply(ctx.errorNull("mute", "<member>"))

        const { muted } = db.get(`${member.guild.id}_${member.id}_mute`) || obj

        if(muted.check) {
            const embed = new MessageEmbed()
                .setTitle("Użytkownik jest już wyciszony!")
                .setDescription("Odcisz użytkownika aby nadać znowu wyciszenie")
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

        if(role.position >= ctx.message.guild.me.roles.cache.first().size) {
            const embed = new MessageEmbed()
                .setTitle("Rola nie można nadać!")
                .setDescription("Role którą chcesz wyciszyć jest na tej samej pozycji co moja lub większa")
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

        member.roles.add(role)
            .catch(err => console.log(err))

        db.set(`${member.guild.id}_${member.id}_mute`,{ muted: { time: { date: undefined, sec: undefined }, check: true } })

        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle("Gotowe!")
            .setDescription("Użytkownik został wyciszony")
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
            name: "mute",
            reason: ctx.args.slice(1).join(" ")  || "Brak",
            author: ctx.message.author.tag
        })
    }
}