const Discord = require("discord.js")
const NSFW = require("discord-nsfw")
const nsfw = new NSFW()

module.exports = {
    name: "boobs",
    run: async(client,message,args) => {
        if(!message.channel.nsfw) {
            const embed = new Discord.MessageEmbed()
                .setTitle("🔞 Only NSFW Channel 🔞")
                .setColor("RED")
            return message.channel.send(embed)
        }
        const image = await nsfw.boobs()
        const embed = new Discord.MessageEmbed()
            .setColor("DARK_PURPLE")
            .setImage(image)
            .setTitle("Boobs")
            .setURL(image.url)
        message.channel.send(embed)
    }
}