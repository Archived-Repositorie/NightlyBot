module.exports = {
    name: "guildCreate",
    async execute(client) {
        console.log(` Dodano bota na nowy serwer!\n`,
            `Serwery: ${client.guilds.cache.size}\n`,
            `Użytkownicy: ${client.users.cache.size}`)
    }
}