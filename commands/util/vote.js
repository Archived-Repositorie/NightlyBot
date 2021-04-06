const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "vote",
    run: async(client,message,args) => {
        const embed = new MessageEmbed()
            .setTitle("Zagłosuj na bota!")
            .setDescription("https://dlist.top/bots/622478358780837898")
            .setURL("https://dlist.top/bots/622478358780837898")
            .setColor("DARK_PURPLE")

        message.reply(embed)
            .catch(err => console.log(err))
    }
}
