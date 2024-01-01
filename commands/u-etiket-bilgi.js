const { Client, EmbedBuilder } = require("discord.js");
const db = require("croxydb")
module.exports = {
  name: "etiket-bilgi",
  description: "Etiket bilgi sistemini açıp kapatırsın!",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    const embed = new EmbedBuilder()
    .setColor("Red")
    .setDescription("✅ **Sistem Kapatıldı** \n Artık biri etiketleyip sildiğinde dmden bilgilendirme mesajı atılmayacak.")
    const embed2 = new EmbedBuilder()
    .setColor("Red")
   .setDescription("✅ **Sistem Açıldı** \n Artık biri etiketleyip sildiğinde dmden bilgilendirme mesajı atılacak.")
 
 let etiket = db.fetch(`etiketbilgi_${interaction.user.id}`);
 
 if (etiket)  {
 
     db.delete(`etiketbilgi_${interaction.user.id}`);
     interaction.reply({embeds: [embed], allowedMentions: { repliedUser: false }})
 
     return
 }
 
 if (!etiket)  {
 
     db.set(`etiketbilgi_${interaction.user.id}`, true);
    interaction.reply({embeds: [embed2], allowedMentions: { repliedUser: false }})
 
     return
 }

  }

};
