const { PermissionsBitField, messageLink, EmbedBuilder } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"para-yatır",
    description: 'Bankaya para yatırırsın!',
    type:1,
    options: [
      
    {
        name:"miktar",
        description:"Ne kadar yatıracaksın?",
        type:3,
        required:true
    },
       
    ],
  run: async(client, message) => {
   
    let miktar = message.options.getString('miktar')
    let kart = db.fetch(`kart_${message.user.id}`)
    if (!kart) return message.reply("Sana ait bir kart bulamadım.")
    let paran = db.fetch(`para_${message.user.id}`) || "0"
    const embed = new EmbedBuilder()
    .setDescription("Üzgünüm, yeterli paran yok.\nParan: **"+paran+"**\nYatırmak istediğin miktar: **"+miktar+"**")
    .setColor("Red")
    if (paran < miktar) return message.reply({embeds: [embed]})
    db.add(`banka_${message.user.id}`, miktar)
    db.add(`para_${message.user.id}}`, -miktar)
    let banka = db.fetch(`banka_${message.user.id}`)
    let paran2 = db.fetch(`para_${message.user.id}`) || "0"

    const embed2 = new EmbedBuilder()
    .setDescription("Başarıyla bankaya para yatırıldı.\nYatırılan Miktar: **"+miktar+"**\nKalan Paran: **"+paran2+"**\nBankadaki paran: **"+banka+"**")
    .setColor("Red")
   message.reply({embeds: [embed2]})
}
}
