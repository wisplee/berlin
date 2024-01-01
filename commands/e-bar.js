const { PermissionsBitField, messageLink, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const Discord = require("discord.js")
const db = require("croxydb")
module.exports = {
    name:"açlık",
    description: 'Açlığına Bakarsın!',
    type:1,
    options: [
       
       
    ],
  run: async(client, message) => {
let aclik = db.fetch(`bar_${message.user.id}`) || "0"
const embed = new EmbedBuilder()
.setDescription(`Açlık Barın **${aclik}**`)
.setColor("Red")
message.reply({embeds: [embed]})
}
}

