const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "help",
    run: async(client,message,args) => {
        function styled(string) {
            return "```\n" + string.split(" ").join("\n") + "```"
        }

        const embed = new MessageEmbed()
            .setTitle("Lista komend")
            .setColor("DARK_PURPLE")
            .setThumbnail(client.user.avatarURL())
            .addFields(
                {
                    name: "Util",
                    value: styled("help invite tags"),
                    inline: true
                },
                {
                    name: "Info",
                    value: styled("channelinfo roleinfo serverinfo userinfo"),
                    inline: true
                },
                {
                    name: "Mod",
                    value: styled("slowmode muted mute tempmute warn ban unban tempban kick userlogs deluserlog"),
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
                }
            )

        if(message.channel.nsfw)
            embed
                .addFields(
                    {
                        name: "NSFW",
                        value: styled("anal ass boobs rule34"),
                        inline: true
                    }
                    )

        message.reply(embed)
            .catch(err => console.log(err))
    }
}
