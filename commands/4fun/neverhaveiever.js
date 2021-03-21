const fs = require('fs')
const {MessageEmbed} = require("discord.js")
function random(filename){
    var data = fs.readFileSync(`./random/${filename}.txt`, "utf8");
    var lines = data.split('\n');
    return lines[Math.floor(Math.random()*lines.length)];
}

module.exports = {
    name: "never-have-i-ever",
    run: async(client,message,args) => {
        const embed = new MessageEmbed()
            .setDescription(random("never-have-i-ever"))
            .setColor("DARK_PURPLE")
        message.channel.send(embed)
    }
}