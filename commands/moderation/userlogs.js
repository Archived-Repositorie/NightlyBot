const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "userlogs",
    run: async(ctx) => {
        const member = ctx.mention(0) || ctx.message.member
        let number = ctx.args.slice(1).join(" ") * 1

        if(!number)
            number = 0

        const warns = db.get(`${member.guild.id}_${member.id}_punish`) || []
        let numberPage = ctx.paginate(warns,5)
        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle(`Lista zdarzeń #${number}`)
            .setFooter("Użyj userlogs <member> <numberOfCategory> do zobaczenia większej ilość zdarzeń na użytkowniku")
            .setDescription(member)

        try {
            for (let i = 0; i < numberPage[number].length; i++) {
                const x = i + (5 * number)
                const punish = numberPage[number][i]

                embed.addField(`${punish.name}#${punish.id} przez ${punish.author} `, punish.reason)
            }

        } catch(err) {
            err
        }

        ctx.message.reply(embed)
            .catch(err => console.log(err))
    }
}
