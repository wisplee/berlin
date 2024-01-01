const { Client, EmbedBuilder } = require("discord.js");
const db = require("croxydb")
const Discord = require("discord.js")
module.exports = {
  name: "yardım",
  description: "Yardım Menüsüne Bakarsın!",
  type: 1,
  options: [
    
  ],
  run: async(client, message) => {
const embed = new EmbedBuilder()
.setTitle("Checkers - Yardım Menüsü!")
.setDescription("Aşağıdaki butonlardan istediğin yere ulaşabilirsin.")
.setColor("Green")
.setImage("https://cdn.discordapp.com/attachments/1020041291037417543/1020378625113079950/Checkers2.png")
const row = new Discord.ActionRowBuilder()
.addComponents(
new Discord.ButtonBuilder()
.setLabel("Moderasyon")
.setStyle(Discord.ButtonStyle.Success)
.setCustomId("mod"),
new Discord.ButtonBuilder()
.setLabel("Çekiliş")
.setStyle(Discord.ButtonStyle.Success)
.setCustomId("çekiliş"),
new Discord.ButtonBuilder()
.setLabel("Chat Guard")
.setStyle(Discord.ButtonStyle.Success)
.setCustomId("cguard"),
new Discord.ButtonBuilder()
.setLabel("Log")
.setStyle(Discord.ButtonStyle.Success)
.setCustomId("log"),
)
const row2 = new Discord.ActionRowBuilder()
.addComponents(
    new Discord.ButtonBuilder()
    .setLabel("Destek Sistemi")
    .setStyle(Discord.ButtonStyle.Success)
    .setCustomId("destek"),
    new Discord.ButtonBuilder()
.setLabel("Ekonomi")
.setStyle(Discord.ButtonStyle.Success)
.setCustomId("ekonomi"),
new Discord.ButtonBuilder()
.setLabel("Özel Oda Sistemi")
.setStyle(Discord.ButtonStyle.Success)
.setCustomId("özeloda"),
new Discord.ButtonBuilder()
.setLabel("Eğlence Sistemi")
.setStyle(Discord.ButtonStyle.Success)
.setCustomId("eğlence"),
)

message.reply({embeds: [embed], components: [row, row2]})
  }
}
