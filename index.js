const Discord = require("discord.js")
const config = require("./config.json")
const db = require("quick.db")
const fs = require('fs')

const client = new Discord.Client(
    {
     disableMentions: "all"
    }
)

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    fs.readdirSync("./commands/").forEach(dir => {
        const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"))
        for (let file of commands) {
            let pull = require(`./commands/${dir}/${file}`)
            client.commands.set(pull.name, pull)
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    })
})

const errorPermissions = function (polish,english) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Nie posiadasz permisji!")
        .setDescription(`Aby użyć komendy musisz posiadać permisje \`${polish}(${english})\``)
        .setColor("RED")
    return embed
}
const errorNull = function (command,arguments) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Użyj poprawnie komendy!")
        .setDescription(`Użyj \`${command} ${arguments}\``)
        .setColor("RED")
    return embed
}

function tags(text,member) {
    return text
        //guild
        .split("#guild.name#").join(member.guild.name)
        .split("#guild.members#").join(member.guild.memberCount)
        .split("#guild.icon#").join(member.guild.iconURL() || "")
        .split("#guild.createdAt#").join(member.guild.createdAt.toLocaleDateString("pl-PL",options))
        //member
        .split("#member.name#").join(member.user.name)
        .split("#member.mention#").join(member)
        .split("#member.tag#").join(member.user.tag)
        .split("#member.id#").join(member.user.id)
        .split("#member.name#").join(member.user.name)
        .split("#member.joinedAt#").join(member.joinedAt.toLocaleDateString("pl-PL",options))
        .split("#member.createdAt#").join(member.user.createdAt.toLocaleDateString("pl-PL",options))
}

client.on("message", async message => {
    if(!message.guild) return;
    prefix = db.get(`${message.guild.id}_prefix`) || "%'"
    if (!message.content.startsWith(prefix)) return
    if(message.author.bot) return
    if (!message.member) message.member = await message.guild.fetchMember(message)

    const args = message.content.slice(prefix.length).trim().split(' ')
    const cmd = args.shift().toLowerCase()

    if (cmd.length === 0) return;
    const comm = client.commands.get(cmd)
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd))
    if (command)
        command.run(client, message, args,prefix,errorNull,errorPermissions,tags)
})

client.login(config.token)

client.on("ready", () => {
    console.log(` Zalogowano jako ${client.user.tag}\n`,
    `Serwery: ${client.guilds.cache.size}\n`,
    `Użytkownicy: ${client.users.cache.size}`)
    client.user.setStatus("idle")
})

client.on("guildCreate", () => {
    console.log(` Dodano bota na nowy serwer!\n`,
    `Serwery: ${client.guilds.cache.size}\n`,
    `Użytkownicy: ${client.users.cache.size}`)
})

client.on("guildMemberAdd", member => {
    const switched = db.get(`${member.guild.id}_switch_join`)
    if(switched != 1) return;
    const joined = db.get(`${member.guild.id}_join`)
    const text = tags(joined.text,member)
    member.guild.channels.cache.get(joined.id).send(text)
})

client.on("guildMemberRemove", member => {
    const switched = db.get(`${member.guild.id}_switch_leave`)
    if(switched != 1) return;
    const joined = db.get(`${member.guild.id}_leave`)
    const text = tags(joined.text,member)
    member.guild.channels.cache.get(joined.id).send(text)
})

client.on("message", msg => {
    if(!msg.guild) return;
    const switched = db.get(`${msg.guild.id}_switch_counting`)
    if(switched != 1) return;
    const countingChannel = db.get(`${msg.guild.id}_counting`)
    if(msg.channel.id != countingChannel) return;
    const nextNumber = db.get(`${msg.guild.id}_number`) + 1
    if(msg.content != nextNumber) {
        msg.delete()
        return msg.author.send(`${msg.author}, Podałeś złą liczbe!`)
    }
    db.set(`${msg.guild.id}_number`, nextNumber)
})