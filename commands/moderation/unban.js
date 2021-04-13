const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "unban",
    requirePermissions: ["BAN_MEMBERS","BAN_MEMBERS"],
    run: async(client,message,args,errorNull) => {
        const memberID = args[0]
        const bans = await message.guild.fetchBans()
        const member = bans.get(memberID)

        if(!memberID)
            return message.reply(errorNull("unban", "<memberID>"))
                .catch(err => console.log(err))

        if(bans.size < 1 || !member) {
            const embed = new MessageEmbed()
                .setTitle("Nie można odblokować!")
                .setDescription("Użytkownik nie jest zablokowany lub nie podałes poprawnego ID")
                .setColor("RED")

            return message.reply(embed)
                .catch(err => console.log(err))
        }

        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle("Gotowe!")
            .setDescription("Użytkownik został odblokowany")
            .addFields(
                {
                    name: "Powód",
                    value: args.slice(1).join(" ")  || "Brak"
                },
                {
                    name: "Użytkownik",
                    value: `<@${memberID}>`
                }
            )

        message.reply(embed)
            .catch(err => console.log(err))
        message.guild.members.unban(member.user.id,args.slice(1).join(" ")  || "Brak")
            .catch(err => console.log(err))
        db.push(`${member.guild.id}_${member.id}_punish`,{
            id: message.id,
            name: "unban",
            reason: args.slice(1).join(" ")  || "Brak",
            author: message.author.tag
        })
    }
}