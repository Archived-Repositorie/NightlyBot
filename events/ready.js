module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(` Zalogowano jako ${client.user.tag}\n`,
            `Serwery: ${client.guilds.cache.size}\n`,
            `Użytkownicy: ${client.users.cache.size}`)

        client.user.setStatus("idle")
            .catch(err => console.log(err))
    }
}