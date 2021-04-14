const Discord = require("discord.js")
const db = require("quick.db")
const fs = require("fs")
const procces = require("process")

module.exports = {
    name: "eval",
    run: async(ctx) => {
        if(ctx.message.author.id !== "537360299456462852")
            return;

        try {
            const returned = eval(ctx.args.join(" "))

            ctx.message.reply("```" + returned + "```")
                .catch(err => console.log(err))

        } catch (err) {
            ctx.message.reply("```" + err + "```")
                .catch(err => console.log(err))
        }
    }
}
