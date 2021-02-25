const { posts } = require("rule34js")
const Discord = require("discord.js")
module.exports = {
    name: "rule34",
    run: async(client,message,args,prefix,errorNull) => {
        if(!message.channel.nsfw) {
            const embed = new Discord.MessageEmbed()
                .setTitle("🔞 Only NSFW Channel 🔞")
                .setColor("RED")
            return message.channel.send(embed)
        }
        if(!args[0]) return message.channel.send(errorNull(this.name, "<text>"))
        const response = await posts({tags:[args[0]]})
        if(!response.posts) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Nie znaleziono!")
                .setColor("RED")
            return message.channel.send(embed)
        }
        try {
            const values = response.posts
            const randomValue = values[parseInt(Math.random() * values.length)]
            const embed = new Discord.MessageEmbed()
                .setColor("DARK_PURPLE")
                .setImage(randomValue.file_url)
                .setTitle((args[0] || " ").toLowerCase())
                .setURL(randomValue.file_url)
            message.channel.send(embed)
        }catch(err) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Nie znaleziono!")
                .setColor("RED")
                .setFooter("NightlyBot 2020")
            message.channel.send(embed)
        }
    }
}