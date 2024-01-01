const { Client, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")
const axios = require("axios")
module.exports = {
  name: "atatürk",
  description: "Atatürk fotoğraflarına bakarsın!",
  type: 1,
  options: [],

  run: async(client, interaction) => {

   
axios({
    method: 'get',
    url: "https://ataturk-resimleri-api.herokuapp.com/"
    }).then(async image => {
    const attachment = new Discord.AttachmentBuilder(image.data.image)
    interaction.channel.send({files: [attachment]})
    })
    interaction.reply("Resim yükleniyor..")

  }

};