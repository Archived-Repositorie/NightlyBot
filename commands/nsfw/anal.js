const Discord = require("discord.js")
const NSFW = require("discord-nsfw")
const nsfw = new NSFW()

module.exports = {
    name: "anal",
    run: async(client,message,args) => {
        if(!message.channel.nsfw) {
            const embed = new Discord.MessageEmbed()
                .setTitle("🔞 Only NSFW Channel 🔞")
                .setColor("RED")
            return message.channel.send(embed)
        }
        const image = await nsfw.anal()
        const embed = new Discord.MessageEmbed()
            .setColor("DARK_PURPLE")
            .setImage(image)
            .setTitle("Anal")
            .setURL(image.url)
        message.channel.send(embed)
    }
}