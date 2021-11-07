const backup = require('discord-backup');
const { MessageEmbed } = require('discord.js');

exports.run = async(client, message, args) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) {
        const embed = new MessageEmbed()
        .setDescription("Hata! Maalesef `Yönetici` iznin yok. Yönetici izni alıp öyle gel.")
        .setColor("DARK_RED")
        return message.reply({embeds: [embed]});
    }; 

    let backupId = args.join(" ");

    if(!backupId) {
        const embed = new MessageEmbed()
        .setDescription("Hata! Bir Backup ID'si yazman gerek.")
        .setColor("DARK_RED")
        return message.reply({embeds: [embed]});
    };

    backup.fetch(backupId).then((backup) => {
        const tarih = new Date(backup.data.createdTimestamp);
        const yyyy = tarih.getFullYear().toString(), mm = (tarih.getMonth()+1).toString(), dd = tarih.getDate().toString();
        const tamTarih = `${(dd[1]?dd:"0"+dd[0])}/${(mm[1]?mm:"0"+mm[0])}/${yyyy}`;

        const embed = new MessageEmbed()
        .setTitle("Backup Bilgileri", backup.data.iconURL)
        .addField("Sunucu Adı", backup.data.name)
        .addField("Yedeğin Boyutu", `${backup.size} kb`)
        .addField("Oluşturulma Tarihi", tamTarih)
        .addField("Backup ID", backup.id)
        .setColor("AQUA")
        .setFooter("UmutICE Backup Bot");

        message.reply({embeds: [embed]});
    }).catch((err) => {
        
        if(err === "No backup found") {
            const embed = new MessageEmbed()
            .setDescription("Böyle bir Backup ID'si yok!")
            .setColor("DARK_RED")
            return message.reply({embeds: [embed]});
        }else{
            const embed = new MessageEmbed()
            .setDescription("Bir hatayla karşılaştım...")
            .setColor("DARK_RED")
            return message.reply({embeds: [embed]});
        };

    });
};