const backup = require('discord-backup');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
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

    backup.fetch(backupId).then(() => {
        const embed = new MessageEmbed()
        .setDescription("Hey! Tüm kanallar, emojiler, roller ve dahası sıfırlanacak. Eğer bunları göz önüne alıyorsan `evet` yaz. İptal etmek istiyorsan `hayır` yaz. 15 Saniyen var!\n**Mesajlar ve banlar yedeklenmez. Tüm banlar sıfırlanır ve mesajlar geri gelmez. Sunucu adı ve sunucu profil fotoğrafı sıfırlanır. Bot rolleri sıfırlanamaz. Onun dışındakiler sıfırlanır.**")
        .setColor("AQUA")
        message.reply({embeds: [embed]});

        const filter = m => m.author.id === message.author.id || ["evet", "hayır"].includes(m.content)
        const collector = message.channel.createMessageCollector({
            filter,
            time: 60000,
            max: 1
        });
        collector.on('collect', (m) => {
            const confirm = m.content === "evet";
            collector.stop();
            if (confirm) {

                backup.load(backupId, message.guild).then(() => {

                    const embed = new MessageEmbed()
                    .setDescription("Backup yüklenmesi başarılı!")
                    .setColor("AQUA")
                    return message.author.send({embeds: [embed]}).catch(() => console.log(`Başarılı Mesajı ${message.author.tag} İsimli Kullanıcıya Gönderilemedi.`));
            
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

            } else {
                const embed = new MessageEmbed()
                .setDescription("İptal edildi.")
                .setColor("DARK_RED")
                return m.reply({embeds: [embed]});
            };
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                const embed = new MessageEmbed()
                .setDescription("Zaman bitti! Komutu tekrar kullanın.")
                .setColor("AQUA")
                return message.reply({embeds: [embed]});
            };
        });

    }).catch(() => {
        const embed = new MessageEmbed()
        .setDescription("Böyle bir Backup ID'si yok!")
        .setColor("DARK_RED")
        return message.reply({embeds: [embed]});
    });
};