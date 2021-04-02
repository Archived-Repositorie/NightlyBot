const {MessageEmbed} = require("discord.js")
const fetch = require('node-fetch')

module.exports = {
    name: "dog",
    run: async(client,message,args) => {
        const image = await fetch("https://dog.ceo/api/breeds/image/random").then(response => response.json())
            .catch(err => console.log(err))
        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setImage(image.message)
            .setTitle("Piesek")
            .setURL(image.message)

        message.channel.send(embed)
            .catch(err => console.log(err))
    }
}