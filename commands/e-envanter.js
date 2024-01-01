const { Client, EmbedBuilder } = require("discord.js");
const db = require("croxydb")
const ms = require("ms")
module.exports = {
  name: "envanter",
  description: "Envanterine bakarsın!",
  type: 1,
  options: [
    
  ],
  run: async(client, message) => {
let envanter = db.get(`envanter_${message.user.id}`) || "Envanterin Boş."
const embed2 = new EmbedBuilder()
.setDescription("Envanterin boş.")
.setColor("Red")
if(envanter.length === 0) return message.reply({embeds: [embed2]})

const embed = new EmbedBuilder()
.setDescription(`${envanter}`)
.setColor("Red")
message.reply({embeds: [embed]})
  }
}
