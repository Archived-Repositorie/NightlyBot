const {MessageEmbed} = require("discord.js")

const sleep = t => new Promise(r => setTimeout(r, t))

function timee(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " godzine" : " godzin") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute" : " minut") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " sekunde" : " sekund") : "";
    return hDisplay + mDisplay + sDisplay;
}


module.exports = {
    name: "tempban",
    run: async(client,message,args,pr,errorNull,errorPermissions,a,errorBotPermissions) => {
        const member = message.mentions.members.first()

        const time = {
            "s": 1,
            "sec": 1,
            "second": 1,
            "m": 60,
            "min": 60,
            "minute": 60,
            "h": 3600,
            "hr": 3600,
            "hour": 3600
        }


        if (!message.member.hasPermission("BAN_MEMBERS"))
            return message.reply(errorPermissions("BANOWANIE UŻYTKOWNIKÓW", "BAN_MEMBERS"))
                .catch(err => console.log(err))

        if (!message.guild.me.hasPermission("BAN_MEMBERS"))
            return message.reply(errorBotPermissions("BANOWANIE UŻYTKOWNIKÓW", "BAN_MEMBERS"))
                .catch(err => console.log(err))

        if(!member)
            return message.reply(errorNull("tempban", "<member>"))
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

        const timedText = (args[1] || " ").toLowerCase() || " "
        const number = Math.floor(timedText.replace(/(^\d+)(.+$)/i, '$1'))
        const timeType = timedText.replace(/[^a-zA-Z]+/g, '') || NaN
        const timeParsed = number * time[timeType]

        if (!number || !time[timeType] || !timeType || !timeParsed)
            return message.reply(errorNull("tempban", "<member> <time+timeType(second/minute/hour)>"))

        member.ban({
            reason: args.slice(2).join(" ")  || "Brak"
        })
            .catch(err => console.log(err))

        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle("Gotowe!")
            .setDescription("Użytkownik został zablokowany")
            .addFields(
                {
                    name: "Powód",
                    value: args.slice(2).join(" ")  || "Brak"
                },
                {
                    name: "Czas",
                    value: timee(timeParsed)
                },
                {
                    name: "Użytkownik",
                    value: member
                }
            )

        message.reply(embed)

        await sleep(timeParsed * 1000)

        message.guild.members.unban(member, "Unbanned by bot").catch(err => console.log(err))
    }
}