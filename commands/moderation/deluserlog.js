const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

function delArray(arr, value) {
    return arr.filter(function(ele){
        return ele.id != value
    })
}

function unpush(thing = 0,base) {
    let things = db.get(base)
    console.log(delArray(things, thing))
    db.set(base,delArray(things, thing))
}
db.unpush = unpush

module.exports = {
    name: "deluserlog",
    requirePermissions: ["ADMINISTRATOR"],
    run: async(ctx) => {
        const member = ctx.message.mentions.members.first()
        const number = ctx.args[1] * 1

        if(!member)
            return ctx.message.reply(ctx.errorNull("deluserlog", "<id>"))
                .catch(err => console.log(err))

        if(number != 0 && !number)
            return ctx.message.reply(ctx.errorNull("deluserlog", "<member> <id>"))
                .catch(err => console.log(err))

        const warns = db.get(`${member.guild.id}_${member.id}_punish`) || []

        if(warns.length <= 0) {
            const embed = new MessageEmbed()
                .setTitle("Użytkownik nie posiada zdarzeń!")
                .setColor("RED")

            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        if(!warns.filter(arr => arr.id == number)) {
            const embed = new MessageEmbed()
                .setTitle("Takie ostrzeżenie nie istnieje!")
                .setColor("RED")
            return ctx.message.reply(embed)
                .catch(err => console.log(err))
        }

        db.unpush(number,`${member.guild.id}_${member.id}_punish`)

        const embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle("Gotowe!")
            .setDescription("Użytkownikowi zostało usunięte zdarzenie")
            .addFields(
                {
                    name: "Użytkownik",
                    value: member
                },
                {
                    name: "ID",
                    value: number
                }
            )

        ctx.message.reply(embed)
            .catch(err => console.log(err))
    }
}