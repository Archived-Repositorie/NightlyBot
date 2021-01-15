const Discord = require("discord.js")
const db = require("quick.db")
const fs = require("fs")
const procces = require("process")

module.exports = {
    name: "eval",
    run: async(client,message,args,prefix,errorNull,errorPermissions,tags) => {
        if(message.author.id !== "537360299456462852") return;
        try {
            const returned = eval(args.join(" "))
            message.author.send("```" + returned + "```")
        } catch (err) {
            message.author.send("```" + err + "```")
        }
    }
}
