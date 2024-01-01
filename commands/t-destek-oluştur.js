const { PermissionsBitField, EmbedBuilder    } = require("discord.js");
const db = require("croxydb")
const Discord = require("discord.js")
module.exports = {
    name:"destek-oluştur",
    description: 'Destek sistemini kurarsın!',
    type:1,
    options: [
        {
            name:"description",
            description:"Embed Mesajda Ne Yazacak?",
            type:3,
            required:true
        },
        {
            name:"buton",
            description:"Butonda Ne Yazacak?",
            type:3,
            required:true
        },
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
    const description = interaction.options.getString('description')
    const buton = interaction.options.getString('buton')
    let mod = db.fetch(`destekmod_${interaction.guild.id}`)
    if (!mod) return interaction.reply("Moderatör rolü ayarlanmamış!")
    const embed = new EmbedBuilder()
    .setTitle(client.user.username + " Destek Sistemi")
    .setDescription(description)
    .setColor("Green")
    const row = new Discord.ActionRowBuilder()
    .addComponents(
    new Discord.ButtonBuilder()
    .setLabel(buton)
    .setStyle(Discord.ButtonStyle.Success)
    .setCustomId("ticket")
    )
    interaction.channel.send({embeds: [embed], components: [row]})
    interaction.reply({content: "Sistem Başarıyla Kuruldu.", ephemeral: true})
}

};