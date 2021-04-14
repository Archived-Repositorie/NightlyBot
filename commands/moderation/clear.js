const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "clear",
    requirePermissions: ["MANAGE_MESSAGES","MANAGE_MESSAGES"],
    run: async(ctx) => {
        const number = ctx.args[0]*1

        if(!number || number < 0 || number > 101)
            return ctx.message.reply(ctx.errorNull("clear", "<number ↑1 ↓100>"))
                .catch(err => console.log(err))

        ctx.message.channel.bulkDelete(number, true)
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

        ctx.message.reply(embed)
            .catch(err => console.log(err))
    }
}