const db = require("quick.db")
const tags = require("../index")

module.exports = {
    name: "guildMemberRemove",
    async execute(member,ctx) {
        const switched = db.get(`${member.guild.id}_switch_leave`)

        if (switched != 1)
            return;

        const joined = db.get(`${member.guild.id}_leave`)
        const text = tags(joined.text, member)

        member.guild.channels.cache.get(joined.id).send(text)
            .catch(err => console.log(err))
    }
}