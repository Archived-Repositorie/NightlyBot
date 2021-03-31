const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "mute",
    run: async(client,message,args,pr,errorNull,errorPermissions,a,errorBotPermissions) => {
        const member = message.mentions.members.first()
        const obj = {
            muted: {
                time: {
                    date: undefined,
                    sec: undefined
                },
                check: undefined
            }
        }

        if (!message.member.hasPermission("MUTE_MEMBERS"))
            return message.channel.send(errorPermissions("WYCISZANIE UŻYTKOWNIKÓW", "MUTE_MEMBERS"))
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
            return message.channel.send(errorBotPermissions("ZARZĄDZANIE KANAŁAMI", "MANAGE_CHANNELS"))
        const roleId = db.get(`${message.guild.id}_muted`) || {id: undefined}
        const role = message.guild.roles.cache.get(roleId.id)
        if(!role) {
            const embed = new MessageEmbed()
                .setTitle("Rola nie istnieje!")
                .setDescription("Aby stworzyć role użyj komendy `muted create` lub `muted set-role`")
                .setColor("RED")
            return message.channel.send(embed)
        }
        if(role.position >= message.guild.me.roles.cache.first().size) {
            const embed = new MessageEmbed()
                .setTitle("Rola nie można nadać!")
                .setDescription("Role którą chcesz wyciszyć jest na tej samej pozycji co moja lub większa")
                .setColor("RED")
            return message.channel.send(embed)
        }
        if(!member)
            return message.channel.send(errorNull("mute", "<member>"))
        const mutedMember = { muted } = db.get(`${member.guild.id}_${member.id}_mute`) || obj
        if(mutedMember.check) {
            const embed = new MessageEmbed()
                .setTitle("Użytkownik jest już wyciszony!")
                .setDescription("Odcisz użytkownika aby nadać znowu wyciszenie")
                .setColor("RED")
            return message.channel.send(embed)
        }
        if(member.roles.cache.first().position >= message.member.roles.cache.first().position) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadasz permisji!")
                .setDescription("Twoja rola jest zbyt nisko do użytkowna którego chcesz wyciszyć")
                .setColor("RED")
            return message.channel.send(embed)
        }
        if(member.hasPermission("ADMINISTRATOR")) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadasz permisji!")
                .setDescription("Użytkownik posiada permisje ADMINISTRATOR(ADMINISTRATOR)")
                .setColor("RED")
            return message.channel.send(embed)
        }
        member.roles.add(role).catch(err => console.log(err))
        db.set(`${member.guild.id}_${member.id}_mute`,{
            muted: {
                time: {
                    date: undefined,
                    sec: undefined
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
                    value: args.slice(1).join(" ")  || "Brak"
                },
                {
                    name: "Użytkownik",
                    value: member
                }
                )
        message.channel.send(embed)
    }
}