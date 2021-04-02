const db = require("quick.db")

module.exports = {
    name: "guildMemberAdd",
    async execute(member,client) {
        const obj = {
            muted: {
                time: {
                    date: undefined,
                    sec: undefined
                },
                check: undefined
            }
        }

        const { muted } = db.get(`${member.guild.id}_${member.id}_mute`) || obj

        if(!muted.check)
            return;

        const roleId = db.get(`${member.guild.id}_muted`) || {id: undefined}
        const role = member.guild.roles.cache.get(roleId.id)

        if(!role)
            return;

        if(!muted.time.sec)
            return member.roles.add(role)
                .catch(err => console.log(err))

        const dateNow = new Date().getTime() //czas teraz
        const dateMute = muted.time.date //czas wykonania mute
        const timeDiff = Math.abs(dateMute - dateNow)  //czas w którym użytkownika nie było na serwerze + czas mute przed wyjściem
        const timeDiffInSecond = Math.ceil(timeDiff / 1000) //zamienia w sekundy
        const allOfTime = muted.time.sec - timeDiffInSecond //oblicza ile musi trwać jeszcze mute, muted.time.sec(czas trwania mute) - timeDiffInSecound(czas w którym użytwkonika nie było na serwerze + czas mute przed wyjście)

        if(!allOfTime || allOfTime <= 0)
            return member.roles.remove(role)
                .catch(err => console.log(err))

        member.roles.add(role)
            .catch(err => console.log(err))

        await sleep(allOfTime * 1000)

        member.roles.remove(role)
            .catch(err => console.log(err))
    }
}