const db = require("quick.db")

module.exports = {
    name: "message",
    execute(msg,client) {
        if (!msg.guild)
            return;

        const switched = db.get(`${msg.guild.id}_switch_counting`)

        if (switched != 1)
            return;

        const countingChannel = db.get(`${msg.guild.id}_counting`)

        if (msg.channel.id != countingChannel)
            return;

        const nextNumber = db.get(`${msg.guild.id}_number`) + 1

        if (msg.content != nextNumber) {
            msg.delete()
                .catch(err => console.log(err))

            return msg.author.send(`${msg.author}, Podałeś złą liczbe!`)
                .catch(err => console.log(err))
        }

        db.set(`${msg.guild.id}_number`, nextNumber)
    }
}