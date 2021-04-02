const db = require('quick.db')

module.exports = {
    name: "channelCreate",
    execute(channel,client) {
        if(!channel.guild)
            return;

        let role = db.get(`${channel.guild.id}_muted`) || {id: undefined}
        role = channel.guild.roles.cache.get(role.id)

        if(!role)
            return;

        channel.updateOverwrite(role, { SEND_MESSAGES: false })
            .catch(err => console.log(err))
    }
}