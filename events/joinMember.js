const db = require("quick.db")
const tags = require("../index")

module.exports = {
    name: "guildMemberAdd",
    async execute(member,client) {
        const switched = db.get(`${member.guild.id}_switch_join`)

        if (switched != 1)
            return;

        const joined = db.get(`${member.guild.id}_join`)
        const text = tags(joined.text, member)

        member.guild.channels.cache.get(joined.id).send(text)
            .catch(err => console.log(err))
    }
}