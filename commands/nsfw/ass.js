const {MessageEmbed} = require("discord.js")
const NSFW = require("discord-nsfw")
const nsfw = new NSFW()

module.exports = {
    name: "ass",
    description: "NSFW",
    use: "ass",
    run: async(ctx) => {
        if(!ctx.message.channel.nsfw) {
            const embed = new MessageEmbed()
                .setTitle("🔞 Only NSFW Channel 🔞")
                .setColor("RED")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        const image = await nsfw.ass()
        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setImage(image)
            .setTitle("Ass")
            .setURL(image.url)

        ctx.message.reply(embed)
            .catch(err => console.log(err))
    }
}