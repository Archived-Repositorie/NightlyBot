const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "muted",
    requirePermissions: ["MANAGE_ROLES",["MANAGE_ROLES","MANAGE_CHANNELS"]],
    description: "Ustawia role wyciszenia",
    use: "muted <set-role/create/reload-role> <create/role/reload> <role>",
    run: async(ctx) => {
        const text = (ctx.args[0] || " ").toLowerCase()

        let role = ctx.message.mentions.roles.first() || ctx.message.guild.roles.cache.get(ctx.args.slice(0).join(" ")) || ""

        switch(text) {
            case "create": //option create

                role = db.get(`${ctx.message.guild.id}_muted`) || {id: undefined}

                if(ctx.message.guild.roles.cache.get(role.id)) {
                    const embed = new MessageEmbed()
                        .setTitle("Taka rola już istnieje!")
                        .setDescription("Jeśli rola nie blokuje wysyłania wiadomość wpisz komende `muted reload-role` lub zmniejsz permisje użytkownika")
                        .setColor("RED")

                    return ctx.message.reply(embed)
                        .catch(err => console.log(err))
                }

                role = await ctx.message.guild.roles.create(
                    {
                        data:
                            {
                                name: "muted",
                                color: "GREY"
                            },
                        reason: "Created muted role"
                    }
                    )
                    .catch(err => console.log(err))

                ctx.message.guild.channels.cache.forEach(channel => {
                    channel.updateOverwrite(role, { SEND_MESSAGES: false })
                        .catch(err => console.log(err))
                })

                db.set(`${ctx.message.guild.id}_muted`, {
                    id: role.id
                })

                const embed = new MessageEmbed()
                    .setColor("DARK_PURPLE")
                    .setTitle("Gotowe!")
                    .setDescription(`Rola ${role} została stworzona!`)

                ctx.message.reply(embed)
                    .catch(err => console.log(err))

                break;
            case "reload-role": //option reload-role

                role = db.get(`${ctx.message.guild.id}_muted`) || {id: undefined}
                role = ctx.message.guild.roles.cache.get(role.id)

                if(!role) {
                    const embed = new MessageEmbed()
                        .setTitle("Rola nie istnieje!")
                        .setDescription("Aby stworzyć role użyj komendy `muted create` lub `muted set-role`")
                        .setColor("RED")

                    return ctx.message.reply(embed)
                        .catch(err => console.log(err))
                }

                ctx.message.guild.channels.cache.forEach(channel => {
                    channel.updateOverwrite(role, { SEND_MESSAGES: false })
                        .catch(err => console.log(err))
                })

                const embed1 = new MessageEmbed()
                    .setColor("DARK_PURPLE")
                    .setTitle("Gotowe!")
                    .setDescription(`Rola ${role} została zaktualizowana!`)

                ctx.message.reply(embed1)
                    .catch(err => console.log(err))

                break;
            case "set-role": //option set-role
                if(!role)
                    return ctx.message.reply(ctx.errorNull("muted", "set-role <role>"))
                        .catch(err => console.log(err))

                if(role.position >= ctx.message.member.roles.cache.first.position) {
                    const embed = new MessageEmbed()
                        .setTitle("Rola nie może zostać ustawiona!")
                        .setDescription("Role którą chcesz ustawić jest na tej samej pozycji co twoja lub większa")
                        .setColor("RED")

                    return ctx.message.reply(embed)
                        .catch(err => console.log(err))
                }

                if(role.position >= ctx.message.member.roles.cache.first.position) {
                    const embed = new MessageEmbed()
                        .setTitle("Rola nie może zostać ustawiona!")
                        .setDescription("Role którą chcesz ustawić jest na tej samej pozycji co moja lub większa")
                        .setColor("RED")

                    return ctx.message.reply(embed)
                        .catch(err => console.log(err))
                }

                db.set(`${ctx.message.guild.id}_muted`, {
                    id: role.id
                })

                const embed2 = new MessageEmbed()
                    .setColor("DARK_PURPLE")
                    .setTitle("Gotowe!")
                    .setDescription(`Rola ${role} została ustawiona!`)

                ctx.message.reply(embed2)
                    .catch(err => console.log(err))

                break;
            default:

                ctx.message.reply(ctx.errorNull("muted", "<set-role/create/reload-role>"))
                    .catch(err => console.log(err))
        }
    }
}
