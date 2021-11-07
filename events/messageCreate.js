const ayarlar = require("../ayarlar.json")

module.exports = (client, message) => {
    //Botların Komut Kullanımını Engelle
    if(message.author.bot) return;

    //Prefixle Başlamayan Mesajları Geç
    if(!message.content.startsWith(ayarlar.prefix)) return;

    //Argüman ve Komut Adı Tanımı
    const args = message.content.slice(ayarlar.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //client.commands'den Komut Alımı
    const cmd = client.commands.get(command);

    //Bu Komut Yoksa Geç
    if (!cmd) return;

    //Handler Ayarı

    cmd.run(client, message, args);
};