const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "muted",
    run: async(client,message,args,pr,errorNull,errorPermissions,a,errorBotPermissions) => {
        const text = (args[0] || " ").toLowerCase()

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args.slice(0).join(" ")) || ""

        if (!message.member.hasPermission("MANAGE_ROLES"))
            return message.reply(errorPermissions("ZARZĄDZANIE ROLAMI", "MANAGE_ROLES"))
                .catch(err => console.log(err))

        if (!message.guild.me.hasPermission(["MANAGE_CHANNELS","MANAGE_ROLES"]))
            return message.reply(errorBotPermissions("ZARZĄDZANIE KANAŁAMI,ZARZĄDZANIE ROLAMI", "MANAGE_CHANNELS,MANAGE_ROLES"))
                .catch(err => console.log(err))

        switch(text) {
            case "create": //option create

                role = db.get(`${message.guild.id}_muted`) || {id: undefined}

                if(message.guild.roles.cache.get(role.id)) {
                    const embed = new MessageEmbed()
                        .setTitle("Taka rola już istnieje!")
                        .setDescription("Jeśli rola nie blokuje wysyłania wiadomość wpisz komende `muted reload-role` lub zmniejsz permisje użytkownika")
                        .setColor("RED")

                    return message.reply(embed)
                        .catch(err => console.log(err))
                }

                role = await message.guild.roles.create(
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

                message.guild.channels.cache.forEach(channel => {
                    channel.updateOverwrite(role, { SEND_MESSAGES: false })
                        .catch(err => console.log(err))
                })
                    .catch(err => console.log(err))

                db.set(`${message.guild.id}_muted`, {
                    id: role.id
                })

                const embed = new MessageEmbed()
                    .setColor("DARK_PURPLE")
                    .setTitle("Gotowe!")
                    .setDescription(`Rola ${role} została stworzona!`)

                message.reply(embed)
                    .catch(err => console.log(err))

                break;
            case "reload-role": //option reload-role

                role = db.get(`${message.guild.id}_muted`) || {id: undefined}
                role = message.guild.roles.cache.get(role.id)

                if(!role) {
                    const embed = new MessageEmbed()
                        .setTitle("Rola nie istnieje!")
                        .setDescription("Aby stworzyć role użyj komendy `muted create` lub `muted set-role`")
                        .setColor("RED")

                    return message.reply(embed)
                        .catch(err => console.log(err))
                }

                message.guild.channels.cache.forEach(channel => {
                    channel.updateOverwrite(role, { SEND_MESSAGES: false })
                        .catch(err => console.log(err))
                })
                    .catch(err => console.log(err))

                const embed1 = new MessageEmbed()
                    .setColor("DARK_PURPLE")
                    .setTitle("Gotowe!")
                    .setDescription(`Rola ${role} została zaktualizowana!`)

                message.reply(embed1)
                    .catch(err => console.log(err))

                break;
            case "set-role": //option set-role
                if(!role)
                    return message.reply(errorNull("muted", "set-role <role>"))
                        .catch(err => console.log(err))

                if(role.position >= message.member.roles.cache.first.position) {
                    const embed = new MessageEmbed()
                        .setTitle("Rola nie może zostać ustawiona!")
                        .setDescription("Role którą chcesz ustawić jest na tej samej pozycji co twoja lub większa")
                        .setColor("RED")

                    return message.reply(embed)
                        .catch(err => console.log(err))
                }

                if(role.position >= message.member.roles.cache.first.position) {
                    const embed = new MessageEmbed()
                        .setTitle("Rola nie może zostać ustawiona!")
                        .setDescription("Role którą chcesz ustawić jest na tej samej pozycji co moja lub większa")
                        .setColor("RED")

                    return message.reply(embed)
                        .catch(err => console.log(err))
                }

                db.set(`${message.guild.id}_muted`, {
                    id: role.id
                })

                const embed2 = new MessageEmbed()
                    .setColor("DARK_PURPLE")
                    .setTitle("Gotowe!")
                    .setDescription(`Rola ${role} została ustawiona!`)

                message.reply(embed2)
                    .catch(err => console.log(err))

                break;
            default:

                message.reply(errorNull("muted", "<set-role/create/reload-role>"))
                    .catch(err => console.log(err))
        }
    }
}
