const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "suggest",
    run: async(client,message,args,pr,errorNull) => {
        const switched = db.get(`${message.guild.id}_switch_suggests`)

        if (switched != 1) {

            const embed = new MessageEmbed()
                .setTitle("Nie ustawiono kanału!")
                .setColor("DARK_PURPLE")

            return message.channel.send(embed)
                .catch(err => console.log(err))
        }

        const text = args.join(" ")

        if (!text)
            return message.channel.send(errorNull("suggest", "<text>"))
                .catch(err => console.log(err))

        const channel = db.get(`${message.guild.id}_suggests`)
        const embed = new MessageEmbed()
            .setColor(message.member.displayHexColor)
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setDescription(text)

        message.guild.channels.cache.get(channel.id).send(embed)
            .catch(err => console.log(err))
    }
}