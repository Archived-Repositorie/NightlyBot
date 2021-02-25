const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "muted",
    run: async(client,message,args,pr,errorNull,errorPermissions,a,errorBotPermissions) => {
        const text = (args[0] || " ").toLowerCase()
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args.slice(0).join(" ")) || ""
        if (!message.member.hasPermission("MANAGE_ROLES"))
            return message.channel.send(errorPermissions("ZARZĄDZANIE ROLAMI", "MANAGE_ROLES"))
        if (!message.guild.me.hasPermission(["MANAGE_CHANNELS","MANAGE_ROLES"]))
            return message.channel.send(errorBotPermissions("ZARZĄDZANIE KANAŁAMI,ZARZĄDZANIE ROLAMI", "MANAGE_CHANNELS,MANAGE_ROLES"))
        switch(text) {
            case "create": //option create
                role = db.get(`${message.guild.id}_muted`) || {id: undefined}
                if(message.guild.roles.cache.get(role.id)) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Taka rola już istnieje!")
                        .setDescription("Jeśli rola nie blokuje wysyłania wiadomość wpisz komende `muted reload-role` lub zmniejsz permisje użytkownika")
                        .setColor("RED")
                    return message.channel.send(embed)
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
                message.guild.channels.cache.forEach(channel => {
                    channel.updateOverwrite(role, { SEND_MESSAGES: false })
                })
                db.set(`${message.guild.id}_muted`, {
                    id: role.id
                })
                const embed = new Discord.MessageEmbed()
                    .setColor("DARK_PURPLE")
                    .setTitle("Gotowe!")
                    .setDescription(`Rola ${role} została stworzona!`)
                message.channel.send(embed)
                break;
            case "reload-role": //option reload-role
                role = db.get(`${message.guild.id}_muted`) || {id: undefined}
                role = message.guild.roles.cache.get(role.id)
                if(!role) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Rola nie istnieje!")
                        .setDescription("Aby stworzyć role użyj komendy `muted create` lub `muted set-role`")
                        .setColor("RED")
                    return message.channel.send(embed)
                }
                message.guild.channels.cache.forEach(channel => {
                    channel.updateOverwrite(role, { SEND_MESSAGES: false })
                })
                const embed1 = new Discord.MessageEmbed()
                    .setColor("DARK_PURPLE")
                    .setTitle("Gotowe!")
                    .setDescription(`Rola ${role} została zaktualizowana!`)
                message.channel.send(embed1)
                break;
            case "set-role": //option set-role
                if(!role)
                    return message.channel.send(errorNull("muted", "set-role <role>"))
                if(role.position >= message.member.roles.cache.first.position) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Rola nie może zostać ustawiona!")
                        .setDescription("Role którą chcesz ustawić jest na tej samej pozycji co twoja lub większa")
                        .setColor("RED")
                    return message.channel.send(embed)
                }
                if(role.position >= message.member.roles.cache.first.position) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Rola nie może zostać ustawiona!")
                        .setDescription("Role którą chcesz ustawić jest na tej samej pozycji co moja lub większa")
                        .setColor("RED")
                    return message.channel.send(embed)
                }
                db.set(`${message.guild.id}_muted`, {
                    id: role.id
                })
                const embed2 = new Discord.MessageEmbed()
                    .setColor("DARK_PURPLE")
                    .setTitle("Gotowe!")
                    .setDescription(`Rola ${role} została ustawiona!`)
                message.channel.send(embed2)
                break;
            default:
                message.channel.send(errorNull("muted", "<set-role/create/reload-role>"))
        }
    }
}
