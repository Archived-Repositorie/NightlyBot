const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "clear",
    run: async(client,message,args,pr,errorNull,errorPermissions,a,errorBotPermissions) => {
        const number = args[0]*1

        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply(errorPermissions("ZARZĄDZANIE WIADOMOŚCIAMI", "MANAGE_MESSAGES"))
                .catch(err => console.log(err))

        if(!number || number < 0 || number > 101)
            return message.reply(errorNull("delwarn", "<number ↑1 ↓100>"))
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