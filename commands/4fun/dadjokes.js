const fs = require('fs')
const { MessageEmbed } = require("discord.js")
function random(file){
    var data = fs.readFileSync(`./random/${file}.txt`, "utf8");
    var lines = data.split('\n');
    return lines[Math.floor(Math.random()*lines.length)];
}

module.exports = {
    name: "dad-jokes",
    run: async(client,message,args) => {
        const embed = new MessageEmbed()
            .setDescription(random("dadjokes"))
            .setColor("DARK_PURPLE")
        message.channel.send(embed)
    }
}