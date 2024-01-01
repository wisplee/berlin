const { PermissionsBitField, messageLink, EmbedBuilder, Embed } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"para-çek",
    description: 'Bankadan para çekersin!',
    type:1,
    options: [
      
    {
        name:"miktar",
        description:"Ne kadar çekeceksin?",
        type:3,
        required:true
    },
       
    ],
  run: async(client, message) => {
   
    let miktar = message.options.getString('miktar')
    let kart = db.fetch(`kart_${message.user.id}`)
    if (!kart) return message.reply("Sana ait bir kart bulamadım.")
    let banka = db.fetch(`banka_${message.user.id}`) || "0"
    let para = db.fetch(`para_${message.user.id}`)

    const embed = new EmbedBuilder()
    .setDescription("Üzgünüm, yeterli paran yok.\nBankadaki paran: **"+banka+"**\nÇekeceğin para: **"+miktar+"**")
    .setColor("Red")
 if (para < miktar) return message.reply({embeds: [embed]})
 db.add(`banka_${message.user.id}`, -miktar)
db.add(`para_${message.user.id}`, miktar)
 const embed2 = new EmbedBuilder()
 .setDescription("Başarıyla bankadan para çekildi.\nBankadan çekilen para: **"+miktar+"**\nMevcut paran: **"+para+"**\nBankadaki Paran: **"+banka+"**")
 .setColor("Red")
message.reply({embeds: [embed2]})


}
}
