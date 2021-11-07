module.exports = (client) => {
    console.log(`${client.user.tag} Discord'da Aktif!`);
    console.log("UmutICE İyi Kullanımlar Diler.");

    client.user.setActivity("UmutICE Discord Backup Altyapı", {type: "PLAYING"})
};