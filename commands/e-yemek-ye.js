const { PermissionsBitField, messageLink, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const Discord = require("discord.js")
const db = require("croxydb")
module.exports = {
    name:"yemek-ye",
    description: 'Zıkkımlanırsın!',
    type:1,
    options: [
       
       
    ],
  run: async(client, message) => {
    let envanter = db.get(`envanter_${message.user.id}`)
    const embed2 = new EmbedBuilder()
    .setDescription("Yiyecek hiç bir şeyin yok :(")
    .setColor("Red")
    if (!envanter) return message.reply({embeds: [embed2]})
   const embed = new EmbedBuilder()
   .setDescription("Aşağıdaki yemekler senin karnını doyuracaktır.")
   .setColor("Red")
   const row = new ActionRowBuilder()
   .addComponents(
  new ButtonBuilder()
  .setEmoji("🍟")
  .setStyle(Discord.ButtonStyle.Danger)
  .setCustomId("patates"),
  new ButtonBuilder()
  .setEmoji("🍔")
  .setStyle(Discord.ButtonStyle.Danger)
  .setCustomId("hamburger"),
  new ButtonBuilder()
  .setEmoji("🍉")
  .setStyle(Discord.ButtonStyle.Danger)
  .setCustomId("karpuz"),
  new ButtonBuilder()
  .setEmoji("🍫")
  .setStyle(Discord.ButtonStyle.Danger)
  .setCustomId("çikolata"),
  new ButtonBuilder()
  .setEmoji("🚿")
  .setStyle(Discord.ButtonStyle.Danger)
  .setCustomId("su"),
   )
   const row2 = new ActionRowBuilder()
   .addComponents(
  new ButtonBuilder()
  .setEmoji("♥️")
  .setStyle(Discord.ButtonStyle.Danger)
  .setCustomId("kalp")
  
   )
   message.reply({embeds: [embed], components: [row, row2]}).then(msg => {
    msg.createMessageComponentCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {
      let interaction = button
        if (interaction.customId == "patates") {
let patates = db.fetch(`patates_${interaction.user.id}`)

if (!patates) return interaction.reply("Envanterinde Patates Kızartması Bulunmamakta!")
const embed = new EmbedBuilder()
.setDescription("Başarıyla patates kızartması yedin ve açlık barın 5 bar daha yükseldi.")
.setColor("Red")
interaction.reply({embeds: [embed]})
db.add(`patates_${interaction.user.id}`, -1)
db.unpush(`envanter_${message.user.id}`, "Patates")
db.add(`bar_${interaction.user.id}`, 5)
        } 
        if (interaction.customId == "hamburger") {
          let patates = db.fetch(`hamburger_${interaction.user.id}`)
          
          if (!patates) return interaction.reply("Envanterinde Hamburger Bulunmamakta!")
          const embed = new EmbedBuilder()
          .setDescription("Başarıyla hamburger yedin ve açlık barın 8 bar daha yükseldi.")
          .setColor("Red")
          interaction.reply({embeds: [embed]})
          db.add(`hamburger_${interaction.user.id}`, -1)
          db.unpush(`envanter_${message.user.id}`, "Hamburger")
          db.add(`bar_${interaction.user.id}`, 8)
        }
        if (interaction.customId == "karpuz") {
          let patates = db.fetch(`karpuz_${interaction.user.id}`)
          
          if (!patates) return interaction.reply("Envanterinde Karpuz Bulunmamakta!")
          const embed = new EmbedBuilder()
          .setDescription("Başarıyla hamburger yedin ve açlık barın 10 bar daha yükseldi.")
          .setColor("Red")
          interaction.reply({embeds: [embed]})
          db.add(`karpuz_${interaction.user.id}`, -1)
          db.unpush(`envanter_${message.user.id}`, "Karpuz")
          db.add(`bar_${interaction.user.id}`, 10)
        }
        if (interaction.customId == "çikolata") {
          let patates = db.fetch(`cikolata_${interaction.user.id}`)
          
          if (!patates) return interaction.reply("Envanterinde Ülker Çikolata Bulunmamakta!")
          const embed = new EmbedBuilder()
          .setDescription("Başarıyla çikolata yedin ve açlık barın 2 bar daha yükseldi.")
          .setColor("Red")
          interaction.reply({embeds: [embed]})
          db.add(`cikolata_${interaction.user.id}`, -1)
          db.unpush(`envanter_${message.user.id}`, "Ülker Çikolata")
          db.add(`bar_${interaction.user.id}`, 10)
        }
        if (interaction.customId == "su") {
          let patates = db.fetch(`su_${interaction.user.id}`)
          
          if (!patates) return interaction.reply("Envanterinde su Bulunmamakta!")
          const embed = new EmbedBuilder()
          .setDescription("Başarıyla su içtin ve açlık barın 3 bar daha yükseldi.")
          .setColor("Red")
          interaction.reply({embeds: [embed]})
          db.add(`su_${interaction.user.id}`, -1)
          db.unpush(`envanter_${message.user.id}`, "su")
          db.add(`bar_${interaction.user.id}`, 3)
        }
        if (interaction.customId == "kalp") {
          let patates = db.fetch(`kalp_${interaction.user.id}`)
          
          if (!patates) return interaction.reply("Envanterinde Şifa Bulunmamakta!")
          const embed = new EmbedBuilder()
          .setDescription("Başarıyla kendine ilk yardım kiti bastın ve açlık barın 20 bar daha yükseldi.")
          .setColor("Red")
          interaction.reply({embeds: [embed]})
          db.add(`su_${interaction.user.id}`, -1)
          db.unpush(`envanter_${message.user.id}`, "Şifa")
          db.add(`bar_${interaction.user.id}`, 20)
        }
      })
    })
}
}

