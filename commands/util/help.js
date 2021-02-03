const Discord = require("discord.js")

module.exports = {
    name: "help",
    run: async(client,message,args,prefix) => {
        function styled(string) {
            return "```\n" + string.split(" ").join("\n") + "```"
        }
        const embed = new Discord.MessageEmbed()
            .setTitle("Lista komend")
            .setColor("DARK_PURPLE")
            .setThumbnail(client.user.avatarURL())
            .addFields(
                {
                    name: "Util",
                    value: styled("help invite tags vote"),
                    inline: true
                },
                {
                    name: "Info",
                    value: styled("channelinfo roleinfo serverinfo userinfo"),
                    inline: true
                },
                {
                    name: "Mod",
                    value: styled("slowmode"),
                    inline: true
                },
                {
                    name: "Serwer",
                    value: styled("joinmsg leavemsg prefix suggest suggests"),
                    inline: true
                },
                {
                  name: "4Fun",
                  value: styled("counting dad-jokes dog never-have-i-ever"),
                    inline: true
                },
                {
                    name: "NSFW",
                    value: styled("anal ass boobs rule34"),
                    inline: true
                }
            )
        message.channel.send(embed)
    }
}