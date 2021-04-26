const { posts } = require("rule34js")
const {MessageEmbed} = require("discord.js")
module.exports = {
    name: "rule34",
    description: "NSFW",
    use: "rule34 <text>",
    run: async(ctx) => {
        if(!ctx.message.channel.nsfw) {
            const embed = new MessageEmbed()
                .setTitle("🔞 Only NSFW Channel 🔞")
                .setColor("RED")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        if(!ctx.args[0])
            return ctx.message.reply(ctx.errorNull("rule34", "<text>"))
                .catch(err => console.log(err))

        const response = await posts({tags:[ctx.args[0]]})

        if(!response.posts) {
            const embed = new MessageEmbed()
                .setTitle("Nie znaleziono!")
                .setColor("RED")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        try {
            const values = response.posts
            const randomValue = values[parseInt(Math.random() * values.length)]
            const embed = new MessageEmbed()
                .setColor("DARK_PURPLE")
                .setImage(randomValue.file_url)
                .setTitle((ctx.args[0] || " ").toLowerCase())
                .setURL(randomValue.file_url)

            ctx.message.reply(embed)
                .catch(err => console.log(err))
        }catch(err) {
            const embed = new MessageEmbed()
                .setTitle("Nie znaleziono!")
                .setColor("RED")

            ctx.message.reply(embed)
                .catch(err => console.log(err))
        }
    }
}