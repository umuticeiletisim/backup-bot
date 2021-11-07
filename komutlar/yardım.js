const { MessageEmbed } = require("discord.js");
const { prefix } = require("../ayarlar.json");

exports.run = async(client, message, args) => {

    const embed = new MessageEmbed()
    .setTitle("UmutICE Discord Backup Bot", "https://cdn.discordapp.com/attachments/866671005543825458/906833355713163294/y_e_n_iiiiiiiiiii_pppp.png")
    .addField(`⇒ ${prefix}backup-bilgi <backup id>`, "Backup kodu hakkında bilgiler alırsınız.")
    .addField(`⇒ ${prefix}backup-oluştur`, "Sunucunun yedeğini oluşturursunuz.")
    .addField(`⇒ ${prefix}backup-yükle <backup id>`, "Bir backup'ı sunucuya yüklersiniz. **Tüm herşey sıfırlanır!**")
    .setColor("AQUA")
    .setImage("https://api.creavite.co/out/4ec9cd09-c900-4ec7-95eb-fe0e7b3df59e_standard.gif")
    .setFooter("UmutICE Backup Bot")
    message.reply({embeds: [embed]});

};