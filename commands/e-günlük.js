const { Client, EmbedBuilder } = require("discord.js");
const db = require("croxydb")
const ms = require("ms")
module.exports = {
  name: "günlük",
  description: "Günlük paranı alırsın!",
  type: 1,
  options: [
    
  ],
  run: async(client, message) => {

    var paralar = ['100','50','25','200','250','5','75'];
    var para = paralar[Math.floor(Math.random() * paralar.length)];

let yavaşmod = 8.64e+7, 

      amount = Math.floor(Math.random() * 1000) + 4000;      


  let lastDaily = await db.fetch(`günlük_${message.user.id}`);

  if (lastDaily !== null && yavaşmod - (Date.now() - lastDaily) > 0) {

      let timeObj = ms(yavaşmod - (Date.now() - lastDaily));




    const embed = new EmbedBuilder()
    .setDescription("Sadece 24 saatte bir günlük para alabilirsin.")
    .setColor("Red")
    return message.reply({embeds: [embed]})

    

  } else {

    db.add(`para_${message.user.id}`, para)
    const embed = new EmbedBuilder()
    .setDescription("Günlük paran **"+para+"**  Raven Coin!")
    .setColor("Red")
message.reply({embeds: [embed]});
     db.set(`günlük_${message.user.id}`, Date.now());
  }
  }
}
