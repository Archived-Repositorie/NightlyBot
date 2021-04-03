const {Client, Collection, MessageEmbed} = require("discord.js")
const config = require("./config.json")
const db = require("quick.db")
const fs = require('fs')

const sleep = t => new Promise(r => setTimeout(r, t))
const client = new Client()
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric' }

client.commands = new Collection()
client.aliases = new Collection()
client.categories = fs.readdirSync("./commands/")

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

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

for (const file of eventFiles) {
    const event = require(`./events/${file}`)

    if (!event.once) {
        client.on(event.name, async (...args) => await event.execute(...args, client))

    } else {
        client.once(event.name, async (...args) =>  await event.execute(...args, client))
    }

}



const errorPermissions = function (polish,english) {
    const embed = new MessageEmbed()
        .setTitle("Nie posiadasz permisji!")
        .setDescription(`Aby użyć komendy musisz posiadać permisje \`${polish}(${english})\``)
        .setColor("RED")

    return embed
}
const errorNull = function (command,arguments) {
    const embed = new MessageEmbed()
        .setTitle("Użyj poprawnie komendy!")
        .setDescription(`Użyj \`${command} ${arguments}\``)
        .setColor("RED")

    return embed
}
const errorBotPermissions = function (polish,english) {
    const embed = new MessageEmbed()
        .setTitle("Nie posiadam permisji!")
        .setDescription(`Aby użyć komendy musę posiadać permisje \`${polish}(${english})\``)
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
        .split("#member.avatar#").join(member.user.displayAvatarURL())
}


client.on("message", async message => {
    if(!message.guild)
        return;

    prefix = db.get(`${message.guild.id}_prefix`) || "%'"

    if (!message.content.startsWith(prefix))
        return;

    if(message.author.bot)
        return;

    if (!message.member)
        message.member = await message.guild.fetchMember(message)

    const args = message.content.slice(prefix.length).trim().split(' ')
    const cmd = args.shift().toLowerCase()

    if (cmd.length === 0)
        return;

    const comm = client.commands.get(cmd)
    let command = client.commands.get(cmd)

    if (!command)
        command = client.commands.get(client.aliases.get(cmd))

    if (command)
        command.run(client, message, args,prefix,errorNull,errorPermissions,tags,errorBotPermissions)
})

client.login(config.token)

module.exports = tags