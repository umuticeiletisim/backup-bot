const backup = require('discord-backup');
const { prefix } = require("../ayarlar.json");
const { MessageEmbed } = require("discord.js");

exports.run = async(client, message, args) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) {
        const embed = new MessageEmbed()
        .setDescription("Hata! Maalesef `Yönetici` iznin yok. Yönetici izni alıp öyle gel.")
        .setColor("DARK_RED")
        return message.reply({embeds: [embed]});
    }; 

    backup.create(message.guild, {
        maxMessagesPerChannel: 0,
        doNotBackup: ["bans"]
    }).then((backupData) => {
        const embed = new MessageEmbed()
        .setDescription(`Backup Oluşturuldu! Backup Kodunuz: \`${backupData.id}\`\nEğer sunucuda Backup'ını yüklemek isterseniz \`${prefix}backup-yükle ${backupData.id}\``)
        .setColor("AQUA")
        return message.reply({embeds: [embed]});
    }).catch(() => {
        const embed = new MessageEmbed()
        .setDescription("Bir hatayla karşılaştım! Backup oluşturulamadı.")
        .setColor("DARK_RED")
        return message.reply({embeds: [embed]});
    });
};