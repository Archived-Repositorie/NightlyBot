const Discord = require("discord.js")

module.exports = {
    name: "help",
    run: async(client,message,args,prefix) => {
        function styled(string) {
            return "```\n" + string.split(" ").join("\n") + "```"
        }
        const embed = new Discord.MessageEmbed()
            .setTitle("lista komend")
            .setColor("DARK_PURPLE")
            .setThumbnail(client.user.avatarURL())
            .addFields(
                {
                    name: "Util",
                    value: styled("help invite vote")
                },
                {
                    name: "Info",
                    value: styled("channelinfo roleinfo serverinfo userinfo")
                },
                {
                    name: "Serwer",
                    value: styled("joinmsg leavemsg prefix suggest suggests")
                },
                {
                    name: "NSFW",
                    value: styled("anal ass boobs rule34")
                }
            )
        const embed2 = new Discord.MessageEmbed()
            .setTitle("lista cmd tagów")
            .setColor("DARK_PURPLE")
            .addFields(
                {
                    name: "Guild",
                    value: styled("#guild.name# #guild.members# #guild.icon# #guild.createdAt#")
                },
                {
                    name: "Member",
                    value: styled("#member.name# #member.mention# #member.tag# #member.id# #member.name# #member.joinedAt# #member.createdAt#")
                }
            )
        message.channel.send(embed)
        message.channel.send(embed2)
    }
}