const { posts } = require("rule34js")
const {MessageEmbed} = require("discord.js")
module.exports = {
    name: "rule34",
    run: async(client,message,args,prefix,errorNull) => {
        if(!message.channel.nsfw) {
            const embed = new MessageEmbed()
                .setTitle("🔞 Only NSFW Channel 🔞")
                .setColor("RED")

            return message.channel.send(embed)
                .catch(err => console.log(err))
        }

        if(!args[0])
            return message.channel.send(errorNull(this.name, "<text>"))
                .catch(err => console.log(err))

        const response = await posts({tags:[args[0]]})

        if(!response.posts) {
            const embed = new MessageEmbed()
                .setTitle("Nie znaleziono!")
                .setColor("RED")

            return message.channel.send(embed)
                .catch(err => console.log(err))
        }

        try {
            const values = response.posts
            const randomValue = values[parseInt(Math.random() * values.length)]
            const embed = new MessageEmbed()
                .setColor("DARK_PURPLE")
                .setImage(randomValue.file_url)
                .setTitle((args[0] || " ").toLowerCase())
                .setURL(randomValue.file_url)

            message.channel.send(embed)
                .catch(err => console.log(err))
        }catch(err) {
            const embed = new MessageEmbed()
                .setTitle("Nie znaleziono!")
                .setColor("RED")

            message.channel.send(embed)
                .catch(err => console.log(err))
        }
    }
}