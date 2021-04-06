const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

function unpush(thing = 0,base) {
    let things = db.get(base)
    things.splice(thing,1)
    db.set(base,things)
}
db.unpush = unpush

module.exports = {
    name: "delwarn",
    run: async(client,message,args,pr,errorNull,errorPermissions,a,errorBotPermissions) => {
        const member = message.mentions.members.first()
        const number = args[1] * 1

        if (!message.member.hasPermission("VIEW_AUDIT_LOG"))
            return message.reply(errorPermissions("WYŚWIETLANIE DZIENNIKA ZDARZEŃ", "VIEW_AUDIT_LOG"))
                .catch(err => console.log(err))

        if(!member)
            return message.reply(errorNull("delwarn", "<member>"))
                .catch(err => console.log(err))

        if(number != 0 && !number)
            return message.reply(errorNull("delwarn", "<member> <number>"))
                .catch(err => console.log(err))

        const warns = db.get(`${member.guild.id}_${member.id}_warns`)

        if(warns.length <= 0) {
            const embed = new MessageEmbed()
                .setTitle("Użytkownik nie posiada ostrzeżeń!")
                .setColor("RED")

            return message.reply(embed)
                .catch(err => console.log(err))
        }

        if(number >= warns.length) {
            const embed = new MessageEmbed()
                .setTitle("Takie ostrzeżenie nie istnieje!")
                .setColor("RED")
            return message.reply(embed)
                .catch(err => console.log(err))
        }

        db.unpush(number,`${member.guild.id}_${member.id}_warns`)

        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle("Gotowe!")
            .setDescription("Użytkownikowi zostało usunięte ostrzeżenie")
            .addFields(
                {
                    name: "Użytkownik",
                    value: member
                },
                {
                    name: "Numer",
                    value: number
                }
            )

        message.reply(embed)
            .catch(err => console.log(err))
    }
}