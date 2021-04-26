const {MessageEmbed} = require("discord.js")



module.exports = {
    name: "never-have-i-ever",
    description: "Pytania",
    use: "never-have-i-ever",
    run: async(ctx) => {
        const embed = new MessageEmbed()
            .setDescription(ctx.random("never-have-i-ever"))
            .setColor("DARK_PURPLE")

        ctx.message.reply(embed)
            .catch(err => console.log(err))
    }
}