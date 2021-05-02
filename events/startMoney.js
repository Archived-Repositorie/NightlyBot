const db = require("quick.db")

module.exports = {
    name: "guildMemberAdd",
    async execute(member,ctx) {
        const start = db.get(`${member.guild.id}_economy.start`) || {switch: false}

        if (!start.switch)
            return;

        db.add(`${member.guild.id}_${member.id}_economy.${start.type}`,start.value)
    }
}