const { PermissionsBitField, messageLink, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const db = require("croxydb")
const Discord = require("discord.js")
module.exports = {
    name:"market",
    description: 'Markete bakarsın!',
    type:1,
    options: [
       
       
    ],
  run: async(client, message) => {
   
 const embed = new EmbedBuilder()
 .setTitle("Checkers - Market!")
 .addFields({ name: '> Patates', value: `15 Raven Coin`, inline: true})
 .addFields({ name: '> Hamburger', value: `95 Raven Coin`, inline: true})
 .addFields({ name: '> Karpuz ', value: `45 Raven Coin`, inline: true})
 .addFields({ name: '> Ülker Çikolata', value: `8 Raven Coin`, inline: true})
 .addFields({ name: '> Su', value: `3 Raven Coin`, inline: true})
 .addFields({ name: '> Şifa', value: `100 Raven Coin`, inline: true})
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
        let para = await db.get(`para_${interaction.user.id}`)  || "0"
        let patates = 15
        let gerekli = patates - para
        const embed = new EmbedBuilder()
        .setDescription("Üzgünüm, yeterli paran yok.\nSenin paran: **"+para+"**\nÜrün Fiyatı: **"+patates+"**\nGereken Para: **"+gerekli+"**")
       .setColor("Red")
        if (para < patates) return interaction.reply({embeds: [embed], ephemeral: true})
        
        db.add(`para_${interaction.user.id}`, -patates)
        const embed2 = new EmbedBuilder()
        .setDescription("Başarıyla cips aldınız.\nKalan Paran: **"+para+"**\n")
        .setColor("Red")
        db.push(`envanter_${interaction.user.id}`, "Patates")
       db.add(`patates_${interaction.user.id}`, 1)
        return interaction.reply({embeds: [embed2]})

      }
      if (interaction.customId == "hamburger") {
        let para = await db.get(`para_${interaction.user.id}`)  || "0"
        let patates = 95  
        let gerekli = patates - para
        const embed = new EmbedBuilder()
        .setDescription("Üzgünüm, yeterli paran yok.\nSenin paran: **"+para+"**\nÜrün Fiyatı: **"+patates+"**\nGereken Para: **"+gerekli+"**")
       .setColor("Red")
        if (para < patates) return interaction.reply({embeds: [embed], ephemeral: true})
        
        db.add(`para_${interaction.user.id}`, -patates)
        const embed2 = new EmbedBuilder()
        .setDescription("Başarıyla hamburger aldınız.\nKalan Paran: **"+para+"**\n")
        .setColor("Red")
        db.push(`envanter_${interaction.user.id}`, "Hamburger")
        db.add(`hamburger_${interaction.user.id}`, 1)

        return interaction.reply({embeds: [embed2]})

      }
      if (interaction.customId == "karpuz") {
        let para = await db.get(`para_${interaction.user.id}`)  || "0"
        let patates = 45
        let gerekli = patates - para
        const embed = new EmbedBuilder()
        .setDescription("Üzgünüm, yeterli paran yok.\nSenin paran: **"+para+"**\nÜrün Fiyatı: **"+patates+"**\nGereken Para: **"+gerekli+"**")
       .setColor("Red")
        if (para < patates) return interaction.reply({embeds: [embed], ephemeral: true})
        
        db.add(`para_${interaction.user.id}`, -patates)
        const embed2 = new EmbedBuilder()
        .setDescription("Başarıyla karpuz aldınız.\nKalan Paran: **"+para+"**\n")
        .setColor("Red")
        db.push(`envanter_${interaction.user.id}`, "Karpuz")
        db.add(`karpuz_${interaction.user.id}`, 1)

        return interaction.reply({embeds: [embed2]})
      }
      if (interaction.customId == "çikolata") {
        let para = await db.get(`para_${interaction.user.id}`) || "0" 
        let patates = 8
        let gerekli = patates - para
        const embed = new EmbedBuilder()
        .setDescription("Üzgünüm, yeterli paran yok.\nSenin paran: **"+para+"**\nÜrün Fiyatı: **"+patates+"**\nGereken Para: **"+gerekli+"**")
       .setColor("Red")
        if (para < patates) return interaction.reply({embeds: [embed], ephemeral: true})
        
        db.add(`para_${interaction.user.id}`, -patates)
        const embed2 = new EmbedBuilder()
        .setDescription("Başarıyla çikolata aldınız.\nKalan Paran: **"+para+"**\n")
        .setColor("Red")
        db.push(`envanter_${interaction.user.id}`, "Ülker Çikolata")
        db.add(`cikolata_${interaction.user.id}`, 1)

        return interaction.reply({embeds: [embed2]})

      }
      if (interaction.customId == "su") {
        let para = await db.get(`para_${interaction.user.id}`)  || "0"
        let patates = 3
        let gerekli = patates - para
        const embed = new EmbedBuilder()
        .setDescription("Üzgünüm, yeterli paran yok.\nSenin paran: **"+para+"**\nÜrün Fiyatı: **"+patates+"**\nGereken Para: **"+gerekli+"**")
       .setColor("Red")
        if (para < patates) return interaction.reply({embeds: [embed], ephemeral: true})
        
        db.add(`para_${interaction.user.id}`, -patates)
        const embed2 = new EmbedBuilder()
        .setDescription("Başarıyla su aldınız.\nKalan Paran: **"+para+"**\n")
        .setColor("Red")
        db.push(`envanter_${interaction.user.id}`, "su")
        db.add(`su_${interaction.user.id}`, 1)

        return interaction.reply({embeds: [embed2]})

      }
      if (interaction.customId == "kalp") {
        let para = await db.get(`para_${interaction.user.id}`) || "0"
        let patates = 100
        let gerekli = patates - para
        const embed = new EmbedBuilder()
        .setDescription("Üzgünüm, yeterli paran yok.\nSenin paran: **"+para+"**\nÜrün Fiyatı: **"+patates+"**\nGereken Para: **"+gerekli+"**")
       .setColor("Red")
        if (para < patates) return interaction.reply({embeds: [embed], ephemeral: true})
        
        db.add(`para_${interaction.user.id}`, -patates)
        const embed2 = new EmbedBuilder()
        .setDescription("Başarıyla şifa aldınız.\nKalan Paran: **"+para+"**\n")
        .setColor("Red")
        db.push(`envanter_${interaction.user.id}`, "Şifa")
        db.add(`kalp_${interaction.user.id}`, 1)

        return interaction.reply({embeds: [embed2]})

      }
    })
})
  }
}
