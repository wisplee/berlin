const { PermissionsBitField, messageLink, EmbedBuilder, Embed } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"param",
    description: 'Parana bakarsın!',
    type:1,
    options: [
      
   
       
    ],
  run: async(client, message) => {
    let param2 = db.fetch(`para_${message.user.id}`) 
    let param = db.fetch(`para_${message.user.id}`) || "0"
    let banka = db.fetch(`banka_${message.user.id}`) || "0"
    let banka2 = db.fetch(`banka_${message.user.id}`)
    let mevcut = banka2 + param2 || "0"

const embed = new EmbedBuilder()
.setDescription("Mevcut Paran: **"+param+"**\nBandaki Paran: **"+banka+"**\nToplam Paran: **"+mevcut+"**")
.setColor("Red")
message.reply({embeds: [embed]})

}
}
