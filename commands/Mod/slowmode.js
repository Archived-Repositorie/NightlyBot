const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "slowmode",
    requirePermissions: ["MANAGE_CHANNELS","MANAGE_CHANNELS"],
    description: "Nadaje spowolnienie na kanał",
    use: "slowmode <time+timeType(second/minute/hour)> [channel]",
    run: async(ctx) => {
            const channel = ctx.message.mentions.channels.first() || ctx.message.channel
            const switchs = {
                "disable": true,
                "enable": true
            }
            if (!switchs[ctx.args[0]])
                return ctx.message.reply(ctx.errorNull("slowmode", "<disable/enable>"))
                    .catch(err => console.log(err))

            if ((ctx.args[0] || " ").toLowerCase() == "disable") {
                ctx.message.channel.setRateLimitPerUser(0)
                    .catch(err => console.log(err))

                const embed = new MessageEmbed()
                    .setTitle("Wyłączono slowmode!")
                    .setColor("DARK_PURPLE")

                return ctx.message.reply(embed)
                    .catch(err => console.log(err))
            }

            const timedText = (ctx.args[1] || " ").toLowerCase() || " "
            const number = Math.floor(timedText.replace(/(^\d+)(.+$)/i, '$1'))
            const timeType = timedText.replace(/[^a-zA-Z]+/g, '') || NaN
            const timeParsed = number * ctx.timeTest[timeType]

            if (!number || !ctx.timeTest[timeType] || !timeType || !timeParsed)
                return ctx.message.reply(ctx.errorNull("slowmode", "enable <time+timeType(second/minute/hour)> <[channel]>"))
                    .catch(err => console.log(err))

            if (timeParsed > 21600 || timeParsed <= 0) {
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Zbyt wielki/mały slowmode!")

                return ctx.message.reply(embed)
                    .catch(err => console.log(err))
            }
            const embed = new MessageEmbed()
                .setColor("DARK_PURPLE")
                .setTitle("Gotowe!")
                .setDescription(`Slowmode ustawiono na ${ctx.time(timeParsed)}`)

            ctx.message.reply(embed)
                .catch(err => console.log(err))

            channel.setRateLimitPerUser(timeParsed).catch(err => console.log(err))
                .catch(err => console.log(err))
    }
}