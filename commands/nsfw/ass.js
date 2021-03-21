const { MessageEmbed } = require("discord.js")
const NSFW = require("discord-nsfw")
const nsfw = new NSFW()

module.exports = {
    name: "ass",
    run: async(client,message,args) => {
        if(!message.channel.nsfw) {
            const embed = new MessageEmbed()
                .setTitle("🔞 Only NSFW Channel 🔞")
                .setColor("RED")
            return message.channel.send(embed)
        }
        const image = await nsfw.ass()
        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setImage(image)
            .setTitle("Ass")
            .setURL(image.url)
        message.channel.send(embed)
    }
}