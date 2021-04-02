const {MessageEmbed} = require("discord.js")
const NSFW = require("discord-nsfw")
const nsfw = new NSFW()

module.exports = {
    name: "anal",
    run: async(client,message,args) => {
        if(!message.channel.nsfw) {
            const embed = new MessageEmbed()
                .setTitle("🔞 Only NSFW Channel 🔞")
                .setColor("RED")

            return message.channel.send(embed)
                .catch(err => console.log(err))

        }

        const image = await nsfw.anal()
        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setImage(image)
            .setTitle("Anal")
            .setURL(image.url)

        message.channel.send(embed)
            .catch(err => console.log(err))
    }
}