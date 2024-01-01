const { Client, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")
const apii = require("useful-tools")
module.exports = {
  name: "kaç-cm",
  description: "Emaneti ölçersin.",
  type: 1,
  options: [],

  run: async(client, message) => {

 
    const random = Math.floor(Math.random() * 99) + 1
   
    message.reply(":thinking: Hmm... Emanetin `"+random+"` CM")
  }

};