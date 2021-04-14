module.exports = {
    name: "guildCreate",
    async execute(ctx) {
        console.log(` Dodano bota na nowy serwer!\n`,
            `Serwery: ${ctx.client.guilds.cache.size}\n`,
            `Użytkownicy: ${ctx.client.users.cache.size}`)
    }
}