const { PermissionsBitField, messageLink, EmbedBuilder } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"para-gönder",
    description: 'Birinin hesabına para yollarsın!',
    type:1,
    options: [
      {
        name:"user",
        description:"Kime para ekliceksin?",
        type:6,
        required:true
    },
    {
        name:"miktar",
        description:"Ne kadar ekleyeceksin?",
        type:3,
        required:true
    },
       
    ],
  run: async(client, message) => {

    let miktar = message.options.getString('miktar')
    let kullanıcı = message.options.getMember("user")
    let paran = db.fetch(`para_${message.user.id}`) || "0"
   let opara = db.fetch(`para_${kullanıcı.id}`) || "0"
    const embed2 = new EmbedBuilder()
    .setDescription("Üzgünüm, Hesabında Yeterli Miktarda Para Yok.\nSenin Paran: **"+paran+"**\nGöndermek istediğin para: **"+miktar+"**")
    .setColor("Red")
    if (paran < miktar) return message.reply({embeds: [embed2]})
    const embed = new EmbedBuilder()
    .setColor("Red")
    .setDescription("Başarıyla belirtilen miktarda para gönderildi.\nGiden para: **"+miktar+"**\nHesabında Kalan Para: **"+paran+"**\nKullanıcının Parası: **"+opara+"**")
    message.reply({embeds: [embed]})
    db.add(`para_${kullanıcı.id}`, miktar)
    db.add(`para_${message.user.id}`, -miktar)
}
}