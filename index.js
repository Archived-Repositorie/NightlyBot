const {Client, Collection, MessageEmbed} = require("discord.js")
const config = require("./config.json")
const db = require("quick.db")
const fs = require('fs')

const client = new Client()

//START
//FUNCTIONS AND VARIABLES

const sleep = t => new Promise(r => setTimeout(r, t))

const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}

function time(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " godzine" : " godzin") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute" : " minut") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " sekunde" : " sekund") : "";
    return hDisplay + mDisplay + sDisplay;
}

const errorPermissions = function (text) {
    const embed = new MessageEmbed()
        .setTitle("Nie posiadasz permisji!")
        .setDescription(`Aby użyć komendy musisz posiadać permisje \`${text}\``)
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

function mention(mention,guild) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1)

        if (mention.startsWith('!'))
            mention = mention.slice(1)

        return guild.members.cache.get(mention)
    }
}


const errorBotPermissions = function (text) {
    const embed = new MessageEmbed()
        .setTitle("Nie posiadam permisji!")
        .setDescription(`Aby użyć komendy muszę posiadać permisje \`${text}\``)
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
        .split("#member.name#").join(member.user.username)
        .split("#member.mention#").join(member)
        .split("#member.tag#").join(member.user.tag)
        .split("#member.id#").join(member.user.id)
        .split("#member.name#").join(member.user.name)
        .split("#member.joinedAt#").join(member.joinedAt.toLocaleDateString("pl-PL",options))
        .split("#member.createdAt#").join(member.user.createdAt.toLocaleDateString("pl-PL",options))
        .split("#member.avatar#").join(member.user.displayAvatarURL())
}

function paginate(arr, size) {
    return arr.reduce((acc, val, i) => {
        let idx = Math.floor(i / size)
        let page = acc[idx] || (acc[idx] = [])
        page.push(val)
        return acc
    }, [])
}

function random(filename){
    const data = fs.readFileSync(`./random/${filename}.txt`, "utf8");
    const lines = data.split('\n');
    return lines[Math.floor(Math.random()*lines.length)];
}

const timee = {
    "s": 1,
    "sec": 1,
    "second": 1,
    "m": 60,
    "min": 60,
    "minute": 60,
    "h": 3600,
    "hr": 3600,
    "hour": 3600
}

//CLASS
//FUNCTIONS AND VARIABLES

class ctx {
    constructor(message,args,prefix,cmd) {
        this.cmd = cmd
        this.client = client
        this.message = message
        this.args = args
        this.prefix = prefix
        this.tags = tags
        this.options = options
        this.sleep = sleep
        this.time = time
        this.errorNull = errorNull
        this.paginate = paginate
        this.timeTest = timee
        this.random = random
    }
    mention(number) {
        return mention(this.args[number], this.message.guild)
    }
}

//END
//FUNCTIONS AND VARIABLES



//START
//COMMAND AND EVENT HANDLER

client.commands = new Collection()
client.aliases = new Collection()
client.categories = fs.readdirSync("./commands/")
//EVENT
//COMMAND AND EVENT HANDLER

const eventFiles = fs.readdirSync('./events')
    .filter(file => file.endsWith('.js'));


for(const file of eventFiles) {
    const event = require(`./events/${file}`)

    if (!event.once) {
        client.on(event.name, async (...args) => await event.execute(...args, new ctx))
    } else {
        client.once(event.name, async (...args) =>  await event.execute(...args, new ctx))
    }

}

//COMMAND
//COMMAND AND EVENT HANDLER
["command"].forEach(handler => {
    fs.readdirSync("./commands/").forEach(dir => {
        const commands = fs.readdirSync(`./commands/${dir}/`)
            .filter(file => file.endsWith(".js"))
        client.categories[dir] = []
        for (let file of commands) {
            let pull = require(`./commands/${dir}/${file}`)
            client.categories[dir].push(pull.name)
            client.commands.set(pull.name, pull)

            if (pull.aliases && Array.isArray(pull.aliases))
                pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    })
})

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

    let command = client.commands.get(cmd)

    if (!command)
        command = client.commands.get(client.aliases.get(cmd)) ?? {requirePermissions: [,]}


    if(!command.requirePermissions)
        command.requirePermissions = [,]

    if (command.requirePermissions[0] && !message.member.hasPermission(command.requirePermissions[0]))
        return message.reply(errorPermissions(command.requirePermissions[0]))
            .catch(err => console.log(err))

    if(command.requirePermissions[1] && !message.guild.me.hasPermission(command.requirePermissions[1]))
        return message.reply(errorBotPermissions(command.requirePermissions[1]))
            .catch(err => console.log(err))

    if (command.name)
        command.run(new ctx(message,args,prefix,client.commands.toJSON()))
})

//END
//COMMAND AND EVENT HANDLER

client.login(config.token)
