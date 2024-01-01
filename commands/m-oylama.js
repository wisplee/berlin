const { PermissionsBitField, messageLink, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"oylama",
    description: 'Bir oylama açarsın!',
    type:1,
    options: [
     
           {
            name:"seçenek1",
            description:"1. Seçenek Nedir?",
            type:3,
            required:true
        },
        {
            name:"seçenek2",
            description:"2. Seçenek Nedir?",
            type:3,
            required:true
        },
       
    ],
  run: async(client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
    const description = interaction.options.getString('seçenek1')
    const rol = interaction.options.getString('seçenek2')
    const embed = new EmbedBuilder()
    .setDescription(`1. Seçenek = **${description}**\n\n2. Seçenek = **${rol}**`)
    .setColor("Red")
  
interaction.reply({content: "Başarıyla oylama açıldı.", ephemeral: true})
interaction.channel.send({embeds: [embed]}).then(message => {
message.react("✅")
message.react("❌")
})
}

};