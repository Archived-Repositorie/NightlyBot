module.exports = {
    name: "ready",
    once: true,
    execute(ctx) {
        console.log(` Zalogowano jako ${ctx.client.user.tag}\n`,
            `Serwery: ${ctx.client.guilds.cache.size}\n`,
            `Użytkownicy: ${ctx.client.users.cache.size}`)

        ctx.client.user.setStatus("idle")
            .catch(err => console.log(err))
    }
}