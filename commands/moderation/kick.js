const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "kick",
    run: async(client,message,args,pr,errorNull,errorPermissions,a,errorBotPermissions) => {
        const member = message.mentions.members.first()

        if (!message.member.hasPermission("KICK_MEMBERS"))
            return message.channel.send(errorPermissions("WYRZUCANIE UŻYTKOWNIKÓW", "KICK_MEMBERS"))
        if (!message.guild.me.hasPermission("KICK_MEMBERS"))
            return message.channel.send(errorBotPermissions("WYRZUCANIE UŻYTKOWNIKÓW", "KICK_MEMBERS"))
        if(!member)
            return message.channel.send(errorNull("kick", "<member>"))
        if(member.roles.cache.first().position >= message.member.roles.cache.first().position) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadasz permisji!")
                .setDescription("Twoja rola jest zbyt nisko do użytkowna którego chcesz wyrzucić")
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
        if(!member.kickable) {
            const embed = new MessageEmbed()
                .setTitle("Nie posiadam permisji!")
                .setDescription("Użytkownik jest niemożliwy do wyrzucenia")
                .setColor("RED")
            return message.channel.send(embed)
        }
        member.kick(args.slice(1).join(" ")  || "Brak").catch(err => console.log(err))
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
        message.channel.send(embed)
    }
}