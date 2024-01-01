const { Client, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")
const apii = require("useful-tools")
module.exports = {
  name: "sunucu",
  description: "Sunucu hakkında bilgi edinirsin!",
  type: 1,
  options: [],

  run: async(client, message) => {

    const owner = message.guild.members.cache.get(message.guild.ownerId);
const embed = new Discord.EmbedBuilder()
    .setTitle(message.guild.name + " Sunucu Bilgileri")
    .setColor("#ff0000")
    .setDescription(`Sunucu Sahibi: <@${owner.user.id}>\nRol Sayısı: ${message.guild.roles.cache.size}\nKuruluş: ${apii.tarih(message.guild.createdTimestamp)}`)
    .setThumbnail(message.guild.iconURL())
    .setTimestamp()
    message.reply({embeds: [embed]})
  }

};