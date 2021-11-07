const ayarlar = require("./ayarlar.json");
const Discord = require("discord.js");
const DiscordBackup = require("discord-backup");
const client = new Discord.Client({ intents: 32767 });
const fs = require("fs");

client.commands = new Discord.Collection();

//Komutları Yükle

fs.readdir("./komutlar/", (_err, files) => {
    files.forEach((file) => {
        if(!file.endsWith(".js")) return;
        let dosya = require(`./komutlar/${file}`);
        let komutAd = file.split(".")[0];
        console.log(`Yeni Bir Komut Yüklendi! ${komutAd}`)
        client.commands.set(komutAd, dosya);
    });
});

//Eventleri Yükle

fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if(!file.endsWith(".js")) return;
        let dosya = require(`./events/${file}`);
        let eventAd = file.split(".")[0];
        console.log(`Yeni Bir Event Yüklendi! ${eventAd}`)
        client.on(eventAd, dosya.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

//Discorda Giriş Yap
client.login(ayarlar.token);