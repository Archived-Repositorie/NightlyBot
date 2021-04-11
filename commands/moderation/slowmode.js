const {MessageEmbed} = require("discord.js")
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
    requirePermissions: ["MANAGE_CHANNELS","MANAGE_CHANNELS"],
    run: async(client,message,args,pr,errorNull) => {
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

            if (!((args[0] || " ").toLowerCase() == "disable" || (args[0] || " ").toLowerCase() == "enable"))
                return message.reply(errorNull("slowmode", "<disable/enable>"))
                    .catch(err => console.log(err))

            if ((args[0] || " ").toLowerCase() == "disable") {
                message.channel.setRateLimitPerUser(0)
                    .catch(err => console.log(err))

                const embed = new MessageEmbed()
                    .setTitle("Wyłączono slowmode!")
                    .setColor("DARK_PURPLE")

                return message.reply(embed)
                    .catch(err => console.log(err))
            }

            const timedText = (args[1] || " ").toLowerCase() || " "
            const number = Math.floor(timedText.replace(/(^\d+)(.+$)/i, '$1'))
            const timeType = timedText.replace(/[^a-zA-Z]+/g, '') || NaN
            const timeParsed = number * time[timeType]

            if (!number || !time[timeType] || !timeType || !timeParsed)
                return message.reply(errorNull("slowmode", "enable <time+timeType(second/minute/hour)> <[channel]>"))
                    .catch(err => console.log(err))

            if (timeParsed > 21600 || timeParsed <= 0) {
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Zbyt wielki/mały slowmode!")

                return message.reply(embed)
                    .catch(err => console.log(err))
            }
            const embed = new MessageEmbed()
                .setColor("DARK_PURPLE")
                .setTitle("Gotowe!")
                .setDescription(`Slowmode ustawiono na ${timee(timeParsed)}`)

            message.reply(embed)
                .catch(err => console.log(err))

            channel.setRateLimitPerUser(timeParsed).catch(err => console.log(err))
                .catch(err => console.log(err))
    }
}