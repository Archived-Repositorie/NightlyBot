const db = require("quick.db")

module.exports = {
    name: "guildMemberAdd",
    async execute(member,ctx) {
        const start = db.get(`${ctx.message.guild.id}_economy.start`)

        if (!start.switch)
            return;

        db.add(`${member.guild.id}_${member.id}_economy.${start.type}`,start.value)
    }
}