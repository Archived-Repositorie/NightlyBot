const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

function paginate(arr, size) {
    return arr.reduce((acc, val, i) => {
        let idx = Math.floor(i / size)
        let page = acc[idx] || (acc[idx] = [])
        page.push(val)
        return acc
    }, [])
}

module.exports = {
    name: "userlogs",
    run: async(client,message,args) => {
        const member = message.mentions.members.first() || message.member
        let number = args.slice(1).join(" ") * 1

        if(!number)
            number = 0

        const warns = db.get(`${member.guild.id}_${member.id}_punish`) || []
        let numberPage = paginate(warns,5)
        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle(`Lista zdarzeń #${number}`)
            .setFooter("Użyj userlogs <member> <numberOfCategory> do zobaczenia większej ilość zdarzeń na użytkowniku")
            .setDescription(member)

        try {
            for (var i = 0; i < numberPage[number].length; i++) {
                const x = i + (5 * number)
                const punish = numberPage[number][i]

                embed.addField(`${punish.name}#${punish.id} przez ${punish.author} `, punish.reason)
            }

        } catch(err) {
            err
        }

        message.reply(embed)
            .catch(err => console.log(err))
    }
}
