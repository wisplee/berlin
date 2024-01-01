const { Client, EmbedBuilder } = require("discord.js");
const db = require("croxydb")

module.exports = {
  name: "cf",
  description: "Kumar oynarsın!",
  type: 1,
  options: [
    {
        name:"miktar",
        description:"Ne Kadar Oynacaksın?",
        type:3,
        required:true
    },
  ],
  run: async(client, message) => {

    const key = message.options.getString('miktar')
    const money = db.fetch(`para_${message.user.id}`)
    const embed = new EmbedBuilder()
    .setDescription("Üzgünüm, Hiç paran yok.")
    .setColor("Red")
    if (!money) return message.reply({embeds: [embed]})
    const moneyPush = key
    const embed2 = new EmbedBuilder()
    .setDescription("Üzgünüm, Hesabında Yeterli Miktarda Para Yok.\nSenin Paran: **"+money+"**\nOynamak İstediğin Para: **"+key+"**")
    .setColor("Red")
    if (money < moneyPush) return message.reply({embeds: [embed2]})

    var Money = moneyPush
    if(!moneyPush) Money = 1
    
    const mapping = ["true","false"]
    const randomMapping = mapping[Math.floor(Math.random() * mapping.length)]
    
    if(randomMapping === "true") {
        const embed = new EmbedBuilder()
        .setDescription("Tebrikler, **"+key+"** Raven Coin Hesabına Aktarıldı.")
        .setColor("Red")
        message.reply({embeds: [embed]})
        db.add(`para_${message.user.id}`, moneyPush*2)
    } 
    if(randomMapping === "false") {
        const embed = new EmbedBuilder()
        .setDescription("Üzgünüm, **"+key+"** Raven Coin Kaybettin.")
        .setColor("Red")
            message.reply({embeds: [embed]})
            db.add(`para_${message.user.id}`, -moneyPush)
    }
  }
}
