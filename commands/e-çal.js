const { PermissionsBitField, messageLink, EmbedBuilder } = require("discord.js");
const db = require("croxydb")
const ms = require("ms")
module.exports = {
    name:"para-çal",
    description: 'Birinden para çalarsın!',
    type:1,
    options: [
      {
        name:"user",
        description:"Kimden çalacaksın?",
        type:6,
        required:true
    },
   
       
    ],
  run: async(client, message) => {
  
    let kullanıcı = message.options.getMember("user")
    let yavaşmod = 8.64e+7, 

    amount = Math.floor(Math.random() * 1000) + 4000;      


let lastDaily = await db.fetch(`cal_${message.user.id}`);

if (lastDaily !== null && yavaşmod - (Date.now() - lastDaily) > 0) {

    let timeObj = ms(yavaşmod - (Date.now() - lastDaily));




  
    const embed = new EmbedBuilder()
    .setDescription("Sadece 24 saatte bir hırsızlık yapabilirsin.")
    .setColor("Red")
    return message.reply({embeds: [embed]})

  

} else {

let parasi = db.fetch(`para_${kullanıcı.id}`)
if (!parasi) return message.reply("Kullanıcının hiç parası yok yazıktır.")
let miktarsonuç = Math.floor(Math.random() * 99) + 1
db.add(`para_${message.user.id}`, miktarsonuç)
db.add(`para_${kullanıcı.id}`, -miktarsonuç)
db.set(`cal_${message.user.id}`, Date.now());
const embed = new EmbedBuilder()
.setDescription("Başarıyla hırsızlık yaptın.\nHırsızlık Yapılan: <@"+kullanıcı+">\nHırsızlık Yapan: <@"+message.user+">\nÇalınan Para: **"+miktarsonuç+"**")
.setColor("Red")
 message.reply({embeds: [embed]})
}
}
}
