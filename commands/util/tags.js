const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "tags",
    run: async(client,message,args) => {
        function styled(string) {
            return "```\n" + string.split(" ").join("\n") + "```"
        }
        const embed = new MessageEmbed()
            .setTitle("Lista CMD tagów")
            .setColor("DARK_PURPLE")
            .addFields(
                {
                    name: "Guild",
                    value: styled("#guild.name# #guild.members# #guild.icon# #guild.createdAt#"),
                    inline: true
                },
                {
                    name: "Member",
                    value: styled("#member.name# #member.mention# #member.tag# #member.id# #member.name# #member.joinedAt# #member.createdAt# #member.avatar#"),
                    inline: true
                }
            )
        message.channel.send(embed)
    }
}