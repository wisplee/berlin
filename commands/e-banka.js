const { PermissionsBitField, messageLink, EmbedBuilder } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"banka",
    description: 'Bankana bakarsın!',
    type:1,
    options: [
       
       
    ],
  run: async(client, message) => {
    let banka = db.fetch(`banka_${message.user.id}`)
    let kart = db.fetch(`kart_${message.user.id}`)
    if (!kart) return message.reply("Kart oluşturmamışsın bebek")
  let numara = kart.numara
  let cvc = kart.cvc
  let tür = kart.tür
  let son = kart.son
  const embed = new EmbedBuilder()
  .setTitle("Checkers - Banka Menüsü!")
  .addFields({ name: 'Coin', value: `${banka || "Bankada Paran Yok!"}`, inline: true})
  .addFields({ name: 'Kart Numarası', value: `${numara}`, inline: true})
  .addFields({ name: 'Son Kullanım Tarihi', value: `${son}`, inline: true})
  .addFields({ name: 'CVC', value: `${cvc}`, inline: true})
  .addFields({ name: `Kart Sahibi`, value: `${message.user} `, inline: true})
  .addFields({ name: `Kart`, value: `${tür}`, inline: true})
  .setColor("#ff0000")
  message.reply({embeds: [embed]})
}
}

