const { MessageEmbed } = require("discord.js")
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
    name: "slowmode",
    run: async(client,message,args,pr,errorNull,errorPermissions,a,errorBotPermissions) => {
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
            const channel = message.mentions.channels.first() || message.channel
            if (!message.member.hasPermission("MANAGE_CHANNELS"))
                return message.channel.send(errorPermissions("ZARZĄDZANIE KANAŁAMI", "MANAGE_CHANNELS"))
            if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
                return message.channel.send(errorBotPermissions("ZARZĄDZANIE KANAŁAMI", "MANAGE_CHANNELS"))
            if (!((args[0] || " ").toLowerCase() == "disable" || (args[0] || " ").toLowerCase() == "enable"))
                return message.channel.send(errorNull("slowmode", "<disable/enable>"))
            if ((args[0] || " ").toLowerCase() == "disable") {
                message.channel.setRateLimitPerUser(0)
                const embed = new MessageEmbed()
                    .setTitle("Wyłączono slowmode!")
                    .setColor("DARK_PURPLE")
                return message.channel.send(embed)
            }
            const timedText = (args[1] || " ").toLowerCase() || " "

            const number = Math.floor(timedText.replace(/(^\d+)(.+$)/i, '$1'))
            const timeType = timedText.replace(/[^a-zA-Z]+/g, '') || NaN
            const timeParsed = number * time[timeType]
            if (!number || !time[timeType] || !timeType || !timeParsed)
                return message.channel.send(errorNull("slowmode", "enable <time+timeType(second/minute/hour)> <[channel]>"))
            if (timeParsed > 21600 || timeParsed <= 0) {
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Zbyt wielki/mały slowmode!")
                return message.channel.send(embed)
            }
            const embed = new MessageEmbed()
                .setColor("DARK_PURPLE")
                .setTitle("Gotowe!")
                .setDescription(`Slowmode ustawiono na ${timee(timeParsed)}`)
            message.channel.send(embed)
            channel.setRateLimitPerUser(timeParsed)
    }
}