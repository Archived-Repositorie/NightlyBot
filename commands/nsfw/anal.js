const {MessageEmbed} = require("discord.js")
const NSFW = require("discord-nsfw")
const nsfw = new NSFW()

module.exports = {
    name: "anal",
    description: "NSFW",
    use: "anal",
    run: async(ctx) => {
        if(!ctx.message.channel.nsfw) {
            const embed = new MessageEmbed()
                .setTitle("🔞 Only NSFW Channel 🔞")
                .setColor("RED")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))

        }

        const image = await nsfw.anal()
        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setImage(image)
            .setTitle("Anal")
            .setURL(image.url)

        ctx.message.reply(embed)
            .catch(err => console.log(err))
    }
}