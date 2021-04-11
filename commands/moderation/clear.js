const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "clear",
    requirePermissions: ["MANAGE_MESSAGES","MANAGE_MESSAGES"],
    run: async(client,message,args,pr,errorNull) => {
        const number = args[0]*1

        if(!number || number < 0 || number > 101)
            return message.reply(errorNull("clear", "<number ↑1 ↓100>"))
                .catch(err => console.log(err))

        message.channel.bulkDelete(number, true)
            .catch(err => console.log(err))

        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle("Gotowe!")
            .setDescription("Wyczyszczono wiadomość na kanale")
            .addFields(
                {
                    name: "Podana liczba",
                    value: number
                }
            )

        message.reply(embed)
            .catch(err => console.log(err))
    }
}